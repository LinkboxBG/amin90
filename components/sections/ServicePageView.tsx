import type { ServicePage } from "@/content/types";
import { groupsForPage } from "@/content/pricing";
import Container from "@/components/ui/Container";
import Hero from "./Hero";
import TrustStrip from "./TrustStrip";
import SectionHeading from "./SectionHeading";
import BulletList from "./BulletList";
import VariantCards from "./VariantCards";
import Steps from "./Steps";
import CTABand from "./CTABand";
import FAQ from "./FAQ";
import PriceTable from "./PriceTable";
import JsonLd from "@/components/JsonLd";
import { serviceJsonLd, faqJsonLd } from "@/lib/seo";

export function ServicePageView({ page }: { page: ServicePage }) {
  const priceGroups = groupsForPage(page.slug);
  // първият абзац е в Hero; в интро секцията показваме останалите
  const introRest = page.intro?.slice(1) ?? [];

  return (
    <>
      <Hero
        eyebrow="Погребална агенция АМИН"
        title={page.h1}
        subtitle={page.subtitle}
        text={page.intro?.[0]}
      />

      {page.trustStrip && <TrustStrip items={page.trustStrip} />}

      {/* Интро */}
      {introRest.length > 0 && (
        <section className="section">
          <Container>
            <SectionHeading eyebrow="За услугата" title={page.subtitle ?? page.h1} />
            <div className="mt-8 max-w-prose space-y-4 text-lg">
              {introRest.map((p, i) => (
                <p key={i} className="text-ink-700">
                  {p}
                </p>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Какво включва */}
      {page.whatIncludes && page.whatIncludes.length > 0 && (
        <section className="section-tight bg-paper">
          <Container>
            <SectionHeading eyebrow="Обхват" title="Какво включва услугата" />
            <div className="mt-10">
              <BulletList items={page.whatIncludes} />
            </div>
          </Container>
        </section>
      )}

      {/* Видове / варианти */}
      {page.variants && page.variants.length > 0 && (
        <section className="section">
          <Container>
            <SectionHeading eyebrow="Възможности" title="Видове и възможности" />
            <div className="mt-10">
              <VariantCards variants={page.variants} />
            </div>
          </Container>
        </section>
      )}

      {/* Стъпки */}
      {page.steps && page.steps.length > 0 && (
        <div className="bg-paper">
          <Steps steps={page.steps} />
        </div>
      )}

      {/* Какво поемаме */}
      {page.whatWeHandle && page.whatWeHandle.length > 0 && (
        <section className="section">
          <Container>
            <SectionHeading eyebrow="Грижата е наша" title="Какво поемаме вместо вас" />
            <div className="mt-10">
              <BulletList items={page.whatWeHandle} />
            </div>
          </Container>
        </section>
      )}

      {/* Релевантни цени */}
      {priceGroups.length > 0 && (
        <section className="section-tight bg-paper">
          <Container narrow>
            <SectionHeading eyebrow="Ориентировъчни цени" title="Цени" />
            <div className="mt-10">
              <PriceTable groups={priceGroups} showGroupTitles={priceGroups.length > 1} />
            </div>
          </Container>
        </section>
      )}

      {/* Обслужвани райони */}
      {page.areasServed && page.areasServed.length > 0 && (
        <section className="section-tight">
          <Container narrow>
            <div className="accent-rule">
              <p className="eyebrow mb-2">Обслужвани райони</p>
              <p className="text-lg text-ink-700">{page.areasServed.join(" · ")}</p>
            </div>
          </Container>
        </section>
      )}

      {page.cta && <CTABand title={page.cta.title} text={page.cta.text} />}

      {page.faq && page.faq.length > 0 && <FAQ items={page.faq} />}

      <JsonLd data={serviceJsonLd(page)} />
      {page.faq && page.faq.length > 0 && <JsonLd data={faqJsonLd(page.faq)} />}
    </>
  );
}

export default ServicePageView;
