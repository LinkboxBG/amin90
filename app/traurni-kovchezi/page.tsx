import { traurni_kovchezi } from "@/content/pages/traurni-kovchezi";
import { pageMetadata } from "@/lib/page-metadata";
import MarketingPageView from "@/components/sections/MarketingPageView";

export const metadata = pageMetadata(traurni_kovchezi);

export default function Page() {
  return <MarketingPageView page={traurni_kovchezi} />;
}
