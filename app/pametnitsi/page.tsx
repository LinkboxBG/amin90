import type { Metadata } from "next";
import { pametnitsi } from "@/content/pages/pametnitsi";
import { buildMetadata } from "@/lib/seo";
import ServicePageView from "@/components/sections/ServicePageView";

export const metadata: Metadata = buildMetadata({
  title: pametnitsi.metaTitle,
  description: pametnitsi.metaDescription,
  path: pametnitsi.slug,
});

// TODO: потвърди с клиента — добави галерия от client-files/images/паметници/ (всички снимки са МРАМОР; не етикетирай като гранит)
// и мапинг конкретна снимка ↔ цена/размер, когато са налични.
export default function Page() {
  return <ServicePageView page={pametnitsi} />;
}
