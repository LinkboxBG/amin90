import { pametnitsi } from "@/content/pages/pametnitsi";
import { pageMetadata } from "@/lib/page-metadata";
import MarketingPageView from "@/components/sections/MarketingPageView";

export const metadata = pageMetadata(pametnitsi);

export default function Page() {
  return <MarketingPageView page={pametnitsi} />;
}
