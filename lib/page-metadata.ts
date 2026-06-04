import type { Metadata } from "next";
import type { BasePageContent } from "@/content/types";
import { buildMetadata } from "@/lib/seo";

export function pageMetadata(page: Pick<BasePageContent, "metaTitle" | "metaDescription" | "slug">): Metadata {
  return buildMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: page.slug,
  });
}
