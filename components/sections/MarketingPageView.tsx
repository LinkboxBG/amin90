import type { MarketingPageContent } from "@/content/types";
import { groupsForPage, PRICE_DISCLAIMER } from "@/content/pricing";
import Container from "@/components/ui/Container";
import Hero from "./Hero";
import Breadcrumbs from "./Breadcrumbs";
import ContentSections from "./ContentSections";
import InternalLinks from "./InternalLinks";
import CTABand from "./CTABand";
import FAQ from "./FAQ";
import PriceTable from "./PriceTable";
import PageSchema from "./PageSchema";
import ProductCards from "./ProductCards";
import CallButton from "@/components/ui/CallButton";
import PageVisualBlocks from "@/components/media/PageVisualBlocks";
import { visualsForPage } from "@/content/pageVisuals";

export function MarketingPageView({ page }: { page: MarketingPageContent }) {
  const priceGroups = page.pageVariant === "pricing" ? groupsForPage("/ceni") : groupsForPage(page.slug);
  const introFirst = page.intro[0];
  const introRest = page.intro.slice(1);
  const visuals = visualsForPage(page.slug);

  return (
    <>
      <Hero
        eyebrow="Погребална агенция АМИН"
        title={page.h1}
        text={introFirst}
        secondaryHref="/kontakti"
        secondaryLabel="Контакти"
      />
      <Breadcrumbs page={page} />

      {introRest.length > 0 && (
        <section className="section-tight">
          <Container>
            <div className="max-w-prose space-y-4 text-lg text-ink-700">
              {introRest.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {introRest.some((p) => p.includes("+359")) && (
                <div className="pt-2">
                  <CallButton />
                </div>
              )}
            </div>
          </Container>
        </section>
      )}

      <PageVisualBlocks blocks={visuals?.before} lead />

      {page.pageVariant === "product" && <ProductCards sections={page.sections} />}
      <ContentSections sections={page.sections} />

      <PageVisualBlocks blocks={visuals?.after} />

      {page.pageVariant === "pricing" && priceGroups.length > 0 && (
        <section className="section bg-paper">
          <Container narrow>
            <p className="mb-8 max-w-prose text-sm text-ink-500">{PRICE_DISCLAIMER}</p>
            <PriceTable groups={priceGroups} showGroupTitles />
          </Container>
        </section>
      )}

      {page.pageVariant !== "pricing" && priceGroups.length > 0 && (
        <section className="section-tight bg-paper">
          <Container narrow>
            <h2 className="text-2xl text-navy-900">Ориентировъчни цени</h2>
            <div className="mt-8">
              <PriceTable groups={priceGroups} showGroupTitles={priceGroups.length > 1} />
            </div>
          </Container>
        </section>
      )}

      <InternalLinks links={page.internalLinks} />

      <CTABand
        title="Денонощен телефон за съдействие"
        text="Обадете се на +359 87 8907 150 — ще ви насочим спокойно според конкретния случай."
      />

      {page.faq.length > 0 && <FAQ items={page.faq} />}

      <PageSchema page={page} />
    </>
  );
}

export default MarketingPageView;
