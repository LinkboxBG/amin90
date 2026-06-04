import { pogrebalna_agenciya_tsalapitsa } from "@/content/pages/pogrebalna-agenciya-tsalapitsa";
import { pageMetadata } from "@/lib/page-metadata";
import MarketingPageView from "@/components/sections/MarketingPageView";

export const metadata = pageMetadata(pogrebalna_agenciya_tsalapitsa);

export default function Page() {
  return <MarketingPageView page={pogrebalna_agenciya_tsalapitsa} />;
}
