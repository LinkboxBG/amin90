import { pogrebenie } from "@/content/pages/pogrebenie";
import { pageMetadata } from "@/lib/page-metadata";
import MarketingPageView from "@/components/sections/MarketingPageView";

export const metadata = pageMetadata(pogrebenie);

export default function Page() {
  return <MarketingPageView page={pogrebenie} />;
}
