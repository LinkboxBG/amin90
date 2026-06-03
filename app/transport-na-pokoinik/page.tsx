import type { Metadata } from "next";
import { transport } from "@/content/pages/transport-na-pokoinik";
import { buildMetadata } from "@/lib/seo";
import ServicePageView from "@/components/sections/ServicePageView";

export const metadata: Metadata = buildMetadata({
  title: transport.metaTitle,
  description: transport.metaDescription,
  path: transport.slug,
});

export default function Page() {
  return <ServicePageView page={transport} />;
}
