import Link from "next/link";
import { site } from "@/lib/site";
import Logo from "@/components/brand/Logo";
import { footerLinks } from "@/content/navigation";
import { PhoneIcon, PinIcon } from "@/components/ui/Icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="ds bg-navy-900">
      <div className="container-page py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo variant="on-dark" className="h-12 w-auto" />
            <p className="mt-5 max-w-xs text-on-dark-muted">
              Денонощна траурна агенция с централен офис в гр. {site.city}. Съдействие за Пловдив и
              региона — погребения, кремации, транспорт и паметници.
            </p>
            <p className="mt-4 font-display text-lg italic text-gold-500">{site.tagline}</p>
            <a
              href={`tel:${site.primaryPhone}`}
              className="mt-5 flex items-center gap-2 text-lg font-semibold text-on-dark transition-colors hover:text-gold-400"
            >
              <PhoneIcon className="size-5 text-gold-500" />
              {site.primaryPhoneDisplay}
            </a>
            {site.social.facebook && (
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-semibold text-on-dark transition-colors hover:text-gold-400"
              >
                Facebook →
              </a>
            )}
          </div>

          <div className="md:col-span-5">
            <h3 className="text-lg text-white">Локации</h3>
            <hr className="gold-divider mt-3" />
            <p className="mt-4 text-sm text-on-dark-muted">
              <Link href="/lokacii" className="font-semibold text-gold-400 hover:text-gold-300">
                Всички локации и обслужвани райони →
              </Link>
            </p>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {site.offices.map((o) => (
                <div key={o.name}>
                  <p className="flex items-center gap-2 font-semibold text-white">
                    <PinIcon className="size-4 text-gold-500" />
                    {o.name}
                    {o.primary && (
                      <span className="text-xs font-normal text-gold-400">(централен офис)</span>
                    )}
                  </p>
                  <p className="mt-1 text-sm text-on-dark-muted">
                    {o.street}, {o.postal} {o.city}
                  </p>
                  <a
                    href={`tel:${o.phone}`}
                    className="mt-1 flex items-center gap-1.5 text-sm text-on-dark transition-colors hover:text-gold-400"
                  >
                    <PhoneIcon className="size-3.5 text-gold-500" />
                    {site.primaryPhoneDisplay}
                  </a>
                  {o.gmb && (
                    <a
                      href={o.gmb}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-xs text-on-dark-muted transition-colors hover:text-gold-400"
                    >
                      Google Карти →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-lg text-white">Връзки</h3>
            <hr className="gold-divider mt-3" />
            <ul className="mt-5 space-y-2">
              {footerLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-on-dark-muted transition-colors hover:text-gold-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-on-dark-muted">{site.hours}</p>
            <p className="mt-1 text-sm text-on-dark-muted">Управител: {site.manager}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-on-dark-muted sm:flex-row">
          <p>
            © {year} {site.name}. Всички права запазени.
          </p>
          <p>{site.credits}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
