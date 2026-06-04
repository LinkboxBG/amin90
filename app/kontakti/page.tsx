import { kontakti } from "@/content/pages/kontakti";
import { pageMetadata } from "@/lib/page-metadata";
import MarketingPageView from "@/components/sections/MarketingPageView";

export const metadata = pageMetadata(kontakti);

export default function Page() {
  return <MarketingPageView page={kontakti} />;
}
