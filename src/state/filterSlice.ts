import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../../api/fetchProducts";
import { ICake } from "../../data/data-shop";

export type TCategory = "all" | "cake" | "chocolate" | "macarons" | "typeTea";
export type TSubCategory = "price" | "color" | "count" | "typeTea";
type TColor = "lemon" | "saltedCaramel" | "vanilla";
type TTea = "green" | "black";

export interface ICategory {
  value: TCategory;
  label: string;
}

export type TSubfilterValue =
  | { label: string; title: string; value: string[] | [] }
  | { label: string; title: string; value: string[] | [] }
  | { label: string; title: string; value: number[] | [] }
  | { label: string; title: string; value: { min: 0; max: 0 } };

export type TSubfilters = TSubfilterValue[];

export interface IFilterState {
  items: ICake[];
  filteredItems: ICake[];
  category: ICategory;
  activeSubfilter: TSubfilters;
  subfilters: TSubfilters;
}

const initialState: IFilterState = {
  items: [], // ваши данные
  filteredItems: [],
  category: {
    value: "all",
    label: "Все категории",
  }, // текущее значение фильтра
  activeSubfilter: [],
  subfilters: [
    { title: "price", label: "Цена", value: { min: 0, max: 0 } },
    { title: "color", label: "Цвет", value: [] },
    { title: "typeTea", label: "Вид чая", value: [] },
    { title: "count", label: "Количество", value: [] },
  ],
};

export const fetchData = createAsyncThunk("filters/fetchData", async () => {
  const products = (await fetchProducts()) as ICake[];
  return products;
});

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
      state.activeSubfilter = [
        ...state.subfilters.filter((item) => {
          if (getActiveSubFilters(action.payload.value).includes(item.title)) return item;
        }),
      ];

      const type = action.payload.value;
      // state.activeSubfilter = getActiveSubFilters(type);

      // Логика фильтрации прямо в редьюсере
      if (type === "all") {
        state.filteredItems = state.items; // или очищаем
      } else {
        state.filteredItems = state.items.filter((item) => item.type === type);
      }
    },

    setSubFilters: (state, action) => {
      const { key, value } = action.payload;
      state.subfilters[key] = value;
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
        // const subfiltersTea = items.filter((item) => item.typeTea.name);
      })
      .addCase(fetchData.rejected, (state) => {});
  },
});

function getActiveSubFilters(filterValue) {
  const map = {
    macarons: ["color", "count", "price"],
    cake: ["price"],
    typeTea: ["typeTea", "price"],
    chocolate: ["price"],
    all: [],
  };

  return map[filterValue] || [];
}

function applyFirstLevelFilter(type, state) {
  if (type === "all") return;
  state.filteredItems = state.items.filter((item) => {
    return item.type === type;
  });
}

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
