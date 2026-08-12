export type FAQItem = { q: string; a: string };

export type NavLink = { label: string; href: string };

export type ContentTable = {
  headers: string[];
  rows: string[][];
};

export type SectionPrice =
  | { kind: "single"; value: string; note?: string }
  | { kind: "list"; items: { label: string; value: string }[]; note?: string };

export type SectionButton = { label: string; href: string };

export type ProductModel = {
  name: string;
  imageId: string;
  colors: string[];
  size: string;
  price: string;
};

export type CatalogBox = { label: string; target: string };

export type ContentSection = {
  heading: string;
  /** Anchor id — рендерира се като <section id> със scroll-margin за котви от каталога. */
  id?: string;
  paragraphs?: string[];
  bullets?: string[];
  /** Рендерира bullets като номериран списък (процеси/стъпки). */
  numbered?: boolean;
  table?: ContentTable | null;
  /** Инлайн цена: chip до заглавието (single) или компактен ценови списък (list). */
  price?: SectionPrice;
  /** Изображения от регистъра: 1 → фигура, >1 → grid галерия. */
  imageIds?: string[];
  /** Галерията се отваря в лайтбокс при клик. */
  lightbox?: boolean;
  /** Продуктови модели (карти със снимка, цветове, размер, цена). */
  models?: ProductModel[];
  /** Каталожна решетка от кутии: "#anchor" котви или "/path" линкове. */
  catalogBoxes?: CatalogBox[];
  button?: SectionButton;
  showPhoneCta?: boolean;
};

export type FinalCta = { title: string; text?: string };

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
  /** Финален CTA (заглавие + текст) за CTABand; без него се ползва generic текстът. */
  finalCta?: FinalCta;
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
