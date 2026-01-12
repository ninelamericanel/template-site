import { createSlice } from "@reduxjs/toolkit";

export type TCategory = "all" | "cake" | "chocolate" | "macarons" | "typeTea";
type TColor = "lemon" | "saltedCaramel" | "vanilla";
type TTea = "green" | "black";

export interface ICategory {
  value: TCategory;
  label: string;
}

export type TSubfilterValue =
  | { name: "color"; value: TColor[] | [] }
  | { name: "teaType"; value: TTea[] | [] }
  | { name: "count"; value: number[] | [] }
  | { name: "price"; value: { min: 0; max: 0 } };

export type TSubfilters = {
  [K in TCategory]: TSubfilterValue;
};

export interface IFilterState {
  items: string[];
  category: ICategory;
  activeSubfilter: ICategory[];
  subfilters: TSubfilters;
}

const initialState: IFilterState = {
  items: [], // ваши данные
  category: {
    value: "all",
    label: "Все категории",
  }, // текущее значение фильтра
  activeSubfilter: [],
  subfilters: {
    color: { name: "Цвет", value: [] },
    price: { name: "Цена", value: { min: 0, max: 0 } },
    teaType: { name: "Сорт чая", value: [] },
    count: { name: "Количество", value: [] },
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
      state.activeSubfilter = getActiveSubFilters(action.payload.value);

      // state.subfilters = resetInactiveSubFilters(state, action.payload);
    },
    setSubFilters: (state, action) => {
      const { key, value } = action.payload;
      state.subfilters[key] = value;
    },
  },
});

function getActiveSubFilters(filterValue) {
  console.log(filterValue, "filtered");
  const map = {
    macarons: ["color", "count", "price"],
    cake: ["price"],
    tea: ["teaType", "price"],
    chocolate: ["price"],
    all: [],
  };

  return map[filterValue] || [];
}

function resetInactiveSubFilters(state, activeCategory) {
  const activeKeys = getActiveSubFilters(activeCategory);
  Object.keys(state.subFilters).forEach((key) => {
    if (!activeKeys.includes(key)) {
      // Сброс до начальных значений
      if (key === "price") {
        state.subfilters[key] = { min: 0, max: 1000 };
      } else {
        state.subfilters[key] = [];
      }
    }
  });

  return state.subfilters;
}

export const { setCategory, setSubFilters } = filterSlice.actions;
export default filterSlice.reducer;
