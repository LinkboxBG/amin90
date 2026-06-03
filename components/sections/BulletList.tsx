import { CheckIcon } from "@/components/ui/Icons";

export function BulletList({ items, columns = 2 }: { items: string[]; columns?: 1 | 2 }) {
  return (
    <ul className={`grid gap-x-8 gap-y-4 ${columns === 2 ? "sm:grid-cols-2" : ""}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-700">
            <CheckIcon className="size-4" />
          </span>
          <span className="text-ink-700">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default BulletList;
