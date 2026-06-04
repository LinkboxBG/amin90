import { ketaring_pomen } from "@/content/pages/ketaring-pomen";
import { pageMetadata } from "@/lib/page-metadata";
import MarketingPageView from "@/components/sections/MarketingPageView";

export const metadata = pageMetadata(ketaring_pomen);

export default function Page() {
  return <MarketingPageView page={ketaring_pomen} />;
}
