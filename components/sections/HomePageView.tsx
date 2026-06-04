import Link from "next/link";
import type { HomePageContent } from "@/content/types";
import Container from "@/components/ui/Container";
import Hero from "./Hero";
import ContentSections from "./ContentSections";
import InternalLinks from "./InternalLinks";
import CTABand from "./CTABand";
import FAQ from "./FAQ";
import PageSchema from "./PageSchema";
import ServiceCards from "./ServiceCards";
import TrustImageBlock from "@/components/media/TrustImageBlock";
import CallButton from "@/components/ui/CallButton";
import SectionHeading from "./SectionHeading";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { getPublicImage } from "@/content/siteImages";

const HOME_SERVICES = [
  {
    title: "Организация на погребение",
    text: "Пълно съдействие при погребение — документи, транспорт, ритуал и подготовка.",
    href: "/pogrebenie",
    imageId: "organizatsiya-pogrebenie-04",
  },
  {
    title: "Кремация",
    text: "Съдействие при кремация, документи и транспорт до крематориум в Пловдив.",
    href: "/kremaciya",
    imageId: "kremaciya-01",
  },
  {
    title: "Транспорт на покойник",
    text: "Денонощен транспорт в региона и цяла България.",
    href: "/transport-na-pokoinik",
    imageId: "katafalka-01",
  },
  {
    title: "Денонощна агенция",
    text: "24/7 насоки и организация при спешен случай.",
    href: "/denonoshtna-pogrebalna-agenciya",
    imageId: "denonoshtna-agenciya-01",
  },
  {
    title: "Траурни стоки и венци",
    text: "Ковчези, венци, свещи и ритуални принадлежности.",
    href: "/traurni-stoki",
    imageId: "kovcheg-08",
  },
  {
    title: "Паметници",
    text: "Изработка на паметници и надгробни плочи.",
    href: "/pametnitsi",
    imageId: "pametnik-13",
  },
];

export function HomePageView({ page }: { page: HomePageContent }) {
  const introFirst = page.intro[0];
  const introRest = page.intro.slice(1);
  const trustImage = getPublicImage("pametnik-23");

  return (
    <>
      <Hero
        showLogo
        eyebrow="Траурна агенция АМИН"
        title={page.h1}
        subtitle="Денонощно съдействие в Стамболийски, Пловдив и региона"
        text={introFirst}
        secondaryHref="/traurni-uslugi"
        secondaryLabel="Траурни услуги"
      />

      {introRest.length > 0 && (
        <section className="section-tight">
          <Container>
            <div className="max-w-prose space-y-4 text-lg text-ink-700">
              {introRest.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <CallButton />
            </div>
          </Container>
        </section>
      )}

      <section className="section bg-paper">
        <Container>
          <SectionHeading eyebrow="Услуги" title="Основни траурни и погребални услуги" />
          <div className="mt-12">
            <ServiceCards services={HOME_SERVICES} />
          </div>
          <div className="mt-10">
            <Link
              href="/traurni-uslugi"
              className="inline-flex items-center gap-2 font-semibold text-navy-800 hover:text-gold-700"
            >
              Всички траурни услуги
              <ArrowRightIcon className="size-4" />
            </Link>
          </div>
        </Container>
      </section>

      <ContentSections sections={page.sections} />

      {trustImage && (
        <TrustImageBlock
          eyebrow="Собствена дейност"
          title="Реална база и собствена изработка"
          image={trustImage}
        />
      )}

      <InternalLinks links={page.internalLinks} />

      <CTABand
        title="Денонощен телефон"
        text="Обадете се на +359 87 8907 150 — ще ви насочим спокойно според конкретния случай."
      />

      {page.faq.length > 0 && <FAQ items={page.faq} />}
      <PageSchema page={page} />
    </>
  );
}

export default HomePageView;
