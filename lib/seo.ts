import type { Metadata } from "next";
import type { FAQItem, ServicePage } from "@/content/types";
import { site, SITE_URL } from "./site";

/** JSON-LD за FuneralHome с 4-те офиса като subOrganization (начална страница) */
export function funeralHomeJsonLd() {
  const primary = site.offices.find((o) => o.primary) ?? site.offices[0];
  return {
    "@context": "https://schema.org",
    "@type": "FuneralHome",
    name: site.name,
    description:
      "Денонощна погребална агенция в гр. Стамболийски. Организация на погребения, кремации, транспорт и паметници в цялата страна.",
    url: SITE_URL,
    image: `${SITE_URL}/icon.svg`,
    logo: `${SITE_URL}/icon.svg`,
    telephone: site.primaryPhone,
    foundingDate: String(new Date().getFullYear() - site.experienceYears),
    areaServed: "България",
    address: {
      "@type": "PostalAddress",
      streetAddress: primary.street,
      addressLocality: primary.city,
      postalCode: primary.postal,
      addressCountry: "BG",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: site.social.facebook ? [site.social.facebook] : undefined,
    subOrganization: site.offices.map((o) => ({
      "@type": "FuneralHome",
      name: `${site.shortName} – ${o.name}`,
      telephone: o.phone,
      url: o.gmb,
      address: {
        "@type": "PostalAddress",
        streetAddress: o.street,
        addressLocality: o.city,
        postalCode: o.postal,
        addressCountry: "BG",
      },
    })),
  };
}

/** JSON-LD за Service (страници-услуги) */
export function serviceJsonLd(page: ServicePage) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: page.serviceType ?? page.h1,
    name: page.h1,
    description: page.metaDescription,
    url: `${SITE_URL}${page.slug}`,
    areaServed: "България",
    provider: {
      "@type": "FuneralHome",
      name: site.name,
      telephone: site.primaryPhone,
      url: SITE_URL,
    },
    availableChannel: {
      "@type": "ServiceChannel",
      servicePhone: {
        "@type": "ContactPoint",
        telephone: site.primaryPhone,
      },
    },
  };
}

/** JSON-LD за FAQPage */
export function faqJsonLd(faq: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

type MetaInput = {
  title: string;
  description: string;
  path: string;
};

/** Унифицирана генерация на метаданни от съдържанието */
export function buildMetadata({ title, description, path }: MetaInput): Metadata {
  const url = path === "/" ? "/" : path;
  return {
    // metaTitle вече съдържа бранда — без template, за да няма дублиране
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: "bg_BG",
      type: "website",
    },
  };
}
