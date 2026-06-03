import Link from "next/link";
import type { Metadata } from "next";
import { home } from "@/content/pages/home";
import { site } from "@/lib/site";
import { buildMetadata, funeralHomeJsonLd, faqJsonLd } from "@/lib/seo";
import Container from "@/components/ui/Container";
import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import SectionHeading from "@/components/sections/SectionHeading";
import ServiceCards from "@/components/sections/ServiceCards";
import BulletList from "@/components/sections/BulletList";
import CTABand from "@/components/sections/CTABand";
import FAQ from "@/components/sections/FAQ";
import Logo from "@/components/brand/Logo";
import CallButton from "@/components/ui/CallButton";
import JsonLd from "@/components/JsonLd";
import { PhoneIcon, PinIcon, ArrowRightIcon } from "@/components/ui/Icons";

export const metadata: Metadata = buildMetadata({
  title: home.metaTitle,
  description: home.metaDescription,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero
        showLogo
        eyebrow={home.city}
        title={home.h1}
        subtitle={home.subtitle}
        text={home.heroText}
      />

      <TrustStrip items={home.trustStrip} />

      {/* Добре дошли */}
      <section className="section">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="Добре дошли" title={home.welcomeHeading} />
              <div className="mt-8 max-w-prose space-y-4 text-lg">
                {home.welcomeParagraphs.map((p, i) => (
                  <p key={i} className="text-ink-700">
                    {p}
                  </p>
                ))}
              </div>
              <blockquote className="accent-rule mt-8 font-display text-xl italic text-navy-800">
                {home.welcomeAccent}
              </blockquote>
              <div className="mt-8">
                <CallButton variant="outline" label="Свържете се с нас" withNumber={false} />
              </div>
            </div>
            <div className="brand-frame flex aspect-square flex-col items-center justify-center p-10 text-center">
              <Logo variant="on-light" className="w-3/4 max-w-xs" />
              <p className="mt-6 font-display text-lg italic text-gold-700">{home.subtitle}</p>
              <p className="mt-2 text-sm text-ink-500">
                {site.experienceYears} години опит · собствена ритуална база
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Услуги grid */}
      <section className="section bg-paper">
        <Container>
          <SectionHeading eyebrow="Нашите траурни услуги" title="Предлагаме цялостни решения" />
          <p className="mt-4 max-w-prose text-lg text-ink-700">
            Съобразени с конкретната ситуация и желанията на семейството.
          </p>
          <div className="mt-12">
            <ServiceCards services={home.services} />
          </div>
          <div className="mt-10">
            <Link
              href="/traurni-uslugi"
              className="inline-flex items-center gap-1.5 font-semibold text-gold-700 transition-colors hover:text-gold-600"
            >
              Виж всички услуги
              <ArrowRightIcon className="size-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Защо АМИН */}
      <section className="section">
        <Container>
          <SectionHeading eyebrow="Доверие" title={home.whyHeading} />
          <div className="mt-10">
            <BulletList items={home.why} />
          </div>
        </Container>
      </section>

      {/* Цитат */}
      <section className="ds bg-navy-800">
        <div className="container-narrow py-16 text-center md:py-20">
          <span className="font-display text-6xl italic leading-none text-gold-500" aria-hidden="true">
            „
          </span>
          <p className="mt-2 font-display text-3xl italic text-white md:text-4xl">{home.quote}</p>
        </div>
      </section>

      {/* Офиси */}
      <section className="section">
        <Container>
          <SectionHeading eyebrow="Нашите офиси" title="Близо до вас в региона" />
          <p className="mt-4 max-w-prose text-lg text-ink-700">
            Разполагаме с офиси в региона, което ни позволява бързо съдействие при необходимост.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {site.offices.map((o) => (
              <article key={o.name} className="rounded-lg border border-line bg-white p-6">
                <p className="flex items-center gap-2 text-lg font-semibold text-navy-800">
                  <PinIcon className="size-5 text-gold-500" />
                  {o.name}
                </p>
                <p className="mt-2 text-sm text-ink-500">
                  {o.street}, {o.postal} {o.city}
                </p>
                <a
                  href={`tel:${o.phone}`}
                  className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-ink-700 transition-colors hover:text-gold-700"
                >
                  <PhoneIcon className="size-4 text-gold-500" />
                  {o.phoneDisplay}
                </a>
                {o.gmb && (
                  <a
                    href={o.gmb}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-xs text-ink-500 transition-colors hover:text-gold-700"
                  >
                    Виж в Google Карти →
                  </a>
                )}
              </article>
            ))}
          </div>
          {/* TODO: добави Google Maps embed и снимки на офисите, когато клиентът ги изпрати */}
        </Container>
      </section>

      <CTABand title={home.cta.title} text={home.cta.text} />

      <FAQ items={home.faq} />

      <JsonLd data={funeralHomeJsonLd()} />
      <JsonLd data={faqJsonLd(home.faq)} />
    </>
  );
}
