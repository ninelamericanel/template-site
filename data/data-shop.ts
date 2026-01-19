export interface ICake {
  name: string;
  id: string;
  realese: string;
  collection: "base" | "holidays" | "special";
  price: number;
  information: {
    allergen: string[];
    ingredient: string[];
    storage: string;
  };
  description: string;
  weight: string;
  nutritional: {
    energy: {
      kj: number;
      kcal: number;
    };
    carbohydrate: string;
    sugars: string;
    salt: string;
    fat: string;
    saturatedFat: string;
    protein: string;
  };
  type: "cake" | "chocolate" | "typeTea" | "macarons";
  photos: string[];
  typeTea?: { name: string; value: string };
  color?: { name: string; value: string };
}

// const extra = {
// поле с галочкой, появляется селект с возможностью выбора формы  торта
// custom: boolean;
// customValueDefault?: "square" | "heart" | "circle";
//если ставить галочку, появляется поле для клиента, где он может указать пожелания
// excludeIngredients: boolean;
// excludeIngredientsList?: string;}

export const cakes: ICake[] = [
  {
    name: "Одина Фиалка",
    type: "cake",
    id: "odina-fialka-001",
    realese: "2024-01-01",
    collection: "base",
    price: 1500,
    information: {
      allergen: ["глютен", "молоко", "яйца"],
      ingredient: [
        "мука пшеничная",
        "сахар",
        "масло сливочное",
        "яйца",
        "ваниль",
        "фиалка (экстракт)",
      ],
      storage: "Хранить при температуре от +2 °C до +6 °C. Срок годности — 72 часа.",
    },
    description:
      "Нежный торт с ароматом фиалки, сочетающий воздушную текстуру и утончённый цветочный вкус.",
    weight: "1,2 кг",
    nutritional: {
      energy: {
        kj: 1800,
        kcal: 430,
      },
      carbohydrate: "45 г",
      sugars: "30 г",
      salt: "0,3 г",
      fat: "22 г",
      saturatedFat: "12 г",
      protein: "6 г",
    },
    photos: [
      "https://example.com/photos/odina-fialka-1.jpg",
      "https://example.com/photos/odina-fialka-2.jpg",
    ],
  },
  {
    name: "Испахан",
    type: "cake",
    id: "ispan-001",
    realese: "2024-01-01",
    collection: "base",
    price: 1500,
    information: {
      allergen: ["глютен", "молоко", "орехи"],
      ingredient: ["мука пшеничная", "сахар", "масло сливочное", "миндаль", "ваниль", "сливки"],
      storage: "Хранить при температуре от +2 °C до +6 °C. Срок годности — 72 часа.",
    },
    description: "Классический торт с миндальными нотками и нежной сливочной прослойкой.",
    weight: "1,3 кг",
    nutritional: {
      energy: {
        kj: 1950,
        kcal: 465,
      },
      carbohydrate: "48 г",
      sugars: "32 г",
      salt: "0,4 г",
      fat: "25 г",
      saturatedFat: "14 г",
      protein: "7 г",
    },
    photos: ["https://example.com/photos/ispan-1.jpg", "https://example.com/photos/ispan-2.jpg"],
  },
  {
    name: "Мак‑Лимон",
    type: "cake",
    id: "mak-limon-001",
    realese: "2024-01-01",
    collection: "base",
    price: 1500,
    information: {
      allergen: ["глютен", "молоко", "яйца", "цитрусовые"],
      ingredient: [
        "мука пшеничная",
        "сахар",
        "масло сливочное",
        "яйца",
        "мак",
        "лимонный сок",
        "цедра лимона",
      ],
      storage: "Хранить при температуре от +2 °C до +6 °C. Срок годности — 72 часа.",
    },
    description: "Освежающий торт с ярким лимонным вкусом и хрустящими вкраплениями мака.",
    weight: "1,1 кг",
    nutritional: {
      energy: {
        kj: 1750,
        kcal: 415,
      },
      carbohydrate: "42 г",
      sugars: "28 г",
      salt: "0,2 г",
      fat: "20 г",
      saturatedFat: "10 г",
      protein: "5 г",
    },
    photos: [
      "https://example.com/photos/mak-limon-1.jpg",
      "https://example.com/photos/mak-limon-2.jpg",
    ],
  },
  {
    name: "Мария‑Антуанетта: Испахан",
    type: "cake",
    id: "marie-antoinette-ispan-001",
    realese: "2024-01-01",
    collection: "special",
    price: 700,
    information: {
      allergen: ["глютен", "молоко", "яйца", "миндаль", "личи"],
      ingredient: [
        "миндальный бисквит",
        "розовый крем",
        "ягоды личи",
        "свежая малина",
        "сахар",
        "яйца",
        "масло сливочное",
      ],
      storage: "Хранить при температуре от +2 °C до +6 °C. Срок годности — 48 часов.",
    },
    description:
      "Торт в форме сердца из миндального бисквита с нежным розовым кремом, ягодами личи и свежей малиной. Романтичный десерт, говорящий о любви без слов.",
    weight: "1,0 кг",
    nutritional: {
      energy: {
        kj: 1850,
        kcal: 440,
      },
      carbohydrate: "46 г",
      sugars: "31 г",
      salt: "0,3 г",
      fat: "23 г",
      saturatedFat: "13 г",
      protein: "6 г",
    },
    photos: [
      "https://example.com/photos/marie-antoinette-ispan-1.jpg",
      "https://example.com/photos/marie-antoinette-ispan-2.jpg",
    ],
  },
  {
    name: "Мария‑Антуанетта: Фисташка",
    type: "cake",
    id: "marie-antoinette- pistachio-001",
    realese: "2024-01-01",
    collection: "special",
    price: 700,
    information: {
      allergen: ["глютен", "молоко", "яйца", "фисташки"],
      ingredient: [
        "бисквит",
        "фисташковый крем",
        "цельные фисташки",
        "сахар",
        "яйца",
        "масло сливочное",
        "экстракт фисташки",
      ],
      storage: "Хранить при температуре от +2 °C до +6 °C. Срок годности — 48 часов.",
    },
    description:
      "Изысканный торт с насыщенным фисташковым вкусом и хрустящими кусочками цельных фисташек. Нежная текстура и благородный аромат.",
    weight: "1,1 кг",
    nutritional: {
      energy: {
        kj: 1900,
        kcal: 455,
      },
      carbohydrate: "47 г",
      sugars: "32 г",
      salt: "0,3 г",
      fat: "24 г",
      saturatedFat: "14 г",
      protein: "7 г",
    },
    photos: [
      "https://example.com/photos/marie-antoinette-pistachio-1.jpg",
      "https://example.com/photos/marie-antoinette-pistachio-2.jpg",
    ],
  },
  {
    name: "Мария‑Антуанетта: Чёрная смородина — Фиалка",
    type: "cake",
    id: "marie-antoinette-blackcurrant-violet-001",
    realese: "2024-01-01",
    collection: "special",
    price: 700,
    information: {
      allergen: ["глютен", "молоко", "яйца", "ягоды"],
      ingredient: [
        "бисквит",
        "крем с чёрной смородиной",
        "экстракт фиалки",
        "сахар",
        "яйца",
        "масло сливочное",
        "пюре чёрной смородины",
      ],
      storage: "Хранить при температуре от +2 °C до +6 °C. Срок годности — 48 часов.",
    },
    description:
      "Необычный дуэт чёрной смородины и фиалки: кисло‑сладкий ягодный вкус сочетается с тонким цветочным ароматом. Элегантный десерт для ценителей нестандартных сочетаний.",
    weight: "1,05 кг",
    nutritional: {
      energy: {
        kj: 1820,
        kcal: 435,
      },
      carbohydrate: "45 г",
      sugars: "30 г",
      salt: "0,2 г",
      fat: "22 г",
      saturatedFat: "12 г",
      protein: "6 г",
    },
    photos: [
      "https://example.com/photos/marie-antoinette-blackcurrant-violet-1.jpg",
      "https://example.com/photos/marie-antoinette-blackcurrant-violet-2.jpg",
    ],
  },
  {
    name: "Свадебный торт «Помпадур»",
    type: "cake",
    id: "pompadour-special-001",
    realese: "2024-01-01",
    collection: "special",
    price: 9500,
    information: {
      allergen: ["глютен", "яйца", "фундук", "молоко"],
      ingredient: [
        "воздушная дакуаз-основа",
        "цельный фундук",
        "печёные яблоки (начинка)",
        "сахарная пудра (нетающая)",
        "ванильный экстракт",
        "сливочное масло",
        "яичные белки",
        "миндальная мука",
      ],
      storage: "Хранить при температуре +2 °C … +6 °C. Срок годности — 36 часов.",
    },
    description:
      "Изысканный свадебный торт в классическом стиле: воздушная дакуаз-основа с цельным фундуком и нежной начинкой из печёных яблок. Поверхность покрыта нетающей сахарной пудрой, создающей эффект морозного утра. Элегантный выбор для торжества в винтажном или прованс-стиле.",
    weight: "2,5 кг",
    nutritional: {
      energy: {
        kj: 2400,
        kcal: 570,
      },
      carbohydrate: "65 г",
      sugars: "42 г",
      salt: "0,3 г",
      fat: "32 г",
      saturatedFat: "14 г",
      protein: "8 г",
    },
    photos: [
      "https://example.com/photos/pompadour-special-1.jpg",
      "https://example.com/photos/pompadour-special-2.jpg",
    ],
  },
  {
    name: "Свадебный торт «Мария‑Антуанетта»",
    type: "cake",
    id: "marie-antoinette-special-001",
    realese: "2024-01-01",
    collection: "special",
    price: 12000,
    information: {
      allergen: ["глютен", "яйца", "молоко", "шоколад"],
      ingredient: [
        "ванильный бисквит",
        "сырно‑сливочный крем",
        "свежая клубника",
        "шоколадные барельефы с купидонами",
        "ванильный крем",
        "сахар",
        "яйца",
        "масло сливочное",
      ],
      storage: "Хранить при температуре +2 °C … +6 °C. Срок годности — 48 часов.",
    },
    description:
      "Роскошный одноярусный торт в стиле эпохи Марии‑Антуанетты: ванильный бисквит со слоями сырно‑сливочного крема и свежей клубники. Декор — нежные кремовые рюши и шоколадные барельефы с купидонами. Диаметр нижнего яруса — 22 см, высота — 25 см. Идеален для камерной свадьбы в стиле рококо или барокко.",
    weight: "3,0 кг",
    nutritional: {
      energy: {
        kj: 2600,
        kcal: 620,
      },
      carbohydrate: "70 г",
      sugars: "48 г",
      salt: "0,4 г",
      fat: "36 г",
      saturatedFat: "18 г",
      protein: "10 г",
    },
    photos: [
      "https://example.com/photos/marie-antoinette-special-1.jpg",
      "https://example.com/photos/marie-antoinette-special-2.jpg",
    ],
  },
  {
    name: "Свадебный торт «Арабеск»",
    type: "cake",
    id: "arabesque-special-001",
    realese: "2024-01-01",
    collection: "special",
    price: 4500,
    information: {
      allergen: ["глютен", "молоко", "арахис"],
      ingredient: [
        "бисквитная основа",
        "крем на растительных маслах",
        "дроблёный арахис",
        "сахар",
        "яйца",
        "ванилин",
      ],
      storage: "Хранить при температуре +2 °C … +6 °C. Срок годности — 24 часа.",
    },
    description:
      "Лаконичный свадебный торт с бисквитной основой и кремом на растительных маслах. Украшен дроблёным арахисом, что придаёт текстурное разнообразие. Вес — 750 г. Отличный вариант для небольшой свадьбы или десертного стола в современном стиле.",
    weight: "0,75 кг",
    nutritional: {
      energy: {
        kj: 1800,
        kcal: 430,
      },
      carbohydrate: "50 г",
      sugars: "30 г",
      salt: "0,2 г",
      fat: "24 г",
      saturatedFat: "8 г",
      protein: "6 г",
    },
    photos: [
      "https://example.com/photos/arabesque-special-1.jpg",
      "https://example.com/photos/arabesque-special-2.jpg",
    ],
  },
  {
    name: "Свадебный торт «Арабеск - test-chocolate»",
    type: "chocolate",
    id: "arabesque-special-001",
    realese: "2024-01-01",
    collection: "special",
    price: 4500,
    information: {
      allergen: ["глютен", "молоко", "арахис"],
      ingredient: [
        "бисквитная основа",
        "крем на растительных маслах",
        "дроблёный арахис",
        "сахар",
        "яйца",
        "ванилин",
      ],
      storage: "Хранить при температуре +2 °C … +6 °C. Срок годности — 24 часа.",
    },
    description:
      "Лаконичный свадебный торт с бисквитной основой и кремом на растительных маслах. Украшен дроблёным арахисом, что придаёт текстурное разнообразие. Вес — 750 г. Отличный вариант для небольшой свадьбы или десертного стола в современном стиле.",
    weight: "0,75 кг",
    nutritional: {
      energy: {
        kj: 1800,
        kcal: 430,
      },
      carbohydrate: "50 г",
      sugars: "30 г",
      salt: "0,2 г",
      fat: "24 г",
      saturatedFat: "8 г",
      protein: "6 г",
    },
    photos: [
      "https://example.com/photos/arabesque-special-1.jpg",
      "https://example.com/photos/arabesque-special-2.jpg",
    ],
  },
  {
    name: "Свадебный торт «Арабеск - test-chocolate»",
    type: "chocolate",
    id: "arabesque-special-001",
    realese: "2024-01-01",
    collection: "special",
    price: 4500,
    information: {
      allergen: ["глютен", "молоко", "арахис"],
      ingredient: [
        "бисквитная основа",
        "крем на растительных маслах",
        "дроблёный арахис",
        "сахар",
        "яйца",
        "ванилин",
      ],
      storage: "Хранить при температуре +2 °C … +6 °C. Срок годности — 24 часа.",
    },
    description:
      "Лаконичный свадебный торт с бисквитной основой и кремом на растительных маслах. Украшен дроблёным арахисом, что придаёт текстурное разнообразие. Вес — 750 г. Отличный вариант для небольшой свадьбы или десертного стола в современном стиле.",
    weight: "0,75 кг",
    nutritional: {
      energy: {
        kj: 1800,
        kcal: 430,
      },
      carbohydrate: "50 г",
      sugars: "30 г",
      salt: "0,2 г",
      fat: "24 г",
      saturatedFat: "8 г",
      protein: "6 г",
    },
    photos: [
      "https://example.com/photos/arabesque-special-1.jpg",
      "https://example.com/photos/arabesque-special-2.jpg",
    ],
  },
  {
    name: "Свадебный торт «Арабеск - test-chocolate»",
    type: "chocolate",
    id: "arabesque-special-001",
    realese: "2024-01-01",
    collection: "special",
    price: 4500,
    information: {
      allergen: ["глютен", "молоко", "арахис"],
      ingredient: [
        "бисквитная основа",
        "крем на растительных маслах",
        "дроблёный арахис",
        "сахар",
        "яйца",
        "ванилин",
      ],
      storage: "Хранить при температуре +2 °C … +6 °C. Срок годности — 24 часа.",
    },
    description:
      "Лаконичный свадебный торт с бисквитной основой и кремом на растительных маслах. Украшен дроблёным арахисом, что придаёт текстурное разнообразие. Вес — 750 г. Отличный вариант для небольшой свадьбы или десертного стола в современном стиле.",
    weight: "0,75 кг",
    nutritional: {
      energy: {
        kj: 1800,
        kcal: 430,
      },
      carbohydrate: "50 г",
      sugars: "30 г",
      salt: "0,2 г",
      fat: "24 г",
      saturatedFat: "8 г",
      protein: "6 г",
    },
    photos: [
      "https://example.com/photos/arabesque-special-1.jpg",
      "https://example.com/photos/arabesque-special-2.jpg",
    ],
  },
  {
    name: "Свадебный торт «Арабеск-test-macarons»",
    type: "macarons",
    color: { name: "saltedCaramel", value: "Соленая карамель" },
    id: "arabesque-special-001",
    realese: "2024-01-01",
    collection: "special",
    price: 4500,
    information: {
      allergen: ["глютен", "молоко", "арахис"],
      ingredient: [
        "бисквитная основа",
        "крем на растительных маслах",
        "дроблёный арахис",
        "сахар",
        "яйца",
        "ванилин",
      ],
      storage: "Хранить при температуре +2 °C … +6 °C. Срок годности — 24 часа.",
    },
    description:
      "Лаконичный свадебный торт с бисквитной основой и кремом на растительных маслах. Украшен дроблёным арахисом, что придаёт текстурное разнообразие. Вес — 750 г. Отличный вариант для небольшой свадьбы или десертного стола в современном стиле.",
    weight: "0,75 кг",
    nutritional: {
      energy: {
        kj: 1800,
        kcal: 430,
      },
      carbohydrate: "50 г",
      sugars: "30 г",
      salt: "0,2 г",
      fat: "24 г",
      saturatedFat: "8 г",
      protein: "6 г",
    },
    photos: [
      "https://example.com/photos/arabesque-special-1.jpg",
      "https://example.com/photos/arabesque-special-2.jpg",
    ],
  },
  {
    name: "Свадебный торт «Арабеск-test-tea",
    type: "typeTea",
    typeTea: { name: "green", value: "Зеленый" },
    id: "arabesque-special-001",
    realese: "2024-01-01",
    collection: "special",
    price: 4500,
    information: {
      allergen: ["глютен", "молоко", "арахис"],
      ingredient: [
        "бисквитная основа",
        "крем на растительных маслах",
        "дроблёный арахис",
        "сахар",
        "яйца",
        "ванилин",
      ],
      storage: "Хранить при температуре +2 °C … +6 °C. Срок годности — 24 часа.",
    },
    description:
      "Лаконичный свадебный торт с бисквитной основой и кремом на растительных маслах. Украшен дроблёным арахисом, что придаёт текстурное разнообразие. Вес — 750 г. Отличный вариант для небольшой свадьбы или десертного стола в современном стиле.",
    weight: "0,75 кг",
    nutritional: {
      energy: {
        kj: 1800,
        kcal: 430,
      },
      carbohydrate: "50 г",
      sugars: "30 г",
      salt: "0,2 г",
      fat: "24 г",
      saturatedFat: "8 г",
      protein: "6 г",
    },
    photos: [
      "https://example.com/photos/arabesque-special-1.jpg",
      "https://example.com/photos/arabesque-special-2.jpg",
    ],
  },
  {
    name: "Свадебный торn-test-tea",
    type: "typeTea",
    typeTea: { name: "black", value: "Черный" },
    id: "arabesque-special-001",
    realese: "2024-01-01",
    collection: "special",
    price: 4500,
    information: {
      allergen: ["глютен", "молоко", "арахис"],
      ingredient: [
        "бисквитная основа",
        "крем на растительных маслах",
        "дроблёный арахис",
        "сахар",
        "яйца",
        "ванилин",
      ],
      storage: "Хранить при температуре +2 °C … +6 °C. Срок годности — 24 часа.",
    },
    description:
      "Лаконичный свадебный торт с бисквитной основой и кремом на растительных маслах. Украшен дроблёным арахисом, что придаёт текстурное разнообразие. Вес — 750 г. Отличный вариант для небольшой свадьбы или десертного стола в современном стиле.",
    weight: "0,75 кг",
    nutritional: {
      energy: {
        kj: 1800,
        kcal: 430,
      },
      carbohydrate: "50 г",
      sugars: "30 г",
      salt: "0,2 г",
      fat: "24 г",
      saturatedFat: "8 г",
      protein: "6 г",
    },
    photos: [
      "https://example.com/photos/arabesque-special-1.jpg",
      "https://example.com/photos/arabesque-special-2.jpg",
    ],
  },
];
