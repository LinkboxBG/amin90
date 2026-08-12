export type NavLink = {
  label: string;
  href: string;
};

export type NavItem = NavLink & {
  children?: NavLink[];
};

export const navigation: NavItem[] = [
  { label: "Начало", href: "/" },
  {
    label: "Траурни услуги",
    href: "/traurni-uslugi",
    children: [
      { label: "Всички траурни услуги", href: "/traurni-uslugi" },
      { label: "Организация на погребение", href: "/pogrebenie" },
      { label: "Кремация", href: "/kremaciya" },
      { label: "Транспорт на покойник", href: "/transport-na-pokoinik" },
      { label: "Денонощна погребална агенция", href: "/denonoshtna-pogrebalna-agenciya" },
      { label: "Документи за погребение", href: "/dokumenti-za-pogrebenie" },
      { label: "Кетъринг за помен", href: "/ketaring-pomen" },
    ],
  },
  { label: "Организация на погребение", href: "/pogrebenie" },
  { label: "Цени", href: "/ceni" },
  { label: "Паметници", href: "/pametnitsi" },
  {
    label: "Траурни стоки",
    href: "/traurni-stoki",
    children: [
      { label: "Всички траурни стоки", href: "/traurni-stoki" },
      { label: "Траурни венци", href: "/traurni-venci" },
      { label: "Кръстове за погребение", href: "/traurni-krastove" },
      { label: "Ковчези", href: "/traurni-kovchezi" },
    ],
  },
  {
    label: "Локации",
    href: "/lokacii",
    children: [
      { label: "Всички локации", href: "/lokacii" },
      { label: "Централен офис Стамболийски", href: "/pogrebalna-agenciya-stamboliyski" },
      { label: "Пловдив и региона", href: "/pogrebalna-agenciya-plovdiv" },
      { label: "Цалапица", href: "/pogrebalna-agenciya-tsalapitsa" },
      { label: "Кричим", href: "/pogrebalna-agenciya-krichim" },
      { label: "Огняново", href: "/pogrebalna-agenciya-ognyanovo" },
    ],
  },
  { label: "Контакти", href: "/kontakti" },
];

export const footerLinks: NavLink[] = [
  { label: "Траурни услуги", href: "/traurni-uslugi" },
  { label: "Цени", href: "/ceni" },
  { label: "Локации", href: "/lokacii" },
  { label: "За нас", href: "/za-nas" },
  { label: "Контакти", href: "/kontakti" },
  { label: "Денонощна агенция", href: "/denonoshtna-pogrebalna-agenciya" },
];
