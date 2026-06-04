import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/Icons";
import SiteImage from "@/components/media/SiteImage";
import { getPublicImage } from "@/content/siteImages";

export type ServiceCardItem = {
  title: string;
  text: string;
  href: string;
  imageId?: string;
};

export function ServiceCards({ services }: { services: ServiceCardItem[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s) => {
        const image = s.imageId ? getPublicImage(s.imageId) : null;
        return (
          <Link
            key={s.href}
            href={s.href}
            className="group flex flex-col overflow-hidden rounded-lg border border-line bg-white shadow-[var(--shadow-sm)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
          >
            {image && (
              <SiteImage
                image={image}
                aspect="landscape"
                rounded={false}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            )}
            <div className="flex flex-1 flex-col p-7">
              {!image && (
                <span
                  className="mb-4 h-px w-12 bg-gold-500 transition-all group-hover:w-20"
                  aria-hidden="true"
                />
              )}
              <h3 className="text-xl leading-snug">{s.title}</h3>
              <p className="mt-3 flex-1 text-ink-700">{s.text}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 transition-colors group-hover:text-gold-600">
                Научи повече
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default ServiceCards;
