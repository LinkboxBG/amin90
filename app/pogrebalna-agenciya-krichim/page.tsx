import { pogrebalna_agenciya_krichim } from "@/content/pages/pogrebalna-agenciya-krichim";
import { pageMetadata } from "@/lib/page-metadata";
import MarketingPageView from "@/components/sections/MarketingPageView";

export const metadata = pageMetadata(pogrebalna_agenciya_krichim);

export default function Page() {
  return <MarketingPageView page={pogrebalna_agenciya_krichim} />;
}
