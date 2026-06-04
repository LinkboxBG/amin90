export type PriceItem = {
  label: string;
  price?: number;
  unit?: string;
  range?: [number, number];
  note?: string;
  sizeCm?: string;
};

export type PriceGroup = {
  id: string;
  title: string;
  pages: string[];
  intro?: string;
  items: PriceItem[];
};

export const PRICE_DISCLAIMER =
  "Цените са ориентировъчни и в евро (EUR). Крайната цена зависи от конкретния случай, локацията и избраните услуги.";

export const priceGroups: PriceGroup[] = [
  {
    "id": "организация-на-погребение",
    "title": "Организация на погребение",
    "pages": [
      "/ceni",
      "/pogrebenie"
    ],
    "items": [
      {
        "label": "Организация на погребение",
        "price": 50
      },
      {
        "label": "Полагане и драпиране",
        "price": 20
      },
      {
        "label": "Хладилна камера за 24 часа",
        "price": 30
      },
      {
        "label": "Пълен тоалет",
        "price": 70
      },
      {
        "label": "Бръснене",
        "price": 10
      },
      {
        "label": "Обработка с дезинфектанти",
        "price": 15
      },
      {
        "label": "Грим",
        "price": 15
      },
      {
        "label": "Отзоваване на посочен адрес",
        "price": 20
      },
      {
        "label": "Изнасяне от/до адрес",
        "price": 50
      },
      {
        "label": "Носене в гробищен парк",
        "price": 50
      },
      {
        "label": "Качване на етажи",
        "price": 15
      },
      {
        "label": "Сваляне на етажи",
        "price": 10
      },
      {
        "label": "Аранжиране с цветя",
        "price": 50
      },
      {
        "label": "Поклонение",
        "price": 50
      }
    ]
  },
  {
    "id": "документи-и-административно-съдействие",
    "title": "Документи и административно съдействие",
    "pages": [
      "/ceni",
      "/dokumenti-za-pogrebenie"
    ],
    "items": [
      {
        "label": "Съдействие за изваждане на смъртен акт",
        "price": 25
      }
    ]
  },
  {
    "id": "транспорт-и-катафалка",
    "title": "Транспорт и катафалка",
    "pages": [
      "/ceni",
      "/transport-na-pokoinik"
    ],
    "items": [
      {
        "label": "Доставка на ковчег",
        "price": 10
      },
      {
        "label": "Шествие с катафалка",
        "price": 30
      },
      {
        "label": "Извънградско транспортиране",
        "price": 1,
        "unit": "/км"
      },
      {
        "label": "Транспортиране на гробари",
        "price": 1,
        "unit": "/км"
      },
      {
        "label": "Престой на катафалка",
        "price": 30
      }
    ]
  },
  {
    "id": "кремация",
    "title": "Кремация",
    "pages": [
      "/ceni",
      "/kremaciya"
    ],
    "items": [
      {
        "label": "Кремация",
        "price": 340
      },
      {
        "label": "Изграждане на гробница",
        "price": 360
      }
    ]
  },
  {
    "id": "траурни-стоки-ковчези-и-кръстове",
    "title": "Траурни стоки, ковчези и кръстове",
    "pages": [
      "/ceni",
      "/traurni-stoki"
    ],
    "items": [
      {
        "label": "Ковчег",
        "price": 80
      },
      {
        "label": "Доставка на ковчег",
        "price": 10
      },
      {
        "label": "Кръст с надпис",
        "price": 25
      },
      {
        "label": "Торба за кости",
        "price": 5.11
      },
      {
        "label": "Некролог — черно-бял печат",
        "price": 1
      },
      {
        "label": "Некролог — цветен печат",
        "price": 1.5
      },
      {
        "label": "Лепило",
        "price": 1
      },
      {
        "label": "Жалейки",
        "price": 2
      },
      {
        "label": "Траур за врата",
        "price": 5
      },
      {
        "label": "Драперия",
        "price": 40
      },
      {
        "label": "Одеяло",
        "price": 20
      },
      {
        "label": "Вази за цветя",
        "price": 3
      },
      {
        "label": "Мраморен свещник",
        "price": 15
      },
      {
        "label": "Малки свещи",
        "price": 0.1
      },
      {
        "label": "Ритуални свещи",
        "price": 2
      },
      {
        "label": "Покров църковен",
        "price": 10
      },
      {
        "label": "Кандило",
        "price": 1.5
      },
      {
        "label": "Тамян",
        "price": 1
      },
      {
        "label": "Въглен",
        "price": 0.5
      }
    ]
  },
  {
    "id": "венци-и-цветя",
    "title": "Венци и цветя",
    "pages": [
      "/ceni",
      "/traurni-venci"
    ],
    "items": [
      {
        "label": "Венци от изкуствени цветя",
        "price": 40
      },
      {
        "label": "Венци от естествени цветя",
        "price": 150
      }
    ]
  },
  {
    "id": "кетъринг-раздавки-и-допълнителни-артикули",
    "title": "Кетъринг, раздавки и допълнителни артикули",
    "pages": [
      "/ceni",
      "/ketaring-pomen"
    ],
    "items": [
      {
        "label": "Раздавки",
        "price": 1
      },
      {
        "label": "Питка с мед",
        "price": 20
      },
      {
        "label": "Маса и персонал за раздаване",
        "price": 15
      },
      {
        "label": "Вино с олио за преливане",
        "price": 3
      },
      {
        "label": "Хавлиени кърпи",
        "price": 2
      }
    ]
  },
  {
    "id": "паметници-и-надгробни-плочи",
    "title": "Паметници и надгробни плочи",
    "pages": [
      "/ceni",
      "/pametnitsi"
    ],
    "items": [
      {
        "label": "60 x 80 x 6 см",
        "price": 140
      },
      {
        "label": "70 x 90 x 6 см",
        "price": 180
      },
      {
        "label": "80 x 100 x 6 см",
        "price": 235
      },
      {
        "label": "80 x 120 x 6 см",
        "price": 280
      }
    ]
  }
];

export function formatPrice(item: PriceItem): string {
  if (typeof item.price === "number") {
    const base = `€${item.price}`;
    return item.unit ? `${base}${item.unit}` : base;
  }
  if (item.range) return `€${item.range[0]}–${item.range[1]}`;
  return item.note ?? "—";
}

export function groupsForPage(slug: string): PriceGroup[] {
  return priceGroups.filter((g) => g.pages.includes(slug));
}
