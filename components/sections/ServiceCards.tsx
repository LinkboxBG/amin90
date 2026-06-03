import Link from "next/link";
import type { HomeService } from "@/content/pages/home";
import { ArrowRightIcon } from "@/components/ui/Icons";

export function ServiceCards({ services }: { services: HomeService[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s) => (
        <Link
          key={s.href}
          href={s.href}
          className="group flex flex-col rounded-lg border border-line bg-white p-7 shadow-[var(--shadow-sm)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
        >
          <span className="mb-4 h-px w-12 bg-gold-500 transition-all group-hover:w-20" aria-hidden="true" />
          <h3 className="text-xl leading-snug">{s.title}</h3>
          <p className="mt-3 flex-1 text-ink-700">{s.text}</p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 transition-colors group-hover:text-gold-600">
            Научи повече
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      ))}
    </div>
  );
}

export default ServiceCards;
