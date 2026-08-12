/**
 * Central image registry for amin90.
 *
 * Single source of truth for every client photo that may be rendered on the
 * site. Public pages must consume images through this registry (or the catalog
 * / pageVisuals modules built on top of it) instead of hardcoding paths, so the
 * denylist below can guarantee sensitive photos never reach the public HTML.
 *
 * Files live in /public/images/<id>.{jpg|png} and are synced by
 * scripts/copy-client-images.mjs (JPGs) or added manually (e.g. branded PNGs).
 */

export type ImageCategory =
  | "transport"
  | "coffins"
  | "funeral-service"
  | "memorial-hall"
  | "funeral-catering"
  | "wreaths"
  | "monuments"
  | "monuments-catalog"
  | "trust"
  | "do-not-use";

export type ImageUsage =
  | "hero"
  | "gallery"
  | "catalog"
  | "supporting"
  | "trust"
  | "do-not-use";

export type ImageAspect = "portrait" | "landscape" | "square";

export type SiteImage = {
  id: string;
  src: string;
  alt: string;
  title?: string;
  category: ImageCategory;
  usage: ImageUsage;
  /** Slugs where this image is intended to appear (documentation/intent). */
  pages: string[];
  priority?: boolean;
  containsPersonalData?: boolean;
  note?: string;
  aspect?: ImageAspect;
};

const DO_NOT_USE_NOTE =
  "Contains personal names/dates/photos. Do not use publicly unless manually edited and approved.";

/** Helper to keep entries terse while deriving src from id. */
function img(
  entry: Omit<SiteImage, "src"> & { ext?: "jpg" | "png" },
): SiteImage {
  const { ext = "jpg", ...rest } = entry;
  return { ...rest, src: `/images/${rest.id}.${ext}` };
}

/**
 * Registry keyed by image id (= filename without extension).
 * Order is grouped by category for readability.
 */
