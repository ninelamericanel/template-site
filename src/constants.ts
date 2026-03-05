export const MIN_PERSON = 1;
export const MAX_PERSON = 20;

export const reserveInputs = [
  {
    type: "textarea",
    name: "name",
    placeholder: "Имя",
    require: true,
    requireForSend: true,
  },
  {
    type: "email",
    placeholder: "Электронная почта",
    require: true,
    name: "email",
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    requireForSend: true,
  },
  {
    type: "tel",
    placeholder: "Номер телефона",
    require: true,
    name: "tel",
    pattern: /^\+7\d{10}$/,
    requireForSend: true,
  },
  { type: "date", placeholder: "Дата", require: true, name: "date", requireForSend: true },
  { type: "time", placeholder: "Время", require: true, name: "time", requireForSend: true },
  {
    type: "number",
    placeholder: "Количество персон",
    require: false,
    name: "personCount",
    requireForSend: true,
  },
  { type: "textarea", placeholder: "Дополнительные пожелания", require: false, name: "extra" },
];
