/**
 * Import v2-pages Markdown → content/pages/*.ts, content/schemas/*.json, content/pricing.ts
 * Does NOT modify v2-pages/ (read-only source archive).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const V2 = path.join(ROOT, "v2-pages");
const OUT_PAGES = path.join(ROOT, "content", "pages");
const OUT_SCHEMAS = path.join(ROOT, "content", "schemas");
const OUT_REPORT = path.join(ROOT, "content", "import-qa-report.json");
const SITE_URL = "https://amin90.com";

const REQUIRED_SLUGS = [
  "homepage",
  "traurni-uslugi",
  "pogrebenie",
  "kremaciya",
  "transport-na-pokoinik",
  "denonoshtna-pogrebalna-agenciya",
  "dokumenti-za-pogrebenie",
  "ketaring-pomen",
  "traurni-stoki",
  "traurni-venci",
  "pametnitsi",
  "ceni",
  "za-nas",
  "kontakti",
  "lokacii",
  "pogrebalna-agenciya-stamboliyski",
  "pogrebalna-agenciya-plovdiv",
  "pogrebalna-agenciya-tsalapitsa",
  "pogrebalna-agenciya-krichim",
  "pogrebalna-agenciya-ognyanovo",
];

const LINK_LABELS = {
  "/": "Начало",
  "/traurni-uslugi": "Траурни услуги",
  "/pogrebenie": "Организация на погребение",
  "/kremaciya": "Кремация",
  "/transport-na-pokoinik": "Транспорт на покойник",
  "/denonoshtna-pogrebalna-agenciya": "Денонощна погребална агенция",
  "/dokumenti-za-pogrebenie": "Документи за погребение",
  "/ketaring-pomen": "Кетъринг за помен",
  "/traurni-stoki": "Траурни стоки",
  "/traurni-venci": "Траурни венци",
  "/pametnitsi": "Паметници",
  "/ceni": "Цени",
  "/za-nas": "За нас",
  "/kontakti": "Контакти",
  "/lokacii": "Локации",
  "/pogrebalna-agenciya-stamboliyski": "Централен офис Стамболийски",
  "/pogrebalna-agenciya-plovdiv": "Пловдив и региона",
  "/pogrebalna-agenciya-tsalapitsa": "Цалапица",
  "/pogrebalna-agenciya-krichim": "Кричим",
  "/pogrebalna-agenciya-ognyanovo": "Огняново",
};

const report = {
  generatedAt: new Date().toISOString(),
  requiredSlugs: REQUIRED_SLUGS,
  slugsFound: [],
  slugsMissing: [],
  meta: { ok: [], invalid: [] },
  faq: { ok: [], invalid: [] },
  schema: { approved: [], needsReview: [], invalid: [] },
  linksNormalized: [],
  mappingWarnings: [],
  pages: {},
};

function readFile(p) {
  return fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null;
}

function normalizePath(href) {
  if (!href || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("#")) return href;
  let out = href.trim();
  const hadTrailing = out.endsWith("/") && out.length > 1;
  if (out !== "/" && out.endsWith("/")) out = out.slice(0, -1);
  if (hadTrailing && out.startsWith("/")) {
    report.linksNormalized.push({ from: href, to: out });
  }
  return out;
}

function normalizeUrlsInJson(obj) {
  if (typeof obj === "string") {
    return obj.replace(/https:\/\/amin90\.com\/([^/"'\s]+)\//g, (_, p) => `https://amin90.com/${p}`);
  }
  if (Array.isArray(obj)) return obj.map(normalizeUrlsInJson);
  if (obj && typeof obj === "object") {
    const next = {};
    for (const [k, v] of Object.entries(obj)) next[k] = normalizeUrlsInJson(v);
    return next;
  }
  return obj;
}

function extractJsonBlocks(md) {
  const blocks = [];
  const re = /```json\s*([\s\S]*?)```/gi;
  let m;
  while ((m = re.exec(md))) blocks.push(m[1].trim());
  return blocks;
}

function auditSchema(slug, json, raw) {
  const issues = [];
  const s = raw || JSON.stringify(json);

  if (/path-to-image/i.test(s)) issues.push("placeholder_og_image");
  if (/subOrganization/i.test(s)) issues.push("subOrganization_present");
  if (/streetAddress/i.test(s)) issues.push("streetAddress_present");
  if (/\b(клон|филиал|офиси в 5)\b/i.test(s)) issues.push("risky_branch_wording");

  const funeralHomeMatches = s.match(/"@type"\s*:\s*(\[[^\]]*FuneralHome[^\]]*\]|"FuneralHome")/g) || [];
  if (funeralHomeMatches.length > 2) issues.push("multiple_funeral_home_nodes");

  const blocking = ["subOrganization_present", "streetAddress_present", "placeholder_og_image"];
  if (issues.some((i) => blocking.includes(i))) {
    return { status: "needs_review", issues };
  }
  if (issues.length) return { status: "needs_review", issues };
  return { status: "approved", issues };
}

function parseMeta(md, slug) {
  if (!md) return { valid: false, error: "missing_file" };

  const yamlBlock = md.match(/```ya?ml\s*([\s\S]*?)```/i);
  if (yamlBlock) {
    const y = yamlBlock[1];
    const get = (key) => {
      const m = y.match(new RegExp(`^${key}:\\s*"?([^"\\n]+)"?`, "m"));
      return m ? m[1].trim() : undefined;
    };
    const h1 = get("h1");
    const metaTitle = get("meta_title");
    const metaDescription = get("meta_description");
    let canonical = get("canonical") || get("url");
    if (canonical) {
      canonical = canonical.replace(SITE_URL, "").replace(/\/$/, "") || "/";
      canonical = normalizePath(canonical.startsWith("/") ? canonical : `/${canonical}`);
    }
    if (!metaTitle || !metaDescription || !h1) {
      return { valid: false, error: "yaml_missing_fields" };
    }
    return {
      valid: true,
      h1,
      metaTitle,
      metaDescription,
      canonical: canonical || (slug === "homepage" ? "/" : `/${slug}`),
    };
  }

  const h1 = md.match(/^## H1\s*\n+(.+)/m)?.[1]?.trim();
  const metaTitle =
    md.match(/^## Meta title\s*\n+(.+)/m)?.[1]?.trim() ||
    md.match(/^## Title tag\s*\n+(.+)/m)?.[1]?.trim();
  const metaDescription = md.match(/^## Meta description\s*\n+(.+)/m)?.[1]?.trim();
  let canonical =
    md.match(/^## Canonical(?: URL)?\s*\n+`?([^`\n]+)`?/m)?.[1]?.trim() ||
    md.match(/^## Recommended canonical\s*\n+`?([^`\n]+)`?/m)?.[1]?.trim() ||
    md.match(/^## Suggested canonical\s*\n+`?([^`\n]+)`?/m)?.[1]?.trim() ||
    md.match(/^## Препоръчителен canonical\s*\n+`?([^`\n]+)`?/m)?.[1]?.trim() ||
    md.match(/^canonical:\s*"?([^"\n]+)"?/m)?.[1]?.trim();
  if (canonical) {
    canonical = canonical.replace(SITE_URL, "").replace(/\/$/, "") || "/";
    canonical = normalizePath(canonical.startsWith("/") ? canonical : `/${canonical}`);
  } else {
    canonical = slug === "homepage" ? "/" : `/${slug}`;
  }

  if (!metaTitle || !metaDescription) {
    return { valid: false, error: "section_missing_fields", partial: { h1, metaTitle, metaDescription } };
  }
  const finalH1 = h1 || metaTitle.split("|")[0].trim();
  return { valid: true, h1: finalH1, metaTitle, metaDescription, canonical };
}

function stripMd(s) {
  return s
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .trim();
}

function parseFaq(md) {
  if (!md) return { valid: false, error: "missing_file", items: [] };
  const items = [];

  // Format A: ### Question
  const h3Parts = md.split(/^### /m).slice(1);
  if (h3Parts.length) {
    for (const part of h3Parts) {
      const lines = part.trim().split("\n");
      const q = stripMd(lines[0] || "");
      const a = stripMd(lines.slice(1).join("\n"));
      if (q && a) items.push({ q, a });
    }
  }

  // Format B: ## Question (answer paragraphs until next ##)
  if (!items.length) {
    const chunks = md.split(/^## /m).slice(1);
    for (const chunk of chunks) {
      const lines = chunk.trim().split("\n");
      const first = lines[0] || "";
      if (/^(FAQ|Често задавани)/i.test(first)) continue;
      const q = stripMd(first.replace(/\?$/, "") + (first.endsWith("?") ? "" : ""));
      const qFixed = stripMd(first);
      const a = stripMd(lines.slice(1).join("\n"));
      if (qFixed && a && !/^FAQ/i.test(qFixed)) items.push({ q: qFixed, a });
    }
  }

  if (!items.length) return { valid: false, error: "no_faq_items", items: [] };
  return { valid: true, items };
}

function parsePageContent(md) {
  if (!md) return { sections: [], intro: [], warnings: ["missing_page_content"], h1FromMd: "" };

  const lines = md.split("\n");
  const warnings = [];
  let h1FromMd = "";
  const sections = [];
  let current = null;
  const introParagraphs = [];

  const flush = () => {
    if (current) sections.push(current);
    current = null;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("# ") && !line.startsWith("## ")) {
      h1FromMd = line.slice(2).trim();
      continue;
    }
    if (line.startsWith("## ")) {
      flush();
      current = {
        heading: line.slice(3).trim(),
        paragraphs: [],
        bullets: [],
        table: null,
        showPhoneCta: false,
      };
      continue;
    }
    if (!current) {
      if (line.trim() && !line.startsWith("---")) introParagraphs.push(stripMd(line));
      continue;
    }
    if (line.startsWith("|")) {
      const tableLines = [line];
      while (i + 1 < lines.length && lines[i + 1].startsWith("|")) {
        i++;
        tableLines.push(lines[i]);
      }
      const rows = tableLines
        .map((l) => l.split("|").map((c) => c.trim()).filter(Boolean))
        .filter((r) => r.length && !r.every((c) => /^-+$/.test(c.replace(/:/g, ""))));
      if (rows.length >= 2) {
        current.table = { headers: rows[0], rows: rows.slice(1) };
      } else warnings.push(`weak_table:${current.heading}`);
      continue;
    }
    if (line.match(/^[-*]\s/)) {
      current.bullets.push(stripMd(line.replace(/^[-*]\s+/, "")));
      continue;
    }
    if (line.includes("+359") && line.includes("8907")) current.showPhoneCta = true;
    if (line.trim()) {
      const t = stripMd(line);
      if (t) current.paragraphs.push(t);
    }
  }
  flush();

  const intro = introParagraphs.filter(Boolean);
  if (!sections.length && intro.length) warnings.push("only_intro_no_sections");

  return { h1FromMd, intro, sections, warnings };
}

function parseInternalLinksMatrix() {
  const md = readFile(path.join(V2, "03-internal-linking-matrix.md"));
  const map = {};
  if (!md) return map;
  const rows = md.split("\n").filter((l) => l.startsWith("| `/"));
  for (const row of rows) {
    const m = row.match(/\|\s*`([^`]+)`\s*\|\s*(.+)\|/);
    if (!m) continue;
    const source = normalizePath(m[1]);
    const links = m[2]
      .split("<br>")
      .map((x) => x.trim())
      .map((x) => x.match(/`(\/[^`]+)`/)?.[1])
      .filter(Boolean)
      .map(normalizePath);
    map[source] = links.map((href) => ({
      label: LINK_LABELS[href] || href.replace(/^\//, "").replace(/-/g, " "),
      href,
    }));
  }
  return map;
}

function slugToRoute(slug) {
  return slug === "homepage" ? "/" : `/${slug}`;
}

function emitPageTs(slug, data) {
  const exportName = slug === "homepage" ? "home" : slug.replace(/-/g, "_");
  const typeImport = slug === "homepage" ? "HomePageContent" : "MarketingPageContent";

  const body = `import type { ${typeImport} } from "../types";\n\nexport const ${exportName}: ${typeImport} = ${JSON.stringify(
    { slug: slugToRoute(slug), ...data },
    null,
    2
  )};\n`;

  const outName = slug === "homepage" ? "home.ts" : `${slug}.ts`;
  fs.writeFileSync(path.join(OUT_PAGES, outName), body, "utf8");
}

function parsePricingFromCeni(md) {
  const { sections } = parsePageContent(md);
  const rawBlocks = md.split(/^## /m).slice(1);
  const rawLinkByHeading = new Map();
  for (const block of rawBlocks) {
    const heading = block.split("\n")[0].trim();
    const linkMatch = block.match(/\]\(\/([^/)]+)\/?\)/);
    if (linkMatch) rawLinkByHeading.set(heading, normalizePath(`/${linkMatch[1]}`));
  }

  const groups = [];
  for (const sec of sections) {
    if (!sec.table) continue;
    const id = sec.heading
      .toLowerCase()
      .replace(/[^a-zа-я0-9]+/gi, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 48);
    const items = [];
    for (const row of sec.table.rows) {
      const [label, priceRaw] = row;
      const item = { label: stripMd(label) };
      const pr = priceRaw?.trim() || "";
      const num = pr.match(/€\s*([\d.,]+)/);
      if (num) {
        item.price = parseFloat(num[1].replace(",", "."));
        if (/\/\s*км|\/км/i.test(pr)) item.unit = "/км";
        if (/24/.test(pr)) item.unit = "24ч";
      } else if (pr) {
        item.note = pr;
      }
      items.push(item);
    }
    const pages = new Set(["/ceni"]);
    const linked = rawLinkByHeading.get(sec.heading);
    if (linked) pages.add(linked);
    if (items.length) {
      groups.push({ id: id || "group", title: sec.heading, pages: [...pages], items });
    }
  }
  return groups;
}

function emitPricing(groups) {
  const header = `export type PriceItem = {
  label: string;
  price?: number;
  unit?: string;
  range?: [number, number];
  note?: string;
  sizeCm?: string;
};

export type PriceGroup = {
  id: string;
  title: string;
  pages: string[];
  intro?: string;
  items: PriceItem[];
};

export const PRICE_DISCLAIMER =
  "Цените са ориентировъчни и в евро (EUR). Крайната цена зависи от конкретния случай, локацията и избраните услуги.";

export const priceGroups: PriceGroup[] = `;

  const footer = `

export function formatPrice(item: PriceItem): string {
  if (typeof item.price === "number") {
    const base = \`€\${item.price}\`;
    return item.unit ? \`\${base}\${item.unit}\` : base;
  }
  if (item.range) return \`€\${item.range[0]}–\${item.range[1]}\`;
  return item.note ?? "—";
}

export function groupsForPage(slug: string): PriceGroup[] {
  return priceGroups.filter((g) => g.pages.includes(slug));
}
`;
  fs.writeFileSync(path.join(ROOT, "content", "pricing.ts"), header + JSON.stringify(groups, null, 2) + ";" + footer, "utf8");
}

fs.mkdirSync(OUT_SCHEMAS, { recursive: true });
const internalLinksMap = parseInternalLinksMatrix();

for (const slug of REQUIRED_SLUGS) {
  const prefix = path.join(V2, slug);
  const pageReport = { slug, route: slugToRoute(slug) };

  const contentMd = readFile(`${prefix}-page-content.md`);
  const metaMd = readFile(`${prefix}-meta-data.md`);
  const faqMd = readFile(`${prefix}-faq.md`);
  const schemaMd = readFile(`${prefix}-schema.md`);

  if (contentMd && metaMd && faqMd && schemaMd) report.slugsFound.push(slug);
  else {
    report.slugsMissing.push(slug);
    for (const [k, v] of [
      ["page-content", contentMd],
      ["meta-data", metaMd],
      ["faq", faqMd],
      ["schema", schemaMd],
    ]) {
      if (!v) pageReport[`missing_${k}`] = true;
    }
    report.pages[slug] = pageReport;
    continue;
  }

  const meta = parseMeta(metaMd, slug);
  if (meta.valid) report.meta.ok.push(slug);
  else {
    report.meta.invalid.push({ slug, ...meta });
    pageReport.metaError = meta.error;
  }

  const faq = parseFaq(faqMd);
  if (faq.valid) report.faq.ok.push(slug);
  else {
    report.faq.invalid.push({ slug, error: faq.error });
    pageReport.faqError = faq.error;
  }

  const content = parsePageContent(contentMd);
  if (content.warnings.length) {
    report.mappingWarnings.push({ slug, warnings: content.warnings });
  }

  const route = slugToRoute(slug);
  const internalLinks = internalLinksMap[route] || [];

  let schemaSlug = null;
  let schemaStatus = "invalid";
  const jsonBlocks = extractJsonBlocks(schemaMd);
  if (!jsonBlocks.length) {
    report.schema.invalid.push({ slug, error: "no_json_block" });
  } else {
    try {
      let parsed = JSON.parse(jsonBlocks[0]);
      parsed = normalizeUrlsInJson(parsed);
      const normalizedRaw = JSON.stringify(parsed);
      const audit = auditSchema(slug, parsed, normalizedRaw);
      schemaStatus = audit.status;
      if (audit.status === "approved") {
        fs.writeFileSync(path.join(OUT_SCHEMAS, `${slug}.json`), JSON.stringify(parsed, null, 2), "utf8");
        report.schema.approved.push(slug);
        schemaSlug = slug;
      } else {
        fs.writeFileSync(
          path.join(OUT_SCHEMAS, `${slug}.needs-review.json`),
          JSON.stringify({ issues: audit.issues, data: parsed }, null, 2),
          "utf8"
        );
        report.schema.needsReview.push({ slug, issues: audit.issues });
      }
    } catch (e) {
      report.schema.invalid.push({ slug, error: e.message });
    }
  }

  if (!meta.valid) {
    report.pages[slug] = pageReport;
    continue;
  }

  const pageData = {
    h1: meta.h1 || content.h1FromMd,
    metaTitle: meta.metaTitle,
    metaDescription: meta.metaDescription,
    canonical: meta.canonical,
    intro: content.intro,
    sections: content.sections,
    faq: faq.items,
    internalLinks,
    schemaSlug,
    schemaStatus,
    pageVariant:
      slug === "homepage"
        ? "home"
        : slug === "denonoshtna-pogrebalna-agenciya"
          ? "urgent"
          : slug === "ceni"
            ? "pricing"
            : ["traurni-stoki", "traurni-venci", "pametnitsi"].includes(slug)
              ? "product"
              : slug.startsWith("pogrebalna-agenciya-") || ["lokacii", "kontakti", "za-nas"].includes(slug)
                ? "location"
                : slug === "traurni-uslugi"
                  ? "hub"
                  : "marketing",
  };

  if (meta.h1 && content.h1FromMd && meta.h1 !== content.h1FromMd) {
    report.mappingWarnings.push({
      slug,
      warnings: [`h1_mismatch meta="${meta.h1}" content="${content.h1FromMd}"`],
    });
  }

  emitPageTs(slug, pageData);
  report.pages[slug] = pageReport;
}

const ceniMd = readFile(path.join(V2, "ceni-page-content.md"));
if (ceniMd) {
  const groups = parsePricingFromCeni(ceniMd);
  if (groups.length) emitPricing(groups);
  else report.mappingWarnings.push({ slug: "ceni", warnings: ["pricing_tables_not_parsed"] });
}

const summaryMd = `# Import QA report

Generated: ${report.generatedAt}

## Slugs
- Found: ${report.slugsFound.length} / ${REQUIRED_SLUGS.length}
- Missing: ${report.slugsMissing.length ? report.slugsMissing.join(", ") : "none"}

## Meta
- OK: ${report.meta.ok.length}
- Invalid: ${report.meta.invalid.length}${report.meta.invalid.length ? "\n" + report.meta.invalid.map((x) => `  - ${x.slug}: ${x.error}`).join("\n") : ""}

## FAQ
- OK: ${report.faq.ok.length}
- Invalid: ${report.faq.invalid.length}${report.faq.invalid.length ? "\n" + report.faq.invalid.map((x) => `  - ${x.slug}: ${x.error}`).join("\n") : ""}

## Schema
- Approved (content/schemas/*.json): ${report.schema.approved.length}
- Needs review (*.needs-review.json): ${report.schema.needsReview.length}${report.schema.needsReview.length ? "\n" + report.schema.needsReview.map((x) => `  - ${x.slug}: ${x.issues.join(", ")}`).join("\n") : ""}
- Invalid: ${report.schema.invalid.length}

## Link normalizations (trailing slash → none)
- Count: ${report.linksNormalized.length}

## Mapping warnings
${report.mappingWarnings.map((w) => `- **${w.slug}**: ${(w.warnings || []).join("; ")}`).join("\n") || "- none"}

> v2-pages/ was not modified (read-only archive).
`;

fs.writeFileSync(OUT_REPORT, JSON.stringify(report, null, 2), "utf8");
fs.writeFileSync(path.join(ROOT, "content", "import-qa-report.md"), summaryMd, "utf8");
console.log(summaryMd);
