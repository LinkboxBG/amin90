/**
 * Copy real client images from client-files/images (Cyrillic names, git-excluded)
 * into public/images with SEO-friendly ASCII filenames the app can serve.
 * Source is read-only; we only copy.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "client-files", "images");
const OUT = path.join(ROOT, "public", "images");

// Cyrillic category prefix -> ASCII slug
const CATEGORY_SLUG = {
  "Венец": "venec",
  "Катафалка": "katafalka",
  "Ковчег": "kovcheg",
  "Организация на погребение": "organizatsiya-pogrebenie",
  "Паметник": "pametnik",
};

fs.mkdirSync(OUT, { recursive: true });

const files = fs.readdirSync(SRC);
const manifest = {};

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) continue; // skip mp4 etc.

  // filename like "Организация на погребение.04.jpg"
  const m = file.match(/^(.+)\.(\d+)\.(jpg|jpeg|png|webp)$/i);
  if (!m) continue;
  const [, category, num] = m;
  const slug = CATEGORY_SLUG[category];
  if (!slug) {
    console.warn("Unmapped category:", category);
    continue;
  }
  const outName = `${slug}-${num}.jpg`;
  fs.copyFileSync(path.join(SRC, file), path.join(OUT, outName));
  (manifest[slug] ??= []).push(outName);
}

for (const k of Object.keys(manifest)) {
  manifest[k].sort();
}

fs.writeFileSync(
  path.join(ROOT, "content", "image-manifest.json"),
  JSON.stringify(manifest, null, 2),
  "utf8"
);

console.log("Copied images:");
for (const [k, v] of Object.entries(manifest)) console.log(`  ${k}: ${v.length}`);
