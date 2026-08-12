import type { MarketingPageContent } from "@/content/types";
import { home } from "@/content/pages/home";
import { traurni_uslugi } from "@/content/pages/traurni-uslugi";
import { denonoshtna_pogrebalna_agenciya } from "@/content/pages/denonoshtna-pogrebalna-agenciya";
import { pogrebenie } from "@/content/pages/pogrebenie";
import { kremaciya } from "@/content/pages/kremaciya";
import { transport_na_pokoinik } from "@/content/pages/transport-na-pokoinik";
import { dokumenti_za_pogrebenie } from "@/content/pages/dokumenti-za-pogrebenie";
import { ketaring_pomen } from "@/content/pages/ketaring-pomen";
import { traurni_stoki } from "@/content/pages/traurni-stoki";
import { traurni_venci } from "@/content/pages/traurni-venci";
import { traurni_krastove } from "@/content/pages/traurni-krastove";
import { traurni_kovchezi } from "@/content/pages/traurni-kovchezi";
import { pametnitsi } from "@/content/pages/pametnitsi";
import { ceni } from "@/content/pages/ceni";
import { za_nas } from "@/content/pages/za-nas";
import { kontakti } from "@/content/pages/kontakti";
import { lokacii } from "@/content/pages/lokacii";
import { pogrebalna_agenciya_stamboliyski } from "@/content/pages/pogrebalna-agenciya-stamboliyski";
import { pogrebalna_agenciya_plovdiv } from "@/content/pages/pogrebalna-agenciya-plovdiv";
import { pogrebalna_agenciya_tsalapitsa } from "@/content/pages/pogrebalna-agenciya-tsalapitsa";
import { pogrebalna_agenciya_krichim } from "@/content/pages/pogrebalna-agenciya-krichim";
import { pogrebalna_agenciya_ognyanovo } from "@/content/pages/pogrebalna-agenciya-ognyanovo";

export const marketingPages: MarketingPageContent[] = [
  traurni_uslugi,
  denonoshtna_pogrebalna_agenciya,
  pogrebenie,
  kremaciya,
  transport_na_pokoinik,
  dokumenti_za_pogrebenie,
  ketaring_pomen,
  traurni_stoki,
  traurni_venci,
  traurni_krastove,
  traurni_kovchezi,
  pametnitsi,
  ceni,
  za_nas,
  kontakti,
  lokacii,
  pogrebalna_agenciya_stamboliyski,
  pogrebalna_agenciya_plovdiv,
  pogrebalna_agenciya_tsalapitsa,
  pogrebalna_agenciya_krichim,
  pogrebalna_agenciya_ognyanovo,
];

export function getMarketingPage(slug: string): MarketingPageContent | undefined {
  const normalized = slug.startsWith("/") ? slug : `/${slug}`;
  return marketingPages.find((p) => p.slug === normalized);
}

export const allRoutes: string[] = [
  "/",
  ...marketingPages.map((p) => p.slug),
];

export { home };
