import type { Metadata } from "next";
import { ketaringPomen } from "@/content/pages/ketaring-pomen";
import { buildMetadata } from "@/lib/seo";
import ServicePageView from "@/components/sections/ServicePageView";

export const metadata: Metadata = buildMetadata({
  title: ketaringPomen.metaTitle,
  description: ketaringPomen.metaDescription,
  path: ketaringPomen.slug,
});

export default function Page() {
  return <ServicePageView page={ketaringPomen} />;
}
