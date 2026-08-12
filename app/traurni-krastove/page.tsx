import { traurni_krastove } from "@/content/pages/traurni-krastove";
import { pageMetadata } from "@/lib/page-metadata";
import MarketingPageView from "@/components/sections/MarketingPageView";

export const metadata = pageMetadata(traurni_krastove);

export default function Page() {
  return <MarketingPageView page={traurni_krastove} />;
}
