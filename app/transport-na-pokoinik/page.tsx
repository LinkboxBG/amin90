import { transport_na_pokoinik } from "@/content/pages/transport-na-pokoinik";
import { pageMetadata } from "@/lib/page-metadata";
import MarketingPageView from "@/components/sections/MarketingPageView";

export const metadata = pageMetadata(transport_na_pokoinik);

export default function Page() {
  return <MarketingPageView page={transport_na_pokoinik} />;
}
