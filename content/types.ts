export type FAQItem = { q: string; a: string };

export type NavLink = { label: string; href: string };

export type ContentTable = {
  headers: string[];
  rows: string[][];
};

export type ContentSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: ContentTable | null;
  showPhoneCta?: boolean;
};

export type PageVariant =
  | "home"
  | "marketing"
  | "urgent"
  | "pricing"
  | "product"
  | "location"
  | "hub";

export type BasePageContent = {
  slug: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  canonical: string;
  intro: string[];
  sections: ContentSection[];
  faq: FAQItem[];
  internalLinks: NavLink[];
  schemaSlug: string | null;
  schemaStatus: "approved" | "needs_review" | "invalid";
  pageVariant: PageVariant;
};

export type MarketingPageContent = BasePageContent;

export type HomePageContent = BasePageContent & {
  pageVariant: "home";
};

/** @deprecated Use MarketingPageContent — kept for gradual migration */
export type Step = { title: string; text?: string };
export type Variant = { title: string; text: string };
export type CTASection = { title: string; text: string };
export type ServicePage = {
  slug: string;
  h1: string;
  subtitle?: string;
  intro?: string[];
  trustStrip?: string[];
  whatIncludes?: string[];
  variants?: Variant[];
  steps?: Step[];
  whatWeHandle?: string[];
  areasServed?: string[];
  cta?: CTASection;
  faq: FAQItem[];
  metaTitle: string;
  metaDescription: string;
  serviceType?: string;
};
