import type { ContentSection } from "@/content/types";
import Container from "@/components/ui/Container";
import SectionHeading from "./SectionHeading";

function cleanLabel(b: string) {
  return b.replace(/;\s*$/, "").trim();
}

/** Category cards from first catalog-style section bullets (product hub pages). */
export function ProductCards({ sections }: { sections: ContentSection[] }) {
  const catalog =
    sections.find((s) => /каталог|категори/i.test(s.heading)) ?? sections[0];
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
