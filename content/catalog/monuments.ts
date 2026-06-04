/**
 * Monument catalog for /pametnitsi.
 *
 * Each item references a public image id from the registry. Titles describe the
 * visible model only — no invented prices, sizes or SKU numbers. Cards carry a
 * single CTA that routes to contact / phone.
 */
import { getPublicImages, type SiteImage } from "@/content/siteImages";

export type MonumentGroup =
  | "Класически паметници"
  | "Паметници с кръст"
  | "Паметници със сърце"
  | "Паметници с флорални орнаменти"
  | "Индивидуални модели";

export type MonumentItem = {
  image: SiteImage;
  title: string;
  group: MonumentGroup;
  description: string;
};

/** Map of monument image id -> group + short description. */
const MONUMENT_DEFS: { id: string; group: MonumentGroup; description: string }[] = [
  {
    id: "pametnik-01",
    group: "Паметници с флорални орнаменти",
    description: "Модел с флорална декорация, подходящ за персонализация с надпис и допълнителни елементи.",
  },
  {
    id: "pametnik-02",
    group: "Класически паметници",
    description: "Изчистен класически модел от мрамор, подходящ за традиционно оформление.",
  },
  {
    id: "pametnik-13",
    group: "Класически паметници",
    description: "Класически мраморен паметник със спокойна, балансирана форма.",
  },
  {
    id: "pametnik-12",
    group: "Класически паметници",
    description: "Семпъл модел с изчистена форма за по-минималистично оформление.",
  },
  {
    id: "pametnik-05",
    group: "Паметници с кръст",
    description: "Мраморен паметник с кръст — традиционен православен мотив.",
  },
  {
    id: "pametnik-09",
    group: "Паметници с кръст",
    description: "Модел с православен кръст, подходящ за класически ритуал.",
  },
  {
    id: "pametnik-17",
    group: "Паметници с кръст",
    description: "Мраморен паметник с кръст и допълнителни орнаменти.",
  },
  {
    id: "pametnik-19",
    group: "Паметници с флорални орнаменти",
    description: "Комбинация от рози и кръст в едно цялостно оформление.",
  },
  {
    id: "pametnik-07",
    group: "Паметници със сърце",
    description: "Мраморен паметник във форма на сърце за по-личен акцент.",
  },
  {
    id: "pametnik-08",
    group: "Паметници с флорални орнаменти",
    description: "Модел с рози, подходящ за по-топло и нежно оформление.",
  },
  {
    id: "pametnik-16",
    group: "Паметници с флорални орнаменти",
    description: "Флорална декорация върху мрамор с възможност за персонализация.",
  },
  {
    id: "pametnik-18",
    group: "Индивидуални модели",
    description: "Модел с гълъби — символ на покой и памет.",
  },
  {
    id: "pametnik-06",
    group: "Индивидуални модели",
    description: "Надгробна плоча със заоблена форма за по-меко излъчване.",
  },
  {
    id: "pametnik-21",
    group: "Индивидуални модели",
    description: "Индивидуален модел по конкретна идея на близките.",
  },
];

export const monumentCatalog: MonumentItem[] = MONUMENT_DEFS.flatMap((def) => {
  const [image] = getPublicImages([def.id]);
  if (!image) return [];
  return [
    {
      image,
      title: image.title ?? image.alt,
      group: def.group,
      description: def.description,
    },
  ];
});

/** Ordered list of groups that actually have at least one catalog item. */
export const monumentGroups: MonumentGroup[] = (
  [
    "Класически паметници",
    "Паметници с кръст",
    "Паметници със сърце",
    "Паметници с флорални орнаменти",
    "Индивидуални модели",
  ] as MonumentGroup[]
).filter((group) => monumentCatalog.some((item) => item.group === group));
