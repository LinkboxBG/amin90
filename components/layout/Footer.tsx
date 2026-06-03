import Link from "next/link";
import { site } from "@/lib/site";
import Logo from "@/components/brand/Logo";
import { navigation } from "@/content/navigation";
import { PhoneIcon, PinIcon } from "@/components/ui/Icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="ds bg-navy-900">
      <div className="container-page py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Лого + слоган */}
          <div className="md:col-span-4">
            <Logo variant="on-dark" className="h-12 w-auto" />
            <p className="mt-5 max-w-xs text-on-dark-muted">
              Денонощна траурна агенция в гр. {site.city}. Организация на погребения, кремации,
              транспорт и паметници в цялата страна.
            </p>
            <p className="mt-4 font-display text-lg italic text-gold-500">{site.tagline}</p>
            {site.social.facebook && (
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block text-sm font-semibold text-on-dark transition-colors hover:text-gold-400"
              >
                Facebook →
              </a>
            )}
          </div>

          {/* Офиси */}
          <div className="md:col-span-5">
            <h3 className="text-lg text-white">Нашите офиси</h3>
            <hr className="gold-divider mt-3" />
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {site.offices.map((o) => (
                <div key={o.name}>
                  <p className="flex items-center gap-2 font-semibold text-white">
                    <PinIcon className="size-4 text-gold-500" />
                    {o.name}
                    {o.primary && <span className="text-xs font-normal text-gold-400">(централен)</span>}
                  </p>
                  <p className="mt-1 text-sm text-on-dark-muted">
                    {o.street}, {o.postal} {o.city}
                  </p>
                  <a
                    href={`tel:${o.phone}`}
                    className="mt-1 flex items-center gap-1.5 text-sm text-on-dark transition-colors hover:text-gold-400"
                  >
                    <PhoneIcon className="size-3.5 text-gold-500" />
                    {o.phoneDisplay}
                  </a>
                  {o.gmb && (
                    <a
                      href={o.gmb}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-xs text-on-dark-muted transition-colors hover:text-gold-400"
                    >
                      Виж в Google Карти →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Бързи връзки */}
          <div className="md:col-span-3">
            <h3 className="text-lg text-white">Връзки</h3>
            <hr className="gold-divider mt-3" />
            <ul className="mt-5 space-y-2">
              {navigation.map((item) => (
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
            <p className="mt-6 text-sm text-on-dark-muted">{site.hoursShort}</p>
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
