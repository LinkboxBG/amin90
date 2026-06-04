import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/sections/SectionHeading";
import SiteImage from "./SiteImage";
import type { SiteImage as SiteImageData } from "@/content/siteImages";

export type CategoryCard = {
  image: SiteImageData;
  title: string;
  href: string;
};

type Props = {
  eyebrow?: string;
  title?: string;
  cards: CategoryCard[];
  priority?: boolean;
};

/** Compact, linked image cards that route to service / product / pricing pages. */
export function CategoryVisualCards({ eyebrow, title, cards, priority }: Props) {
  if (!cards.length) return null;

  return (
    <section className="section-tight">
      <Container>
        {title && <SectionHeading eyebrow={eyebrow} title={title} />}
        <div className={`grid grid-cols-2 gap-4 sm:grid-cols-3 ${title ? "mt-8" : ""}`}>
          {cards.map((card, i) => (
            <Link
              key={`${card.href}-${card.image.id}`}
              href={card.href}
              className="group block overflow-hidden rounded-lg border border-line bg-white shadow-[var(--shadow-sm)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
            >
              <SiteImage
                image={card.image}
                aspect="landscape"
                rounded={false}
                priority={priority && i === 0}
                sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 45vw"
              />
              <span className="block px-3 py-3 text-center text-sm font-semibold text-navy-800">
                {card.title}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default CategoryVisualCards;
