"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/content/navigation";
import { site } from "@/lib/site";
import Logo from "@/components/brand/Logo";
import { ChevronDownIcon, MenuIcon, CloseIcon, PhoneIcon } from "@/components/ui/Icons";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  /** Avoid active-link class mismatch between SSR and first client paint (hydration). */
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  function linkActive(href: string) {
    return hydrated && isActive(pathname, href);
  }

  return (
    <header className="ds sticky top-0 z-50 border-b border-gold-500/40 bg-navy-800/95 backdrop-blur supports-[backdrop-filter]:bg-navy-800/85">
      <div className="mx-auto grid h-16 w-full max-w-[1440px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-[var(--gutter)] md:h-[4.5rem] lg:gap-3">
        {/* Лого */}
        <Link
          href="/"
          aria-label="Погребална агенция АМИН — начало"
          className="relative z-10 flex shrink-0 items-center bg-navy-800 pr-1"
        >
          <Logo variant="on-dark" className="hidden h-10 w-auto lg:block xl:h-11" />
          <Logo variant="on-dark" wordmark className="block h-9 w-auto lg:hidden" />
        </Link>

        {/* Десктоп навигация */}
        <nav
          className="hidden min-w-0 justify-self-stretch overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] lg:block [&::-webkit-scrollbar]:hidden"
          aria-label="Основна навигация"
        >
          <div className="flex w-max flex-nowrap items-center gap-0.5 py-1 pr-2">
          {navigation.map((item) =>
            item.children ? (
              <div key={item.href} className="group relative shrink-0">
                <Link
                  href={item.href}
                  className={`flex items-center gap-0.5 whitespace-nowrap rounded-md px-2 py-2 text-xs font-semibold transition-colors hover:text-gold-400 xl:gap-1 xl:px-2.5 xl:text-sm ${
                    linkActive(item.href) ? "text-gold-400" : "text-on-dark"
                  }`}
                >
                  {item.label}
                  <ChevronDownIcon className="size-3.5 shrink-0 xl:size-4" />
                </Link>
                <div className="invisible absolute left-0 top-full min-w-60 translate-y-1 rounded-lg border border-gold-500/30 bg-navy-900 p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`block rounded-md px-3 py-2 text-sm transition-colors hover:bg-navy-700 hover:text-gold-400 ${
                        linkActive(child.href) ? "text-gold-400" : "text-on-dark-muted"
                      }`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 whitespace-nowrap rounded-md px-2 py-2 text-xs font-semibold transition-colors hover:text-gold-400 xl:px-2.5 xl:text-sm ${
                  linkActive(item.href) ? "text-gold-400" : "text-on-dark"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
          </div>
        </nav>

        {/* Дясна колона: CTA (десктоп) / мобилни контроли */}
        <div className="relative z-10 flex items-center justify-end gap-2 justify-self-end bg-navy-800 pl-1">
          <div className="hidden items-center gap-2 lg:flex xl:gap-3">
            <a
              href={`tel:${site.primaryPhone}`}
              className="hidden items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-on-dark transition-colors hover:text-gold-400 xl:flex"
            >
              <PhoneIcon className="size-3.5 shrink-0 text-gold-500" />
              {site.primaryPhoneDisplay}
            </a>
            <a
              href={`tel:${site.primaryPhone}`}
              className="btn btn-primary shrink-0 !min-h-10 !px-4 !py-2 text-sm xl:!min-h-11 xl:!px-5"
            >
              Обади се
            </a>
          </div>
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${site.primaryPhone}`}
              className="btn btn-primary !min-h-10 !px-4 !py-2 text-sm"
              aria-label={`Обади се на ${site.primaryPhoneDisplay}`}
            >
              <PhoneIcon className="size-4" />
              <span className="hidden sm:inline">Обади се</span>
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Отвори меню"
              aria-expanded={mobileOpen}
              className="inline-flex size-10 items-center justify-center rounded-md text-on-dark"
            >
              <MenuIcon className="size-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Мобилно меню (Sheet / full-screen overlay) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Меню">
          <div className="ds flex h-full flex-col bg-navy-800">
            <div className="container-page flex h-16 items-center justify-between border-b border-gold-500/30">
              <Logo variant="on-dark" wordmark className="h-9 w-auto" />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Затвори меню"
                className="inline-flex size-10 items-center justify-center rounded-md text-on-dark"
              >
                <CloseIcon className="size-6" />
              </button>
            </div>

            <nav className="container-page flex-1 overflow-y-auto py-6" aria-label="Мобилна навигация">
              <ul className="space-y-1">
                {navigation.map((item) =>
                  item.children ? (
                    <li key={item.href}>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenDropdown((v) => (v === item.href ? null : item.href))
                        }
                        aria-expanded={openDropdown === item.href}
                        className="flex w-full items-center justify-between rounded-md px-3 py-3 text-lg font-semibold text-on-dark"
                      >
                        {item.label}
                        <ChevronDownIcon
                          className={`size-5 transition-transform ${openDropdown === item.href ? "rotate-180" : ""}`}
                        />
                      </button>
                      {openDropdown === item.href && (
                        <ul className="mb-2 ml-3 space-y-1 border-l border-gold-500/30 pl-3">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={() => setMobileOpen(false)}
                                className="block rounded-md px-3 py-2 text-base text-on-dark-muted"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ) : (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-md px-3 py-3 text-lg font-semibold text-on-dark"
                      >
                        {item.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </nav>

            <div className="container-page border-t border-gold-500/30 py-6">
              <p className="eyebrow mb-3">На разположение 24/7</p>
              <div className="flex flex-col gap-2">
                {site.phonesDisplay.map((p, i) => (
                  <a
                    key={p}
                    href={`tel:${site.phones[i]}`}
                    className="flex items-center gap-2 text-lg font-semibold text-on-dark"
                  >
                    <PhoneIcon className="size-5 text-gold-500" />
                    {p}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
