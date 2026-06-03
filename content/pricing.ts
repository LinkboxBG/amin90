export type PriceItem = {
  label: string;
  /** цена в EUR (число) — рендерира се с €; ако липсва, използвай range/note */
  price?: number;
  /** мерна единица, напр. „/км", „/бр", „/час", „24ч" */
  unit?: string;
  /** ценови диапазон в EUR, напр. [40, 150] */
  range?: [number, number];
  /** свободен текст вместо цена, напр. „по запитване" */
  note?: string;
  /** размер на паметник в см, напр. „60×80×6" */
  sizeCm?: string;
};

export type PriceGroup = {
  id: string;
  title: string;
  /** на кои страници е релевантна тази група */
  pages: string[];
  intro?: string;
  items: PriceItem[];
};

export const PRICE_DISCLAIMER =
  "Цените са ориентировъчни и в евро (EUR). Крайната цена зависи от конкретния случай.";

export const priceGroups: PriceGroup[] = [
  {
    id: "pametnitsi",
    title: "Паметници",
    pages: ["/pametnitsi", "/ceni"],
    intro:
      "Цени за надгробни паметници от мрамор. Монтажът се калкулира отделно според локацията, сложността и размера.",
    items: [
      { label: "С модел (форма/орнаменти)", sizeCm: "60×80×6", price: 140 },
      { label: "С модел (форма/орнаменти)", sizeCm: "70×90×6", price: 180 },
      { label: "С модел (форма/орнаменти)", sizeCm: "80×100×6", price: 235 },
      { label: "С модел (форма/орнаменти)", sizeCm: "80×120×6", price: 280 },
      { label: "Стандартен (без декорация)", sizeCm: "40×60×6", price: 45 },
      { label: "Стандартен (без декорация)", sizeCm: "50×70×6", price: 65 },
      { label: "Стандартен (без декорация)", sizeCm: "60×80×6", price: 89 },
      { label: "Стандартен (без декорация)", sizeCm: "70×90×6", price: 117 },
      { label: "Стандартен (без декорация)", sizeCm: "80×100×6", price: 148 },
      { label: "Стандартен (без декорация)", sizeCm: "80×120×6", price: 178 },
      // TODO: потвърди с клиента — цени за 3D форма (клиентът ще ги изпрати)
      { label: "3D форма", note: "по запитване" },
    ],
  },
  {
    id: "organizaciya",
    title: "Организация на погребение",
    pages: ["/pogrebenie", "/ceni"],
    items: [
      { label: "Организация", price: 50 },
      { label: "Полагане и драпиране", price: 20 },
      { label: "Ползване на хладилна камера", price: 30, unit: "24ч" },
      { label: "Пълен тоалет", price: 70 },
      { label: "Бръснене", price: 10 },
      { label: "Дезинфектанти", price: 15 },
      { label: "Грим", price: 15 },
      { label: "Отзоваване на адрес", price: 20 },
      { label: "Изнасяне от/до адрес", price: 50 },
      { label: "Носене в гробищен парк", price: 50 },
      { label: "Качване на етажи", price: 15 },
      { label: "Сваляне на етажи", price: 10 },
      { label: "Аранжиране с цветя", price: 50 },
      { label: "Поклонение", price: 50 },
    ],
  },
  {
    id: "dokumenti",
    title: "Документи",
    pages: ["/pogrebenie", "/ceni"],
    intro: "Съдействието с документите е включено в пълната организация.",
    items: [{ label: "Изваждане на смъртен акт", price: 25 }],
  },
  {
    id: "podderzhka",
    title: "Поддръжка на гробно място",
    pages: ["/ceni"],
    items: [{ label: "Почистване на гроб", price: 25 }],
  },
  {
    id: "traurni-stoki",
    title: "Траурни стоки",
    pages: ["/traurni-stoki", "/ceni"],
    items: [
      { label: "Ковчег", price: 80 },
      { label: "Доставка на ковчег", price: 10 },
      { label: "Кръст с надпис", price: 25 },
      { label: "Торба за кости", price: 5.11 },
      { label: "Некролози (черно-бели)", price: 1, unit: "/бр" },
      { label: "Некролози (цветни)", price: 1.5, unit: "/бр" },
      { label: "Лепило", price: 1 },
      { label: "Раздавки", price: 1, unit: "/бр" },
      { label: "Питка с мед", price: 20, unit: "/бр" },
      { label: "Маса и персонал", price: 15 },
      { label: "Вино с олио", price: 3 },
      { label: "Хавлиени кърпи", price: 2, unit: "/бр" },
      { label: "Венци", range: [40, 150], note: "изкуствени — естествени" },
      { label: "Жалейки", price: 2, unit: "/10бр" },
      { label: "Траур за врата", price: 5 },
      { label: "Драперия", price: 40 },
      { label: "Одеяло", price: 20 },
      { label: "Вази за цветя", price: 3 },
      { label: "Мраморен свещник", price: 15 },
      { label: "Малки свещи", price: 0.1, unit: "/бр" },
      { label: "Ритуални свещи", price: 2, unit: "/бр" },
      { label: "Покров църковен", price: 10 },
      { label: "Кандило", price: 1.5 },
      { label: "Тамян", price: 1 },
      { label: "Въглен", price: 0.5 },
    ],
  },
  {
    id: "transport",
    title: "Транспортиране",
    pages: ["/transport-na-pokoinik", "/ceni"],
    items: [
      { label: "Доставка на ковчег", price: 10 },
      { label: "Шествие с катафалка", price: 30 },
      { label: "Извънградско", price: 1, unit: "/км" },
      { label: "Транспорт на гробари", price: 1, unit: "/км" },
      { label: "Престой на катафалка", price: 30, unit: "/час" },
    ],
  },
  {
    id: "kremaciya",
    title: "Кремация",
    pages: ["/kremaciya", "/ceni"],
    items: [
      { label: "Кремация", price: 340 },
      { label: "Изграждане на гробница", price: 360 },
    ],
  },
];

export function groupsForPage(slug: string): PriceGroup[] {
  return priceGroups.filter((g) => g.pages.includes(slug));
}

export function formatPrice(item: PriceItem): string {
  const eur = (n: number) =>
    `€${Number.isInteger(n) ? n : n.toFixed(2)}`;
  if (item.range) {
    return `${eur(item.range[0])} – ${eur(item.range[1])}`;
  }
  if (typeof item.price === "number") {
    return `${eur(item.price)}${item.unit ? ` ${item.unit}` : ""}`;
  }
  return item.note ?? "—";
}
