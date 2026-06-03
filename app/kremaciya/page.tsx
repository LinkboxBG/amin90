import type { Metadata } from "next";
import { kremaciya } from "@/content/pages/kremaciya";
import { buildMetadata } from "@/lib/seo";
import ServicePageView from "@/components/sections/ServicePageView";

export const metadata: Metadata = buildMetadata({
  title: kremaciya.metaTitle,
  description: kremaciya.metaDescription,
  path: kremaciya.slug,
});

export default function Page() {
  return <ServicePageView page={kremaciya} />;
}
