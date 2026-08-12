/**
 * One-off import for the promeni-08-26 client asset pack.
 *
 * Reads the three Assets folders from the client change-request package,
 * normalizes filenames (leading space in " nadgrobni-feneri.jpg", the
 * "closs-luxury" typo, PNG sources) and writes optimized JPEGs to
 * public/images/ using the registry naming from the content docs.
 *
 * Uses sharp from node_modules (present as a Next.js dependency).
 * Run: node scripts/import-promeni-08-26-images.mjs
 */
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(
  ROOT,
  "promeni-08-26",
  "Промени по сайта _ Траурна агенция Амин Стамболийски",
);
const OUT = path.join(ROOT, "public", "images");

const KOVCHEZI_DIR = path.join(SRC, "Нова страница -traurni-kovchezi", "-traurni-kovchezi Assets");
const KRASTOVE_DIR = path.join(SRC, "Нова страница -traurni-krastove", "-traurni-krastove Assets");
const STOKI_DIR = path.join(SRC, "-traurni-stoki", "-traurni-stoki Assets");
const KETARING_DIR = path.join(SRC, "-ketaring-pomen", "-ketaring-pomen Assets");

/** [source path, output id] */
const jobs = [
  // 24 нови снимки ковчези: kovcheg-09..30 са .png, 31–32 са .jpg
  ...Array.from({ length: 24 }, (_, i) => {
    const n = i + 9;
    const ext = n >= 31 ? "jpg" : "png";
    return [path.join(KOVCHEZI_DIR, `kovcheg-${String(n).padStart(2, "0")}.${ext}`), `kovcheg-${String(n).padStart(2, "0")}`];
  }),
  // 5 модела кръстове (имена по съдържателния документ)
  [path.join(KRASTOVE_DIR, "cross-small-amin.jpg"), "krastove-malak"],
  [path.join(KRASTOVE_DIR, "cross-straight-amin.jpg"), "krastove-golyam-prav"],
  [path.join(KRASTOVE_DIR, "cross-clover-amin.jpg"), "krastove-detelina"],
  [path.join(KRASTOVE_DIR, "cross-cut-amin.jpg"), "krastove-izryazan"],
  [path.join(KRASTOVE_DIR, "closs-luxury-amin.jpg"), "krastove-luks"], // typo в източника
  // Надгробни фенери (водещ интервал в името на файла-източник)
  [path.join(STOKI_DIR, " nadgrobni-feneri.jpg"), "nadgrobni-feneri"],
  // Нова снимка за кетъринг — презаписва стария denylisted файл със същото име
  [path.join(KETARING_DIR, "organizatsiya-pogrebenie-02.jpeg"), "organizatsiya-pogrebenie-02"],
];

await mkdir(OUT, { recursive: true });

let totalIn = 0;
let totalOut = 0;
for (const [src, id] of jobs) {
  const dest = path.join(OUT, `${id}.jpg`);
  const inSize = (await stat(src)).size;
  await sharp(src)
    .rotate() // прилага EXIF ориентация
    .resize({ width: 1600, withoutEnlargement: true })
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(dest);
  const outSize = (await stat(dest)).size;
  totalIn += inSize;
  totalOut += outSize;
  console.log(
    `${id}.jpg  ${(inSize / 1024).toFixed(0)}KB -> ${(outSize / 1024).toFixed(0)}KB`,
  );
}
console.log(
  `\n${jobs.length} images, ${(totalIn / 1024 / 1024).toFixed(1)}MB -> ${(totalOut / 1024 / 1024).toFixed(1)}MB`,
);
