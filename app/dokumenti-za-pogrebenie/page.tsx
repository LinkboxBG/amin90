import { dokumenti_za_pogrebenie } from "@/content/pages/dokumenti-za-pogrebenie";
import { pageMetadata } from "@/lib/page-metadata";
import MarketingPageView from "@/components/sections/MarketingPageView";

export const metadata = pageMetadata(dokumenti_za_pogrebenie);

export default function Page() {
  return <MarketingPageView page={dokumenti_za_pogrebenie} />;
}
