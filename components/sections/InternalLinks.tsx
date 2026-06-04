import Link from "next/link";
import type { NavLink } from "@/content/types";
import Container from "@/components/ui/Container";
import SectionHeading from "./SectionHeading";

export function InternalLinks({ links }: { links: NavLink[] }) {
  if (!links.length) return null;
  return (
    <section className="section-tight">
      <Container narrow>
        <SectionHeading eyebrow="Навигация" title="Свързани страници" />
        <ul className="mt-8 flex flex-wrap gap-3">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="inline-flex rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-navy-800 transition-colors hover:border-gold-500 hover:text-gold-700"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export default InternalLinks;
