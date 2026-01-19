import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { findMinMaxShort } from "../utils/findMinMaxShort";
import { fetchProducts } from "../../api/fetchProducts";
import { ICake } from "../../data/data-shop";

export type TCategory = "all" | "cake" | "chocolate" | "macarons" | "typeTea";
export type TSubCategory = "price" | "color" | "count" | "typeTea";
type TColor = "lemon" | "saltedCaramel" | "vanilla";
type TTea = "green" | "black";

export interface ICategory {
  value: TCategory;
  label: string;
  active: boolean;
  view: boolean;
}

export type TSubfilterValue =
  | { label: string; title: string; value: string[] | []; view: boolean }
  | { label: string; title: string; value: string[] | []; view: boolean }
  | { label: string; title: string; value: { min: 0; max: 0 }; view: boolean };

export type TSubfilters = TSubfilterValue[];

export interface IFilterState {
  items: ICake[];
  filteredItems: ICake[];
  category: ICategory[];
  subfilter: TSubfilterValue[];
}

const initialState: IFilterState = {
  items: [], // ваши данные
  filteredItems: [],
  category: [
    {
      value: "all",
      label: "Все категории",
      active: true,
      view: false,
    },
    { value: "cake", label: "Торты", active: false, view: false },
    { label: "Чай", value: "typeTea", active: false, view: false },
    { label: "Шоколад", value: "chocolate", active: false, view: false },
  ],
  subfilter: [
    { title: "price", label: "Цена", value: { min: 0, max: 0 }, view: false },
    { title: "color", label: "Цвет", value: [], view: false },
    { title: "typeTea", label: "Вид чая", value: [], view: false },
    { title: "count", label: "Количество", value: [], view: false },
  ],
};

export const fetchData = createAsyncThunk("filters/fetchData", async () => {
  const products = (await fetchProducts()) as ICake[];
  return products;
});

const getValueSubfilter = (value, array, initial = false) => {
  if (value === "price") {
    return initial ? { min: 0, max: 0 } : findMinMaxShort(array, value);
  }
  if (value === "color") {
    return initial ? [] : [...array.filter((item) => item?.color.value)];
  }

  if (value === "typeTea") {
    return initial
      ? []
      : [
          ...array.map((item) => {
            if (item?.typeTea.value) {
              return item?.typeTea.value;
            }
          }),
        ];
  }
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;

      const type = action.payload.value;

      // фильтрация по категориям
      if (type === "all") {
        state.filteredItems = state.items; // или очищаем
      } else {
        const filteredItems = state.items.filter((item) => item.type === type);
        state.filteredItems = filteredItems;
        const subfiltersArray = state.subfilter.map((item) => {
          const namesSubfilters = categoriesNames(type).subfilters;
          return namesSubfilters.includes(item.title)
            ? { ...item, view: true, value: getValueSubfilter(item.title, filteredItems) }
            : { ...item, view: false, values: getValueSubfilter(item.title, filteredItems, true) };
        });
        state.subfilter = subfiltersArray;
        // фильтрация по сабкатегориям
      }
    },

    setSubFilters: (state, action) => {
      const { key, value } = action.payload;
      state.subfilter[key] = value;
      applySecondLevelFilter(state);
    },
    resetFilter: (state) => {
      state.filteredItems = state.items;
      state.category = { value: "all", label: "Все категории" };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {})
      .addCase(fetchData.fulfilled, (state, action) => {
        const items = action.payload;
        state.items = items;
        state.filteredItems = items;
        const findActiveCateories = [...new Set(items.map((item) => item.type))];
      })
      .addCase(fetchData.rejected, (state) => {});
  },
});

const categoriesNames = (value) => {
  const map = {
    macarons: {
      name: "Макаруны",
      subfilters: ["color", "price", "count"],
    },
    cake: {
      name: "Торты",
      subfilters: ["price"],
    },
    typeTea: {
      name: "Чай",
      subfilters: ["typeTea", "price"],
    },
    chocolate: {
      name: "Шоколад",
      subfilters: ["price"],
    },
  };

  return map[value];
};

function applySecondLevelFilter(state) {
  let result = [...state.filteredProducts]; // берём уже отфильтрованный по типу список

  // Фильтрация по цене
  if (state.filters.price.min !== null) {
    result = result.filter((p) => p.price >= state.filters.price.min);
  }
  if (state.filters.price.max !== null) {
    result = result.filter((p) => p.price <= state.filters.price.max);
  }

  // Фильтрация по бренду
  if (state.filters.brand.length > 0) {
    result = result.filter((p) => state.filters.brand.includes(p.brand));
  }

  // Фильтрация по цвету
  if (state.filters.color.length > 0) {
    result = result.filter((p) => state.filters.color.includes(p.color));
  }

  // Фильтрация по размеру
  if (state.filters.size.length > 0) {
    result = result.filter((p) => state.filters.size.includes(p.size));
  }

  state.filteredProducts = result;
}

export const { setCategory, setSubFilters, resetFilter } = filterSlice.actions;
export default filterSlice.reducer;
