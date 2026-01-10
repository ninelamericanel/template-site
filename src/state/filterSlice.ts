import { createSlice } from "@reduxjs/toolkit";

export type TCategory = "all" | "cake" | "chocolate" | "macarons" | "tea";
type TColor = "lemon" | "saltedCaramel" | "vanilla";
type TTea = "green" | "black";

export interface IFilterState {
  items: string[];
  category: TCategory; // текущее значение фильтра
  activeSubfilter: TCategory[];
  subfilters: {
    color: TColor[];
    price: { min: 0; max: 0 };
    teaType: TTea[];
    count: number[];
  };
}

const initialState: IFilterState = {
  items: [], // ваши данные
  category: "all", // текущее значение фильтра
  activeSubfilter: [],
  subfilters: {
    color: [],
    price: { min: 0, max: 0 },
    teaType: [],
    count: [],
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
      console.log(action);
      state.activeSubfilter = getActiveSubFilters(action.payload);

      // state.subfilters = resetInactiveSubFilters(state, action.payload);
    },
    setSubFilters: (state, action) => {
      const { key, value } = action.payload;
      state.subfilters[key] = value;
    },
  },
});

function getActiveSubFilters(filterValue) {
  const map = {
    macarons: ["color", "count", "price"],
    cake: ["price"],
    tea: ["type", "price"],
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
