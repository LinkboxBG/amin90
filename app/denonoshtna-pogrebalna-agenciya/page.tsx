import type { Metadata } from "next";
import { denonoshtna } from "@/content/pages/denonoshtna-pogrebalna-agenciya";
import { buildMetadata } from "@/lib/seo";
import ServicePageView from "@/components/sections/ServicePageView";

export const metadata: Metadata = buildMetadata({
  title: denonoshtna.metaTitle,
  description: denonoshtna.metaDescription,
  path: denonoshtna.slug,
});

export default function Page() {
  return <ServicePageView page={denonoshtna} />;
}
