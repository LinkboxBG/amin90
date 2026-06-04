import { pogrebalna_agenciya_ognyanovo } from "@/content/pages/pogrebalna-agenciya-ognyanovo";
import { pageMetadata } from "@/lib/page-metadata";
import MarketingPageView from "@/components/sections/MarketingPageView";

export const metadata = pageMetadata(pogrebalna_agenciya_ognyanovo);

export default function Page() {
  return <MarketingPageView page={pogrebalna_agenciya_ognyanovo} />;
}
