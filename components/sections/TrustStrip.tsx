export function TrustStrip({ items }: { items: string[] }) {
  return (
    <section className="border-y border-line bg-paper">
      <div className="container-page py-5">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:gap-x-8">
          {items.map((item, i) => (
            <li key={item} className="flex items-center gap-6 md:gap-8">
              {i > 0 && <span className="hidden h-4 w-px bg-gold-300 md:inline-block" aria-hidden="true" />}
              <span className="text-sm font-semibold text-ink-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default TrustStrip;
