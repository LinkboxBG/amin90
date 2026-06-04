import Link from "next/link";
import type { BasePageContent } from "@/content/types";

export function Breadcrumbs({ page }: { page: BasePageContent }) {
  if (page.slug === "/") return null;

  const crumbs: { label: string; href?: string }[] = [{ label: "Начало", href: "/" }];

  if (page.slug.startsWith("/pogrebalna-agenciya-")) {
    crumbs.push({ label: "Локации", href: "/lokacii" });
  } else if (
    [
      "/pogrebenie",
      "/kremaciya",
      "/transport-na-pokoinik",
      "/denonoshtna-pogrebalna-agenciya",
      "/dokumenti-za-pogrebenie",
      "/ketaring-pomen",
      "/traurni-uslugi",
    ].includes(page.slug)
  ) {
    crumbs.push({ label: "Траурни услуги", href: "/traurni-uslugi" });
  } else if (["/traurni-stoki", "/traurni-venci"].includes(page.slug)) {
    crumbs.push({ label: "Траурни стоки", href: "/traurni-stoki" });
  }

  crumbs.push({ label: page.h1 });

  return (
    <nav aria-label="Breadcrumb" className="border-b border-line bg-paper">
      <ol className="container-page flex flex-wrap items-center gap-2 py-3 text-sm text-ink-500">
        {crumbs.map((c, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {c.href ? (
              <Link href={c.href} className="transition-colors hover:text-navy-800">
                {c.label}
              </Link>
            ) : (
              <span className="text-ink-700">{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
