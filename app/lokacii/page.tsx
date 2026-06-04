import { lokacii } from "@/content/pages/lokacii";
import { pageMetadata } from "@/lib/page-metadata";
import MarketingPageView from "@/components/sections/MarketingPageView";

export const metadata = pageMetadata(lokacii);

export default function Page() {
  return <MarketingPageView page={lokacii} />;
}
