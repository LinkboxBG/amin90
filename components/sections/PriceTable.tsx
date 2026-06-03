import { formatPrice, PRICE_DISCLAIMER, type PriceGroup } from "@/content/pricing";

export function PriceTable({
  groups,
  showGroupTitles = true,
}: {
  groups: PriceGroup[];
  showGroupTitles?: boolean;
}) {
  return (
    <div className="space-y-10">
      {groups.map((group) => (
        <div key={group.id}>
          {showGroupTitles && <h3 className="text-2xl">{group.title}</h3>}
          {group.intro && <p className="mt-2 max-w-prose text-sm text-ink-500">{group.intro}</p>}
          <ul className="mt-5 divide-y divide-line rounded-lg border border-line">
            {group.items.map((item, i) => (
              <li
                key={`${item.label}-${item.sizeCm ?? i}`}
                className="flex items-baseline justify-between gap-4 px-4 py-3"
              >
                <span className="text-ink-700">
                  {item.label}
                  {item.sizeCm && (
                    <span className="ml-2 text-sm text-ink-500">{item.sizeCm} см</span>
                  )}
                  {item.note && !item.range && typeof item.price !== "number" && (
                    <span className="ml-2 text-sm text-ink-500">— {item.note}</span>
                  )}
                </span>
                <span className="shrink-0 whitespace-nowrap font-semibold text-navy-800">
                  {formatPrice(item)}
                </span>
              </li>
            ))}
          </ul>
          {group.items.some((it) => it.range && it.note) && (
            <p className="mt-2 text-xs text-ink-500">
              * При диапазон: по-ниската цена за изкуствени, по-високата за естествени.
            </p>
          )}
        </div>
      ))}
      <p className="text-sm text-ink-500">{PRICE_DISCLAIMER}</p>
    </div>
  );
}

export default PriceTable;
