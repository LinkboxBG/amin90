import { home } from "@/lib/content";
import { pageMetadata } from "@/lib/page-metadata";
import HomePageView from "@/components/sections/HomePageView";

export const metadata = pageMetadata(home);

export default function HomePage() {
  return <HomePageView page={home} />;
}
