/**
 * Per-page visual configuration.
 *
 * Describes which image blocks render on each slug and where they sit relative
 * to the long-form text sections. This keeps SEO copy untouched while giving
 * each page a deliberate visual role (hero / trust / catalog / supporting).
 *
 * All image references are ids from the registry; the view layer resolves them
 * through the public helpers, so denylisted assets can never be rendered.
 */

export type VisualBlock =
  | {
      kind: "service";
      eyebrow?: string;
      title?: string;
      primaryId: string;
      supportingIds?: string[];
    }
  | {
      kind: "gallery";
      eyebrow?: string;
      title: string;
      imageIds: string[];
    }
  | {
      kind: "trust";
      eyebrow?: string;
      title?: string;
      imageId: string;
    }
  | {
      kind: "monument-catalog";
      eyebrow?: string;
      title?: string;
    }
  | {
      kind: "service-cards";
      eyebrow?: string;
      title?: string;
      cards: { imageId: string; title: string; href: string }[];
    };

export type PageVisualConfig = {
  /** Rendered after the intro but before the long text ContentSections. */
  before?: VisualBlock[];
  /** Rendered after the long text ContentSections. */
  after?: VisualBlock[];
};

export const pageVisuals: Record<string, PageVisualConfig> = {
  "/transport-na-pokoinik": {
    before: [
      {
        kind: "service",
        eyebrow: "Транспорт",
        title: "Денонощен транспорт с катафалка",
        primaryId: "katafalka-01",
        supportingIds: ["katafalka-02", "katafalka-03", "katafalka-04"],
      },
    ],
  },

  "/traurni-stoki": {
    before: [
      {
        kind: "service",
        eyebrow: "Ковчези",
        title: "Налични ковчези и модели",
        primaryId: "kovcheg-08",
        supportingIds: ["kovcheg-02", "kovcheg-03", "kovcheg-05", "kovcheg-06", "kovcheg-07"],
      },
    ],
  },

  "/traurni-venci": {
    before: [
      {
        kind: "service",
        eyebrow: "Венци",
        title: "Траурни венци и цветни аранжировки",
        primaryId: "venec-01",
        supportingIds: ["venec-02"],
      },
    ],
  },

  "/pametnitsi": {
    // Catalog-first: the model grid and workshop trust come before the long text.
    before: [
      { kind: "monument-catalog", eyebrow: "Каталог", title: "Каталог с модели паметници" },
      {
        kind: "trust",
        eyebrow: "Собствена изработка",
        title: "Собствена изработка и доставка на паметници",
        imageId: "pametnik-23",
      },
    ],
  },

  "/pogrebenie": {
    before: [
      {
        kind: "gallery",
        eyebrow: "Организация",
        title: "Пълна организация на погребение",
        imageIds: ["organizatsiya-pogrebenie-04", "organizatsiya-pogrebenie-01"],
      },
    ],
  },

  "/traurni-uslugi": {
    before: [
      {
        kind: "service-cards",
        eyebrow: "Направления",
        title: "Изберете услуга",
        cards: [
          { imageId: "organizatsiya-pogrebenie-04", title: "Организация на погребение", href: "/pogrebenie" },
          { imageId: "katafalka-01", title: "Транспорт на покойник", href: "/transport-na-pokoinik" },
          { imageId: "kovcheg-08", title: "Траурни стоки", href: "/traurni-stoki" },
          { imageId: "venec-01", title: "Траурни венци", href: "/traurni-venci" },
          { imageId: "pametnik-13", title: "Паметници", href: "/pametnitsi" },
          { imageId: "organizatsiya-pogrebenie-01", title: "Кетъринг за помен", href: "/ketaring-pomen" },
        ],
      },
    ],
  },

  "/ketaring-pomen": {
    before: [
      {
        kind: "trust",
        eyebrow: "Помен",
        title: "Раздавки и кетъринг за помен",
        imageId: "organizatsiya-pogrebenie-01",
      },
    ],
  },

  "/kremaciya": {
    after: [
      {
        kind: "gallery",
        eyebrow: "Съдействие",
        title: "Ритуал и транспорт",
        imageIds: ["organizatsiya-pogrebenie-04", "katafalka-02"],
      },
    ],
  },

  "/ceni": {
    before: [
      {
        kind: "service-cards",
        eyebrow: "Категории",
        title: "Цени по направления",
        cards: [
          { imageId: "organizatsiya-pogrebenie-04", title: "Погребение", href: "/pogrebenie" },
          { imageId: "katafalka-01", title: "Транспорт", href: "/transport-na-pokoinik" },
          { imageId: "kovcheg-08", title: "Траурни стоки", href: "/traurni-stoki" },
          { imageId: "venec-01", title: "Венци", href: "/traurni-venci" },
          { imageId: "pametnik-13", title: "Паметници", href: "/pametnitsi" },
        ],
      },
    ],
  },

  "/za-nas": {
    before: [
      {
        kind: "gallery",
        eyebrow: "За нас",
        title: "Нашата дейност",
        imageIds: ["organizatsiya-pogrebenie-04", "pametnik-23", "katafalka-03"],
      },
    ],
  },

  "/kontakti": {
    after: [
      {
        kind: "gallery",
        eyebrow: "АМИН",
        title: "Реална дейност и съдействие",
        imageIds: ["organizatsiya-pogrebenie-04", "katafalka-03"],
      },
    ],
  },

  "/dokumenti-za-pogrebenie": {
    after: [
      {
        kind: "trust",
        eyebrow: "Съдействие",
        title: "Спокойна организация и насоки",
        imageId: "organizatsiya-pogrebenie-04",
      },
    ],
  },

  "/denonoshtna-pogrebalna-agenciya": {
    after: [
      {
        kind: "trust",
        title: "Денонощно съдействие при спешен случай",
        imageId: "organizatsiya-pogrebenie-04",
      },
    ],
  },
};

export function visualsForPage(slug: string): PageVisualConfig | null {
  return pageVisuals[slug] ?? null;
}
