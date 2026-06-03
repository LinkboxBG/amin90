import type { Metadata } from "next";
import { pogrebenie } from "@/content/pages/pogrebenie";
import { buildMetadata } from "@/lib/seo";
import ServicePageView from "@/components/sections/ServicePageView";

export const metadata: Metadata = buildMetadata({
  title: pogrebenie.metaTitle,
  description: pogrebenie.metaDescription,
  path: pogrebenie.slug,
});

export default function Page() {
  return <ServicePageView page={pogrebenie} />;
}
