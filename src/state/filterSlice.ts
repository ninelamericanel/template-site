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
      const type = action.payload.value;

      state.category = type;
      state.activeSubfilter = getActiveSubFilters(type);

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
    filteredData: (state, action) => {
      const {
        category,
        subfilters: { color, price, typeTea, count },
      } = state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {})
      .addCase(fetchData.fulfilled, (state, action) => {
        state.items = action.payload;
        state.filteredItems = action.payload;
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

export const { setCategory, setSubFilters, filteredData } = filterSlice.actions;
export default filterSlice.reducer;
