import siteData from "@/content/site.json";

export type Office = {
  name: string;
  street: string;
  postal: string;
  city: string;
  phoneDisplay: string;
  phone: string;
  gmb?: string;
  primary?: boolean;
};

export type Site = {
  name: string;
  shortName: string;
  tagline: string;
  subtitle: string;
  manager: string;
  experienceYears: number;
  city: string;
  region: string;
  phones: string[];
  phonesDisplay: string[];
  primaryPhone: string;
  primaryPhoneDisplay: string;
  hours: string;
  hoursShort: string;
  offices: Office[];
  social: { facebook?: string };
  credits: string;
};

export const site = siteData as unknown as Site;

/** Базов URL за metadataBase и абсолютни URL-и в JSON-LD/sitemap */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

/** На staging (preview) индексирането е изключено */
export const IS_STAGING =
  (process.env.NEXT_PUBLIC_ENV ?? "staging").toLowerCase() !== "production";
