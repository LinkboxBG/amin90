import Link from "next/link";
import type { ContentSection } from "@/content/types";
import Container from "@/components/ui/Container";
import SectionHeading from "./SectionHeading";
import { ArrowRightIcon } from "@/components/ui/Icons";

function cleanLabel(b: string) {
  return b.replace(/;\s*$/, "").trim();
}

const CARD_CLASS =
  "group block h-full rounded-lg border border-line bg-white p-6 shadow-[var(--shadow-sm)] transition-colors hover:border-gold-500";

function BoxCardBody({ title, hint }: { title: string; hint: string }) {
  return (
    <>
      <span className="mb-3 block h-px w-10 bg-gold-500" aria-hidden />
      <h3 className="text-lg font-semibold text-navy-900 transition-colors group-hover:text-gold-700">
        {title}
      </h3>
      <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-600">
        {hint}
        <ArrowRightIcon className="size-4 shrink-0 text-gold-500 transition-transform group-hover:translate-x-0.5" />
      </p>
    </>
  );
}

/**
 * Catalog grid for product hub pages. Preferred source: the catalog section's
 * `catalogBoxes` — every box is a link ("#anchor" scrolls to the matching
 * section on the page, "/path" navigates). Fallback: derive plain cards from
 * the first catalog-style section's bullets (legacy pages).
 */
export function ProductCards({ sections }: { sections: ContentSection[] }) {
  const catalog =
    sections.find((s) => /каталог|категори/i.test(s.heading)) ?? sections[0];

  if (catalog?.catalogBoxes?.length) {
    return (
      <section className="section-tight bg-paper">
        <Container>
          <SectionHeading eyebrow="Каталог" title={catalog.heading} />
          {catalog.paragraphs && catalog.paragraphs.length > 0 && (
            <div className="mt-6 max-w-prose space-y-4 text-lg text-ink-700">
              {catalog.paragraphs.map((p, pi) => (
                <p key={pi}>{p}</p>
              ))}
            </div>
          )}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {catalog.catalogBoxes.map((box) => {
              const isAnchor = box.target.startsWith("#");
              const hint = isAnchor ? "Вижте раздела на тази страница" : "Към страницата";
              return isAnchor ? (
                <a key={box.target} href={box.target} className={CARD_CLASS}>
                  <BoxCardBody title={box.label} hint={hint} />
                </a>
              ) : (
                <Link key={box.target} href={box.target} className={CARD_CLASS}>
                  <BoxCardBody title={box.label} hint={hint} />
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
    );
  }

  if (!catalog?.bullets?.length) return null;

  return (
    <section className="section-tight bg-paper">
      <Container>
        <SectionHeading eyebrow="Каталог" title={catalog.heading} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {catalog.bullets.map((b) => {
            const title = cleanLabel(b);
            return (
              <div
                key={title}
                className="rounded-lg border border-line bg-white p-6 shadow-[var(--shadow-sm)]"
              >
                <span className="mb-3 block h-px w-10 bg-gold-500" aria-hidden />
                <h3 className="text-lg font-semibold text-navy-900">{title}</h3>
                <p className="mt-2 text-sm text-ink-600">
                  Поръчка на място или по телефона — ще уточним наличност и цена.
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default ProductCards;
