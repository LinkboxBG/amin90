import type { Metadata } from "next";
import { priceGroups } from "@/content/pricing";
import { buildMetadata } from "@/lib/seo";
import Hero from "@/components/sections/Hero";
import Container from "@/components/ui/Container";
import PriceTable from "@/components/sections/PriceTable";
import CTABand from "@/components/sections/CTABand";

export const metadata: Metadata = buildMetadata({
  title: "Ценоразпис – ориентировъчни цени | Погребална агенция АМИН",
  description:
    "Ориентировъчен ценоразпис на Погребална агенция АМИН в евро – паметници, организация на погребение, документи, траурни стоки, транспорт и кремация.",
  path: "/ceni",
});

export default function Page() {
  return (
    <>
      <Hero
        eyebrow="Прозрачност"
        title="Ценоразпис"
        subtitle="Ориентировъчни цени в евро (EUR)."
        text="Крайната цена зависи от конкретния случай. За точна оферта се свържете с нас по всяко време."
      />

      <section className="section">
        <Container narrow>
          <PriceTable groups={priceGroups} showGroupTitles />
        </Container>
      </section>

      <CTABand
        title="Нуждаете се от конкретна оферта"
        text="Свържете се с нас и ще получите ясни насоки и цена според вашия случай."
      />
    </>
  );
}
