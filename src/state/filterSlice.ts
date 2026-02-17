import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { findMinMaxShort } from "../utils/findMinMaxShort";
import { fetchProducts } from "../../api/fetchProducts";
import { ICake } from "../../data/data-shop";
import { maxMacarons, minMacarons } from "../constants";
// в constants указано максимальное и минимальное количество макарунов в коробке
export type TCategory = "all" | "cake" | "chocolate" | "macarons" | "tea";
type TColor = "lemon" | "saltedCaramel" | "vanilla";
type TTea = "green" | "black";

export interface ICategory {
  value: TCategory;
  label: string;
  active: boolean;
  view: boolean;
}

export type TSubfilterValue = {
  // withFloatingPoint: {
  price: [number, number];
  // count: [number, number];
  // };
  // checkboxes: {
  tea: {
    type: string;
    name: string;
    active: boolean;
    disabled: boolean;
  }[];
  // };
};

export interface Isubftype {
  type: string;
  name: string;
  active: boolean;
  disabled: boolean;
}

export type TSubfilters = TSubfilterValue[];

export interface IFilterState {
  items: ICake[];
  filteredItems: ICake[];
  category: ICategory[];
  activeSubfilters: string[];
  activeSubCategories: string[];
  subfilters: {
    price: [number, number];
    tea: Isubftype[];
  };
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
    { label: "Чай", value: "tea", active: false, view: false },
    { label: "Шоколад", value: "chocolate", active: false, view: false },
  ],
  activeSubfilters: [],
  activeSubCategories: [],
  subfilters: {
    price: [0, 0],
    tea: [
      { type: "fruit", name: "Фруктовый", active: false, disabled: true },
      { type: "green", name: "Зеленый", active: false, disabled: true },
      { type: "black", name: "Черный", active: false, disabled: true },
      { type: "chineese", name: "Китайский", active: false, disabled: true },
    ],
  },

  // color: {
  //   name: 'caramel', label: 'Карамель', active: false, disabled: true,
  //   name: 'vanilla', label: 'Ваниль', active: false, disabled: true,
  //   name: 'hazelnut', label: 'Орех', active: false, disabled: true,
  //   name: 'rose', label: 'Роза', active: false, disabled: true,
  // },
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

      const type = action.payload.value;

      // фильтрация по категориям
      if (type === "all") {
        state.filteredItems = state.items; // или очищаем
      } else {
        const filteredItems = state.items.filter((item) => item.type === type);

        state.filteredItems = filteredItems;
        const subcategories = categoriesNames(type).subfilters;
        state.activeSubCategories = subcategories;
        subcategories.forEach((item) => {
          if (item === "price") {
            const { min, max } = findMinMaxShort(filteredItems, "price");
            state.subfilters[item] = [min, max];
          }

          if (item === "tea") {
            const teaTypes = filteredItems.map((item) => item.tea.name);
            const subfilters = state.subfilters[item];
            const array = subfilters.map((item) => {
              const isAble = teaTypes.includes(item.type);
              return {
                ...item,
                disabled: isAble,
              };
            });

            state.subfilters.tea = array;
          }
        });
      }
    },

    setSubFilters: (state, action) => {
      const { name, type } = action.payload;
      state.subfilters[type] = state.subfilters[type].map((item) => {
        if (item.active && item.type !== name) {
          return item;
        }
        if (item.active && item.type === name) {
          return { ...item, active: false };
        }
        return { ...item, active: item.type === name };
      });

      filterSlice.caseReducers.filterItems(state);
    },
    resetFilter: (state) => {
      state.filteredItems = state.items;
      state.category = { value: "all", label: "Все категории" };
    },
    filterItems: (state) => {
      // по чекбоксам
      state.filteredItems = state.items.filter((item) => {
        const { type: itemType } = item;

        if (!state.subfilters[itemType]) return false;

        const activeCheckboxes = state.subfilters[itemType]
          .filter((cb) => cb.active)
          .map((cb) => cb.type);

        if (activeCheckboxes.length === 0) return true;

        const elementSubtype = item[itemType]?.name;
        return activeCheckboxes.includes(elementSubtype);
      });
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
      subfilters: ["price", "color", "count"],
    },
    cake: {
      name: "Торты",
      subfilters: ["price"],
    },
    tea: {
      name: "Чай",
      subfilters: ["price", "tea"],
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
