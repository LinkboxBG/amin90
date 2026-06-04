import { traurni_stoki } from "@/content/pages/traurni-stoki";
import { pageMetadata } from "@/lib/page-metadata";
import MarketingPageView from "@/components/sections/MarketingPageView";

export const metadata = pageMetadata(traurni_stoki);

export default function Page() {
  return <MarketingPageView page={traurni_stoki} />;
}