export const siteImages: Record<string, SiteImage> = {
  // === Транспорт / катафалка ===
  "katafalka-01": img({
    id: "katafalka-01",
    alt: "Катафалка на траурна агенция АМИН при зимни условия",
    category: "transport",
    usage: "hero",
    pages: ["/transport-na-pokoinik", "/", "/denonoshtna-pogrebalna-agenciya"],
    priority: true,
    aspect: "landscape",
  }),
  "katafalka-02": img({
    id: "katafalka-02",
    alt: "Катафалка за транспорт на покойник от АМИН",
    category: "transport",
    usage: "supporting",
    pages: ["/transport-na-pokoinik"],
    aspect: "landscape",
  }),
  "katafalka-03": img({
    id: "katafalka-03",
    alt: "Траурен транспорт с катафалка от АМИН",
    category: "transport",
    usage: "supporting",
    pages: ["/transport-na-pokoinik", "/za-nas", "/kontakti"],
    aspect: "landscape",
  }),
  "katafalka-04": img({
    id: "katafalka-04",
    alt: "Катафалка на погребална агенция АМИН",
    category: "transport",
    usage: "supporting",
    pages: ["/transport-na-pokoinik"],
    aspect: "landscape",
  }),
  "katafalka-05": img({
    id: "katafalka-05",
    alt: "",
    category: "do-not-use",
    usage: "do-not-use",
    pages: [],
    note: "Близък фронтален кадър с ясно видим регистрационен номер. Да не се публикува.",
    aspect: "landscape",
  }),

  // === Ковчези ===
  "kovcheg-01": img({
    id: "kovcheg-01",
    alt: "Каталогов модел ковчег от АМИН",
    category: "coffins",
    usage: "gallery",
    pages: ["/traurni-stoki"],
    note: "Външно брандиране/каталожен фон — само второстепенно, не като основна снимка.",
    aspect: "landscape",
  }),
  // kovcheg-02/03/05/06/07 са каталожни снимки на драперии за ковчег (уточнено
  // от клиента в promeni-08-26) — ползват се в секцията „Драперии за ковчег".
  "kovcheg-02": img({
    id: "kovcheg-02",
    alt: "Драперия за ковчег — бял сатен, каталожен модел",
    category: "coffins",
    usage: "catalog",
    pages: ["/traurni-stoki"],
    aspect: "landscape",
  }),
  "kovcheg-03": img({
    id: "kovcheg-03",
    alt: "Драперия за ковчег от каталога на АМИН",
    category: "coffins",
    usage: "catalog",
    pages: ["/traurni-stoki"],
    aspect: "landscape",
  }),
  "kovcheg-04": img({
    id: "kovcheg-04",
    alt: "Каталогов модел ковчег от АМИН",
    category: "coffins",
    usage: "gallery",
    pages: ["/traurni-stoki"],
    note: "Външно брандиране/каталожен фон — само второстепенно, не като основна снимка.",
    aspect: "landscape",
  }),
  "kovcheg-05": img({
    id: "kovcheg-05",
    alt: "Драперия за ковчег — бяла вътрешна тапицерия",
    category: "coffins",
    usage: "catalog",
    pages: ["/traurni-stoki"],
    aspect: "landscape",
  }),
  "kovcheg-06": img({
    id: "kovcheg-06",
    alt: "Драперия за ковчег от каталога на АМИН",
    category: "coffins",
    usage: "catalog",
    pages: ["/traurni-stoki"],
    aspect: "landscape",
  }),
  "kovcheg-07": img({
    id: "kovcheg-07",
    alt: "Драперия за ковчег — сатен, каталожен модел",
    category: "coffins",
    usage: "catalog",
    pages: ["/traurni-stoki"],
    aspect: "landscape",
  }),
  "kovcheg-08": img({
    id: "kovcheg-08",
    alt: "Налични ковчези и траурни стоки в АМИН",
    title: "Налични ковчези",
    category: "coffins",
    usage: "trust",
    pages: ["/traurni-stoki", "/", "/traurni-uslugi", "/ceni"],
    aspect: "landscape",
  }),

  // === Ковчези — нов каталог (promeni-08-26), само за /traurni-kovchezi ===
  "kovcheg-09": img({
    id: "kovcheg-09",
    alt: "Модел ковчег 09 — ковчези за погребение от АМИН",
    category: "coffins",
    usage: "gallery",
    pages: ["/traurni-kovchezi"],
    aspect: "landscape",
  }),
  "kovcheg-10": img({
    id: "kovcheg-10",
    alt: "Модел ковчег 10 — ковчези за погребение от АМИН",
    category: "coffins",
    usage: "gallery",
    pages: ["/traurni-kovchezi"],
    aspect: "landscape",
  }),
  "kovcheg-11": img({
    id: "kovcheg-11",
    alt: "Модел ковчег 11 — ковчези за погребение от АМИН",
    category: "coffins",
    usage: "gallery",
    pages: ["/traurni-kovchezi"],
    aspect: "landscape",
  }),
  "kovcheg-12": img({
    id: "kovcheg-12",
    alt: "Модел ковчег 12 — ковчези за погребение от АМИН",
    category: "coffins",
    usage: "gallery",
    pages: ["/traurni-kovchezi"],
    aspect: "landscape",
  }),
  "kovcheg-13": img({
    id: "kovcheg-13",
    alt: "Модел ковчег 13 — ковчези за погребение от АМИН",
    category: "coffins",
    usage: "gallery",
    pages: ["/traurni-kovchezi"],
    aspect: "landscape",
  }),
  "kovcheg-14": img({
    id: "kovcheg-14",
    alt: "Модел ковчег 14 — ковчези за погребение от АМИН",
    category: "coffins",
    usage: "gallery",
    pages: ["/traurni-kovchezi"],
    aspect: "landscape",
  }),
  "kovcheg-15": img({
    id: "kovcheg-15",
    alt: "Модел ковчег 15 — ковчези за погребение от АМИН",
    category: "coffins",
    usage: "gallery",
    pages: ["/traurni-kovchezi"],
    aspect: "landscape",
  }),
  "kovcheg-16": img({
    id: "kovcheg-16",
    alt: "Модел ковчег 16 — ковчези за погребение от АМИН",
    category: "coffins",
    usage: "gallery",
    pages: ["/traurni-kovchezi"],
    aspect: "landscape",
  }),
  "kovcheg-17": img({
    id: "kovcheg-17",
    alt: "Модел ковчег 17 — ковчези за погребение от АМИН",
    category: "coffins",
    usage: "gallery",
    pages: ["/traurni-kovchezi"],
    aspect: "landscape",
  }),
  "kovcheg-18": img({
    id: "kovcheg-18",
    alt: "Модел ковчег 18 — ковчези за погребение от АМИН",
    category: "coffins",
    usage: "gallery",
    pages: ["/traurni-kovchezi"],
    aspect: "landscape",
  }),
  "kovcheg-19": img({
    id: "kovcheg-19",
    alt: "Модел ковчег 19 — ковчези за погребение от АМИН",
    category: "coffins",
    usage: "gallery",
    pages: ["/traurni-kovchezi"],
    aspect: "landscape",
  }),
  "kovcheg-20": img({
    id: "kovcheg-20",
    alt: "Модел ковчег 20 — ковчези за погребение от АМИН",
    category: "coffins",
    usage: "gallery",
    pages: ["/traurni-kovchezi"],
    aspect: "landscape",
  }),
  "kovcheg-21": img({
    id: "kovcheg-21",
    alt: "Модел ковчег 21 — ковчези за погребение от АМИН",
    category: "coffins",
    usage: "gallery",
    pages: ["/traurni-kovchezi"],
    aspect: "landscape",
  }),
  "kovcheg-22": img({
    id: "kovcheg-22",
    alt: "Модел ковчег 22 — ковчези за погребение от АМИН",
    category: "coffins",
    usage: "gallery",
    pages: ["/traurni-kovchezi"],
    aspect: "landscape",
  }),
  "kovcheg-23": img({
    id: "kovcheg-23",
    alt: "Модел ковчег 23 — ковчези за погребение от АМИН",
    category: "coffins",
    usage: "gallery",
    pages: ["/traurni-kovchezi"],
    aspect: "landscape",
  }),
  "kovcheg-24": img({
    id: "kovcheg-24",
    alt: "Модел ковчег 24 — ковчези за погребение от АМИН",
    category: "coffins",
    usage: "gallery",
    pages: ["/traurni-kovchezi"],
    aspect: "landscape",
  }),
  "kovcheg-25": img({
    id: "kovcheg-25",
    alt: "Модел ковчег 25 — ковчези за погребение от АМИН",
    category: "coffins",
    usage: "gallery",
    pages: ["/traurni-kovchezi"],
    aspect: "landscape",
  }),
  "kovcheg-26": img({
    id: "kovcheg-26",
    alt: "Модел ковчег 26 — ковчези за погребение от АМИН",
    category: "coffins",
    usage: "gallery",
    pages: ["/traurni-kovchezi"],
    aspect: "landscape",
  }),
  "kovcheg-27": img({
    id: "kovcheg-27",
    alt: "Модел ковчег 27 — ковчези за погребение от АМИН",
    category: "coffins",
    usage: "gallery",
    pages: ["/traurni-kovchezi"],
    aspect: "landscape",
  }),
  "kovcheg-28": img({
    id: "kovcheg-28",
    alt: "Модел ковчег 28 — ковчези за погребение от АМИН",
    category: "coffins",
    usage: "gallery",
    pages: ["/traurni-kovchezi"],
    aspect: "landscape",
  }),
  "kovcheg-29": img({
    id: "kovcheg-29",
    alt: "Модел ковчег 29 — ковчези за погребение от АМИН",
    category: "coffins",
    usage: "gallery",
    pages: ["/traurni-kovchezi"],
    aspect: "landscape",
  }),
  "kovcheg-30": img({
    id: "kovcheg-30",
    alt: "Модел ковчег 30 — ковчези за погребение от АМИН",
    category: "coffins",
    usage: "gallery",
    pages: ["/traurni-kovchezi"],
    aspect: "landscape",
  }),
  "kovcheg-31": img({
    id: "kovcheg-31",
    alt: "Модел ковчег 31 — ковчези за погребение от АМИН",
    category: "coffins",
    usage: "gallery",
    pages: ["/traurni-kovchezi"],
    aspect: "landscape",
  }),
  "kovcheg-32": img({
    id: "kovcheg-32",
    alt: "Модел ковчег 32 — ковчези за погребение от АМИН",
    category: "coffins",
    usage: "gallery",
    pages: ["/traurni-kovchezi"],
    aspect: "landscape",
  }),

  // === Организация на погребение / ритуална зала / кетъринг ===
  "organizatsiya-pogrebenie-01": img({
    id: "organizatsiya-pogrebenie-01",
    alt: "Раздавки, питка и жито за помен от АМИН",
    category: "funeral-catering",
    usage: "hero",
    pages: ["/ketaring-pomen", "/traurni-uslugi", "/pogrebenie"],
    aspect: "landscape",
  }),
  // Файлът е заменен с нова клиентска снимка (promeni-08-26): брандирани
  // пликове за раздавки, питка и жито — без лични данни, прегледана ръчно.
  "organizatsiya-pogrebenie-02": img({
    id: "organizatsiya-pogrebenie-02",
    alt: "Раздавки, питка с мед и жито за помен от Погребална агенция АМИН",
    category: "funeral-catering",
    usage: "gallery",
    pages: ["/ketaring-pomen"],
    aspect: "landscape",
  }),
  "organizatsiya-pogrebenie-03": img({
    id: "organizatsiya-pogrebenie-03",
    alt: "",
    category: "do-not-use",
    usage: "do-not-use",
    pages: [],
    containsPersonalData: true,
    note: DO_NOT_USE_NOTE,
    aspect: "landscape",
  }),
  "organizatsiya-pogrebenie-04": img({
    id: "organizatsiya-pogrebenie-04",
    alt: "Ритуална зала за поклонение",
    title: "Ритуална зала",
    category: "memorial-hall",
    usage: "trust",
    pages: [
      "/",
      "/pogrebenie",
      "/traurni-uslugi",
      "/kremaciya",
      "/ceni",
      "/za-nas",
      "/kontakti",
      "/dokumenti-za-pogrebenie",
      "/denonoshtna-pogrebalna-agenciya",
    ],
    aspect: "landscape",
  }),
  "kremaciya-01": img({
    id: "kremaciya-01",
    alt: "Кремация — урна, цветя и поклонение в ритуална зала",
    title: "Кремация",
    category: "funeral-service",
    usage: "hero",
    pages: ["/", "/kremaciya"],
    aspect: "landscape",
    ext: "png",
  }),
  "denonoshtna-agenciya-01": img({
    id: "denonoshtna-agenciya-01",
    alt: "АМИН — денонощна траурна агенция +24/7",
    title: "Денонощна агенция",
    category: "trust",
    usage: "hero",
    pages: ["/", "/denonoshtna-pogrebalna-agenciya"],
    aspect: "landscape",
    ext: "png",
  }),

  // === Кръстове (promeni-08-26) — композитни каталожни снимки EVITA LUX,
  // одобрени от клиента за директна употреба ===
  "krastove-malak": img({
    id: "krastove-malak",
    alt: "Малък дървен кръст за погребение",
    category: "coffins",
    usage: "catalog",
    pages: ["/traurni-krastove"],
    aspect: "landscape",
  }),
  "krastove-golyam-prav": img({
    id: "krastove-golyam-prav",
    alt: "Голям прав дървен кръст за погребение",
    category: "coffins",
    usage: "catalog",
    pages: ["/traurni-krastove"],
    aspect: "landscape",
  }),
  "krastove-detelina": img({
    id: "krastove-detelina",
    alt: "Дървен кръст Детелина за погребение",
    category: "coffins",
    usage: "catalog",
    pages: ["/traurni-krastove"],
    aspect: "landscape",
  }),
  "krastove-izryazan": img({
    id: "krastove-izryazan",
    alt: "Изрязан дървен кръст за погребение",
    category: "coffins",
    usage: "catalog",
    pages: ["/traurni-krastove"],
    aspect: "landscape",
  }),
  "krastove-luks": img({
    id: "krastove-luks",
    alt: "Дървен кръст Лукс за погребение",
    category: "coffins",
    usage: "catalog",
    pages: ["/traurni-krastove"],
    aspect: "landscape",
  }),

  // === Надгробни фенери (promeni-08-26) ===
  "nadgrobni-feneri": img({
    id: "nadgrobni-feneri",
    alt: "Надгробни фенери и стойка за скръбна вест",
    category: "coffins",
    usage: "gallery",
    pages: ["/traurni-stoki"],
    aspect: "landscape",
  }),

  // === Венци ===
  "venec-01": img({
    id: "venec-01",
    alt: "Траурни венци от естествени цветя",
    title: "Траурни венци",
    category: "wreaths",
    usage: "hero",
    pages: ["/traurni-venci", "/", "/traurni-uslugi", "/traurni-stoki", "/ceni"],
    aspect: "landscape",
  }),
  "venec-02": img({
    id: "venec-02",
    alt: "Цветна аранжировка за погребение",
    category: "wreaths",
    usage: "supporting",
    pages: ["/traurni-venci", "/pogrebenie"],
    aspect: "landscape",
  }),

  // === Паметници (каталог) ===
  "pametnik-01": img({
    id: "pametnik-01",
    alt: "Мраморен надгробен паметник с флорален орнамент",
    title: "Мраморен паметник с флорален орнамент",
    category: "monuments-catalog",
    usage: "catalog",
    pages: ["/pametnitsi"],
    aspect: "portrait",
  }),
  "pametnik-02": img({
    id: "pametnik-02",
    alt: "Класически мраморен надгробен паметник",
    title: "Класически мраморен паметник",
    category: "monuments-catalog",
    usage: "catalog",
    pages: ["/pametnitsi"],
    aspect: "portrait",
  }),
  "pametnik-03": img({
    id: "pametnik-03",
    alt: "",
    category: "do-not-use",
    usage: "do-not-use",
    pages: [],
    containsPersonalData: true,
    note: DO_NOT_USE_NOTE,
    aspect: "portrait",
  }),
  "pametnik-04": img({
    id: "pametnik-04",
    alt: "",
    category: "do-not-use",
    usage: "do-not-use",
    pages: [],
    containsPersonalData: true,
    note: DO_NOT_USE_NOTE,
    aspect: "portrait",
  }),
  "pametnik-05": img({
    id: "pametnik-05",
    alt: "Мраморен надгробен паметник с кръст",
    title: "Мраморен паметник с кръст",
    category: "monuments-catalog",
    usage: "catalog",
    pages: ["/pametnitsi"],
    aspect: "portrait",
  }),
  "pametnik-06": img({
    id: "pametnik-06",
    alt: "Надгробна плоча със заоблена форма",
    title: "Надгробна плоча със заоблена форма",
    category: "monuments-catalog",
    usage: "catalog",
    pages: ["/pametnitsi"],
    aspect: "portrait",
  }),
  "pametnik-07": img({
    id: "pametnik-07",
    alt: "Мраморен паметник във форма на сърце",
    title: "Паметник във форма на сърце",
    category: "monuments-catalog",
    usage: "catalog",
    pages: ["/pametnitsi"],
    aspect: "portrait",
  }),
  "pametnik-08": img({
    id: "pametnik-08",
    alt: "Мраморен надгробен паметник с рози",
    title: "Паметник с рози",
    category: "monuments-catalog",
    usage: "catalog",
    pages: ["/pametnitsi"],
    aspect: "portrait",
  }),
  "pametnik-09": img({
    id: "pametnik-09",
    alt: "Надгробен паметник с православен кръст",
    title: "Паметник с православен кръст",
    category: "monuments-catalog",
    usage: "catalog",
    pages: ["/pametnitsi"],
    aspect: "portrait",
  }),
  "pametnik-10": img({
    id: "pametnik-10",
    alt: "",
    category: "do-not-use",
    usage: "do-not-use",
    pages: [],
    containsPersonalData: true,
    note: DO_NOT_USE_NOTE,
    aspect: "portrait",
  }),
  "pametnik-11": img({
    id: "pametnik-11",
    alt: "",
    category: "do-not-use",
    usage: "do-not-use",
    pages: [],
    containsPersonalData: true,
    note: DO_NOT_USE_NOTE,
    aspect: "portrait",
  }),
  "pametnik-12": img({
    id: "pametnik-12",
    alt: "Мраморен паметник с изчистена форма",
    title: "Паметник с изчистена форма",
    category: "monuments-catalog",
    usage: "catalog",
    pages: ["/pametnitsi"],
    aspect: "portrait",
  }),
  "pametnik-13": img({
    id: "pametnik-13",
    alt: "Класически мраморен надгробен паметник",
    title: "Класически мраморен паметник",
    category: "monuments-catalog",
    usage: "catalog",
    pages: ["/pametnitsi", "/", "/traurni-uslugi", "/ceni"],
    aspect: "portrait",
  }),
  "pametnik-14": img({
    id: "pametnik-14",
    alt: "",
    category: "do-not-use",
    usage: "do-not-use",
    pages: [],
    containsPersonalData: true,
    note: DO_NOT_USE_NOTE,
    aspect: "portrait",
  }),
  "pametnik-15": img({
    id: "pametnik-15",
    alt: "",
    category: "do-not-use",
    usage: "do-not-use",
    pages: [],
    containsPersonalData: true,
    note: DO_NOT_USE_NOTE,
    aspect: "portrait",
  }),
  "pametnik-16": img({
    id: "pametnik-16",
    alt: "Мраморен паметник с флорална декорация",
    title: "Паметник с флорални орнаменти",
    category: "monuments-catalog",
    usage: "catalog",
    pages: ["/pametnitsi"],
    aspect: "portrait",
  }),
  "pametnik-17": img({
    id: "pametnik-17",
    alt: "Мраморен надгробен паметник с кръст и орнаменти",
    title: "Мраморен паметник с кръст",
    category: "monuments-catalog",
    usage: "catalog",
    pages: ["/pametnitsi", "/", "/traurni-uslugi"],
    aspect: "portrait",
  }),
  "pametnik-18": img({
    id: "pametnik-18",
    alt: "Надгробен паметник с гълъби",
    title: "Паметник с гълъби",
    category: "monuments-catalog",
    usage: "catalog",
    pages: ["/pametnitsi"],
    aspect: "portrait",
  }),
  "pametnik-19": img({
    id: "pametnik-19",
    alt: "Мраморен паметник с рози и кръст",
    title: "Паметник с рози и кръст",
    category: "monuments-catalog",
    usage: "catalog",
    pages: ["/pametnitsi"],
    aspect: "portrait",
  }),
  "pametnik-20": img({
    id: "pametnik-20",
    alt: "",
    category: "do-not-use",
    usage: "do-not-use",
    pages: [],
    containsPersonalData: true,
    note: DO_NOT_USE_NOTE,
    aspect: "portrait",
  }),
  "pametnik-21": img({
    id: "pametnik-21",
    alt: "Индивидуален модел мраморен паметник",
    title: "Индивидуален модел паметник",
    category: "monuments-catalog",
    usage: "catalog",
    pages: ["/pametnitsi"],
    aspect: "portrait",
  }),
  "pametnik-23": img({
    id: "pametnik-23",
    alt: "Изработка и доставка на надгробни плочи от АМИН",
    title: "Собствена изработка и доставка",
    category: "trust",
    usage: "trust",
    pages: ["/pametnitsi", "/", "/za-nas"],
    aspect: "landscape",
  }),
};

/** True only for images that are safe to render on public pages. */
export function isPublicImage(image: SiteImage): boolean {
  return image.usage !== "do-not-use" && !image.containsPersonalData;
}

/**
 * Returns a public image by id. Throws in development if the id is missing or
 * denylisted, so misuse is caught early rather than silently rendering nothing.
 */
export function getPublicImage(id: string): SiteImage | null {
  const image = siteImages[id];
  if (!image || !isPublicImage(image)) {
    if (process.env.NODE_ENV !== "production") {
      throw new Error(
        `getPublicImage: "${id}" is missing or marked do-not-use; it must not be rendered publicly.`,
      );
    }
    return null;
  }
  return image;
}

/** Resolves a list of ids to public images, dropping any that are denylisted. */
export function getPublicImages(ids: string[]): SiteImage[] {
  return ids
    .map((id) => siteImages[id])
    .filter((image): image is SiteImage => Boolean(image) && isPublicImage(image));
}
