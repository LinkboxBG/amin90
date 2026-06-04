import { za_nas } from "@/content/pages/za-nas";
import { pageMetadata } from "@/lib/page-metadata";
import MarketingPageView from "@/components/sections/MarketingPageView";

export const metadata = pageMetadata(za_nas);

export default function Page() {
  return <MarketingPageView page={za_nas} />;
}
