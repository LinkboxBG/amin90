import { pogrebalna_agenciya_plovdiv } from "@/content/pages/pogrebalna-agenciya-plovdiv";
import { pageMetadata } from "@/lib/page-metadata";
import MarketingPageView from "@/components/sections/MarketingPageView";

export const metadata = pageMetadata(pogrebalna_agenciya_plovdiv);

export default function Page() {
  return <MarketingPageView page={pogrebalna_agenciya_plovdiv} />;
}
