import type { Metadata } from "next";
import { traurniStoki } from "@/content/pages/traurni-stoki";
import { buildMetadata } from "@/lib/seo";
import ServicePageView from "@/components/sections/ServicePageView";

export const metadata: Metadata = buildMetadata({
  title: traurniStoki.metaTitle,
  description: traurniStoki.metaDescription,
  path: traurniStoki.slug,
});

// TODO: добави снимки от client-files/images/Ковчези/ и client-files/images/венци/, когато са налични.
export default function Page() {
  return <ServicePageView page={traurniStoki} />;
}
