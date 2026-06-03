export type FAQItem = { q: string; a: string };
export type Step = { title: string; text?: string };
export type Variant = { title: string; text: string };

export type CTASection = { title: string; text: string };

export type ServicePage = {
  slug: string;
  h1: string;
  subtitle?: string;
  /** уводни параграфи */
  intro?: string[];
  /** авторитетна лента */
  trustStrip?: string[];
  /** „Какво включва" — bullet списък */
  whatIncludes?: string[];
  /** „Видове…" — карти/варианти */
  variants?: Variant[];
  /** „Как протича процесът" — стъпки */
  steps?: Step[];
  /** „Какво поемаме вместо вас" */
  whatWeHandle?: string[];
  /** обслужвани населени места */
  areasServed?: string[];
  cta?: CTASection;
  faq: FAQItem[];
  metaTitle: string;
  metaDescription: string;
  /** serviceType за Service JSON-LD */
  serviceType?: string;
};
