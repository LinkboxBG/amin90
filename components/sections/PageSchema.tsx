import JsonLd from "@/components/JsonLd";
import { getPageSchema } from "@/lib/schema";
import type { BasePageContent } from "@/content/types";

export function PageSchema({ page }: { page: BasePageContent }) {
  const data = getPageSchema(page.schemaSlug);
  if (!data) return null;
  return <JsonLd data={data} />;
}

export default PageSchema;
