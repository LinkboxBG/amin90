import { ceni } from "@/content/pages/ceni";
import { pageMetadata } from "@/lib/page-metadata";
import MarketingPageView from "@/components/sections/MarketingPageView";

export const metadata = pageMetadata(ceni);

export default function Page() {
  return <MarketingPageView page={ceni} />;
}
