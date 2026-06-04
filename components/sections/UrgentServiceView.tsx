import type { MarketingPageContent } from "@/content/types";
import Container from "@/components/ui/Container";
import CallButton from "@/components/ui/CallButton";
import Breadcrumbs from "./Breadcrumbs";
import ContentSections from "./ContentSections";
import InternalLinks from "./InternalLinks";
import CTABand from "./CTABand";
import FAQ from "./FAQ";
import PageSchema from "./PageSchema";
import PageVisualBlocks from "@/components/media/PageVisualBlocks";
import { visualsForPage } from "@/content/pageVisuals";

/** Compact 24/7 page — phone CTA above the fold */
export function UrgentServiceView({ page }: { page: MarketingPageContent }) {
  const visuals = visualsForPage(page.slug);
  return (
    <>
      <section className="ds brand-canvas">
        <div className="container-page relative z-10 py-16 md:py-20">
          <div className="max-w-3xl fade-up">
            <p className="eyebrow mb-4">Денонощно · 24/7</p>
            <h1 className="text-balance text-4xl leading-[1.1] sm:text-5xl">{page.h1}</h1>
            {page.intro[0] && (
              <p className="mt-6 max-w-2xl text-lg text-on-dark-muted">{page.intro[0]}</p>
            )}
            <div className="mt-8">
              <CallButton label="Обадете се сега" />
            </div>
            <p className="mt-4 text-sm text-on-dark-muted">
              +359 87 8907 150 · включително събота, неделя и празнични дни
            </p>
          </div>
        </div>
      </section>

      <Breadcrumbs page={page} />

      {page.intro.length > 1 && (
        <section className="section-tight border-b border-line bg-paper">
          <Container narrow>
            <div className="max-w-prose space-y-4 text-lg text-ink-700">
              {page.intro.slice(1).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Container>
        </section>
      )}

      <ContentSections sections={page.sections} />
      <PageVisualBlocks blocks={visuals?.after} />
      <InternalLinks links={page.internalLinks} />
      <CTABand
        title="Нуждаете се от помощ сега?"
        text="Денонощен телефон: +359 87 8907 150"
      />
      {page.faq.length > 0 && <FAQ items={page.faq} />}
      <PageSchema page={page} />
    </>
  );
}

export default UrgentServiceView;
