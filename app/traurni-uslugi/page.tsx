import { traurni_uslugi } from "@/content/pages/traurni-uslugi";
import { pageMetadata } from "@/lib/page-metadata";
import MarketingPageView from "@/components/sections/MarketingPageView";

export const metadata = pageMetadata(traurni_uslugi);

export default function Page() {
  return <MarketingPageView page={traurni_uslugi} />;
}
