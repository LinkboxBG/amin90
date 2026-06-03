import type { Variant } from "@/content/types";

export function VariantCards({ variants }: { variants: Variant[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {variants.map((v) => (
        <article
          key={v.title}
          className="accent-rule rounded-lg border border-line bg-white p-6 shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)]"
        >
          <h3 className="text-xl leading-snug">{v.title}</h3>
          <p className="mt-3 text-ink-700">{v.text}</p>
        </article>
      ))}
    </div>
  );
}

export default VariantCards;
