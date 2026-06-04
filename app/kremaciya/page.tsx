import { kremaciya } from "@/content/pages/kremaciya";
import { pageMetadata } from "@/lib/page-metadata";
import MarketingPageView from "@/components/sections/MarketingPageView";

export const metadata = pageMetadata(kremaciya);

export default function Page() {
  return <MarketingPageView page={kremaciya} />;
}
