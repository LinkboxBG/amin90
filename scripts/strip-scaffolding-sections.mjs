/**
 * One-off codemod (promeni-08-26): премахва редакторските scaffolding секции,
 * пренесени от import-v2-content.mjs в content/pages/*.ts:
 *
 *   - "Често задавани въпроси"  → дублира faq[] (акордеона)
 *   - "Вътрешни линкове (за страницата)" → дублира internalLinks[] (пилулите)
 *   - "Финален CTA блок" / финална "Нуждаете се…" секция → става page.finalCta,
 *     който CTABand рендерира с page-specific текст
 *
 * Телата на файловете са валиден JSON (генерирани), затова: parse → filter →
 * re-serialize със същия JSON.stringify(…, null, 2) стил.
 *
 * Run: node scripts/strip-scaffolding-sections.mjs
 */
import { readFile, writeFile, readdir } from "node:fs/promises";
import path from "node:path";

const PAGES_DIR = path.resolve(import.meta.dirname, "..", "content", "pages");

// Пренаписани на ръка в същия release — не се пипат.
const SKIP = new Set([
  "index.ts",
  "traurni-stoki.ts",
  "ketaring-pomen.ts",
  "traurni-krastove.ts",
  "traurni-kovchezi.ts",
]);

const STRIP_HEADINGS = /^(Често задавани въпроси|Вътрешни линкове( за страницата)?|Финален CTA блок)$/;
const HUMAN_CTA = /^Нуждаете се/;
const PHONE_LINE = /\+359|Обадете се на денонощния телефон|Обадете се на:/;

function extractFinalCta(section) {
  const paragraphs = section.paragraphs ?? [];
  let title = section.heading;
  let bodyParas = paragraphs;

  if (section.heading === "Финален CTA блок") {
    const h3 = paragraphs.find((p) => p.startsWith("### "));
    title = h3 ? h3.replace(/^###\s*/, "").trim() : "Денонощен телефон за съдействие";
    bodyParas = paragraphs.filter((p) => !p.startsWith("### "));
  }
  const text = bodyParas.filter((p) => !PHONE_LINE.test(p)).join(" ").trim();
  return text ? { title, text } : { title };
}

const files = (await readdir(PAGES_DIR)).filter(
  (f) => f.endsWith(".ts") && !SKIP.has(f),
);

let changed = 0;
for (const file of files) {
  const fullPath = path.join(PAGES_DIR, file);
  const source = await readFile(fullPath, "utf8");

  const eq = source.indexOf("= {");
  const end = source.lastIndexOf("};");
  if (eq === -1 || end === -1) {
    console.error(`SKIP ${file}: unexpected shape`);
    continue;
  }
  const prefix = source.slice(0, eq + 2);
  const body = source.slice(eq + 2, end + 1);

  let obj;
  try {
    obj = JSON.parse(body);
  } catch (e) {
    console.error(`SKIP ${file}: body is not valid JSON (${e.message})`);
    continue;
  }

  const before = obj.sections.length;
  let finalCta = null;

  obj.sections = obj.sections.filter((sec, i) => {
    if (STRIP_HEADINGS.test(sec.heading)) {
      if (sec.heading === "Финален CTA блок") finalCta = extractFinalCta(sec);
      return false;
    }
    // Финална "Нуждаете се…" секция = CTA блок с човешко заглавие (3 страници).
    if (HUMAN_CTA.test(sec.heading) && i === obj.sections.length - 1) {
      finalCta = extractFinalCta(sec);
      return false;
    }
    return true;
  });

  if (finalCta && !obj.finalCta) obj.finalCta = finalCta;

  if (obj.sections.length === before && !finalCta) {
    console.log(`--  ${file}: nothing to strip`);
    continue;
  }

  const output = prefix + " " + JSON.stringify(obj, null, 2) + ";\n";
  await writeFile(fullPath, output);
  changed++;
  console.log(
    `OK  ${file}: sections ${before} -> ${obj.sections.length}${finalCta ? ", finalCta extracted" : ""}`,
  );
}
console.log(`\n${changed}/${files.length} files updated`);
