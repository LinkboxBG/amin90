import type { Metadata } from "next";
import { traurniUslugi } from "@/content/pages/traurni-uslugi";
import { buildMetadata } from "@/lib/seo";
import ServicePageView from "@/components/sections/ServicePageView";

export const metadata: Metadata = buildMetadata({
  title: traurniUslugi.metaTitle,
  description: traurniUslugi.metaDescription,
  path: traurniUslugi.slug,
});

export default function Page() {
  return <ServicePageView page={traurniUslugi} />;
}
