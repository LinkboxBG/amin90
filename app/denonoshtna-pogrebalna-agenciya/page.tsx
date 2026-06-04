import { denonoshtna_pogrebalna_agenciya } from "@/content/pages/denonoshtna-pogrebalna-agenciya";
import { pageMetadata } from "@/lib/page-metadata";
import UrgentServiceView from "@/components/sections/UrgentServiceView";

export const metadata = pageMetadata(denonoshtna_pogrebalna_agenciya);

export default function Page() {
  return <UrgentServiceView page={denonoshtna_pogrebalna_agenciya} />;
}
