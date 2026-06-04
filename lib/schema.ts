import homepageSchema from "@/content/schemas/homepage.json";
import traurniUslugiSchema from "@/content/schemas/traurni-uslugi.json";
import pogrebenieSchema from "@/content/schemas/pogrebenie.json";
import kremaciyaSchema from "@/content/schemas/kremaciya.json";
import transportSchema from "@/content/schemas/transport-na-pokoinik.json";
import denonoshtnaSchema from "@/content/schemas/denonoshtna-pogrebalna-agenciya.json";
import dokumentiSchema from "@/content/schemas/dokumenti-za-pogrebenie.json";
import ketaringSchema from "@/content/schemas/ketaring-pomen.json";
import traurniStokiSchema from "@/content/schemas/traurni-stoki.json";
import traurniVenciSchema from "@/content/schemas/traurni-venci.json";
import pametnitsiSchema from "@/content/schemas/pametnitsi.json";
import ceniSchema from "@/content/schemas/ceni.json";
import zaNasSchema from "@/content/schemas/za-nas.json";
import kontaktiSchema from "@/content/schemas/kontakti.json";
import lokaciiSchema from "@/content/schemas/lokacii.json";
import stamboliyskiSchema from "@/content/schemas/pogrebalna-agenciya-stamboliyski.json";
import plovdivSchema from "@/content/schemas/pogrebalna-agenciya-plovdiv.json";
import tsalapitsaSchema from "@/content/schemas/pogrebalna-agenciya-tsalapitsa.json";
import krichimSchema from "@/content/schemas/pogrebalna-agenciya-krichim.json";
import ognyanovoSchema from "@/content/schemas/pogrebalna-agenciya-ognyanovo.json";

const SCHEMA_MAP: Record<string, object> = {
  homepage: homepageSchema,
  "traurni-uslugi": traurniUslugiSchema,
  pogrebenie: pogrebenieSchema,
  kremaciya: kremaciyaSchema,
  "transport-na-pokoinik": transportSchema,
  "denonoshtna-pogrebalna-agenciya": denonoshtnaSchema,
  "dokumenti-za-pogrebenie": dokumentiSchema,
  "ketaring-pomen": ketaringSchema,
  "traurni-stoki": traurniStokiSchema,
  "traurni-venci": traurniVenciSchema,
  pametnitsi: pametnitsiSchema,
  ceni: ceniSchema,
  "za-nas": zaNasSchema,
  kontakti: kontaktiSchema,
  lokacii: lokaciiSchema,
  "pogrebalna-agenciya-stamboliyski": stamboliyskiSchema,
  "pogrebalna-agenciya-plovdiv": plovdivSchema,
  "pogrebalna-agenciya-tsalapitsa": tsalapitsaSchema,
  "pogrebalna-agenciya-krichim": krichimSchema,
  "pogrebalna-agenciya-ognyanovo": ognyanovoSchema,
};

export function getPageSchema(schemaSlug: string | null): object | null {
  if (!schemaSlug) return null;
  return SCHEMA_MAP[schemaSlug] ?? null;
}
