import { traurni_venci } from "@/content/pages/traurni-venci";
import { pageMetadata } from "@/lib/page-metadata";
import MarketingPageView from "@/components/sections/MarketingPageView";

export const metadata = pageMetadata(traurni_venci);

export default function Page() {
  return <MarketingPageView page={traurni_venci} />;
}
