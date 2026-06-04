import { pogrebalna_agenciya_stamboliyski } from "@/content/pages/pogrebalna-agenciya-stamboliyski";
import { pageMetadata } from "@/lib/page-metadata";
import MarketingPageView from "@/components/sections/MarketingPageView";

export const metadata = pageMetadata(pogrebalna_agenciya_stamboliyski);

export default function Page() {
  return <MarketingPageView page={pogrebalna_agenciya_stamboliyski} />;
}
