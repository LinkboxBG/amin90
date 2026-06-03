import type { ServicePage } from "@/content/types";
import { traurniUslugi } from "@/content/pages/traurni-uslugi";
import { denonoshtna } from "@/content/pages/denonoshtna-pogrebalna-agenciya";
import { pogrebenie } from "@/content/pages/pogrebenie";
import { kremaciya } from "@/content/pages/kremaciya";
import { transport } from "@/content/pages/transport-na-pokoinik";
import { ketaringPomen } from "@/content/pages/ketaring-pomen";
import { pametnitsi } from "@/content/pages/pametnitsi";
import { traurniStoki } from "@/content/pages/traurni-stoki";

export const servicePages: ServicePage[] = [
  traurniUslugi,
  denonoshtna,
  pogrebenie,
  kremaciya,
  transport,
  ketaringPomen,
  pametnitsi,
  traurniStoki,
];

export function getServicePage(slug: string): ServicePage | undefined {
  const normalized = slug.startsWith("/") ? slug : `/${slug}`;
  return servicePages.find((p) => p.slug === normalized);
}

/** всички вътрешни маршрути за sitemap */
export const allRoutes: string[] = [
  "/",
  ...servicePages.map((p) => p.slug),
  "/ceni",
];
