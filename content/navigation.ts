export type NavLink = {
  label: string;
  href: string;
};

export type NavItem = NavLink & {
  children?: NavLink[];
};

/**
 * Реална навигация (§14.8):
 * „Паметници" и „Траурни стоки" са в подменюто на „Услуги"; „Цени" е главен линк.
 */
export const navigation: NavItem[] = [
  { label: "Начало", href: "/" },
  {
    label: "Услуги",
    href: "/traurni-uslugi",
    children: [
      { label: "Денонощна агенция", href: "/denonoshtna-pogrebalna-agenciya" },
      { label: "Организация на погребение", href: "/pogrebenie" },
      { label: "Кремация", href: "/kremaciya" },
      { label: "Транспорт на покойник", href: "/transport-na-pokoinik" },
      { label: "Кетъринг за помен", href: "/ketaring-pomen" },
      { label: "Паметници", href: "/pametnitsi" },
      { label: "Траурни стоки", href: "/traurni-stoki" },
    ],
  },
  { label: "Цени", href: "/ceni" },
];
