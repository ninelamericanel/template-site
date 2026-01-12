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
  | { name: string; value: TColor[] | [] }
  | { name: string; value: TTea[] | [] }
  | { name: string; value: number[] | [] }
  | { name: string; value: { min: 0; max: 0 } };

export type TSubfilters = {
  [K in TSubCategory]: TSubfilterValue;
};

export interface IFilterState {
  items: ICake[];
  filteredItems: ICake[];
  category: ICategory;
  activeSubfilter: TCategory[];
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
  subfilters: {
    color: { name: "Цвет", value: [] },
    price: { name: "Цена", value: { min: 0, max: 0 } },
    typeTea: { name: "Сорт чая", value: [] },
    count: { name: "Количество", value: [] },
  },
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
      state.activeSubfilter = getActiveSubFilters(action.payload.value);

      // state.subfilters = resetInactiveSubFilters(state, action.payload);
    },
    setSubFilters: (state, action) => {
      const { key, value } = action.payload;
      state.subfilters[key] = value;
    },
    filteredData: (state, action) => {
      const {
        category,
        subfilters: { color, price, typeTea, count },
      } = state;

      // const filteredArray = action.payload.filter((item) => )
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {})
      .addCase(fetchData.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchData.rejected, (state) => {});
  },
});

function getActiveSubFilters(filterValue) {
  console.log(filterValue, "filtered");
  const map = {
    macarons: ["color", "count", "price"],
    cake: ["price"],
    typeTea: ["typeTea", "price"],
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

function filterItems(
  array,
  typeFilter,
  categoryFilters,
  typeKey = "type",
  categoryKey = "category"
) {
  // 1‑й уровень: фильтрация по типу товара
  const typeFiltered = typeFilter ? array.filter((item) => item[typeKey] === typeFilter) : array;

  // 2‑й уровень: фильтрация по спискам категорий
  if (!categoryFilters || categoryFilters.length === 0) {
    return typeFiltered;
  }

  return typeFiltered.filter((item) => categoryFilters.includes(item[categoryKey]));
}

export const { setCategory, setSubFilters, filteredData, setItems } = filterSlice.actions;
export default filterSlice.reducer;
