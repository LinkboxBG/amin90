import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/Icons";
import SiteImage from "./SiteImage";
import type { MonumentItem } from "@/content/catalog/monuments";

/** Product-style card for a catalog model (monuments). */
export function CatalogCard({ item }: { item: MonumentItem }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-line bg-white shadow-[var(--shadow-sm)]">
      <SiteImage
        image={item.image}
        aspect="portrait"
        rounded={false}
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
      />
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-semibold uppercase tracking-wide text-gold-700">
          {item.group}
        </span>
        <h3 className="mt-1 text-lg font-semibold text-navy-900">{item.title}</h3>
        <p className="mt-2 flex-1 text-sm text-ink-600">{item.description}</p>
        <Link
          href="/kontakti"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 transition-colors hover:text-gold-600"
        >
          Запитване за този модел
          <ArrowRightIcon className="size-4" />
        </Link>
      </div>
    </article>
  );
}

export default CatalogCard;
