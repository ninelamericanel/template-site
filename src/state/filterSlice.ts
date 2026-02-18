import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { findMinMaxShort } from "../utils/findMinMaxShort";
import { fetchProducts } from "../../api/fetchProducts";
import { ICake } from "../../data/data-shop";
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
  price: [number, number];
  tea: {
    type: string;
    name: string;
    active: boolean;
    disabled: boolean;
  }[];
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
  activeCategorie: string;
  subfilters: {
    price: [number, number];
    changedPrice: [number, number];
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
  activeCategorie: "",
  subfilters: {
    price: [0, 0],
    changedPrice: [0, 0],
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
      const { payload: type } = action;
      if (type === "all") {
        filterSlice.caseReducers.resetFilter(state);
      } else {
        state.category = state.category.map((item) => {
          if (item.value === type) {
            state.activeCategorie = type;
            return { ...item, active: true };
          }
          return { ...item, active: false };
        });
        filterSlice.caseReducers.filterItems(state);
        filterSlice.caseReducers.showSubfilters(state, type);
      }
    },
    filterItems: (state) => {
      state.filteredItems = state.items.filter((cb) => cb.type === state.activeCategorie);
    },
    showSubfilters: (state, type) => {
      const subcategories = categoriesNames(type).subfilters;
      state.activeSubfilters = subcategories;
      subcategories.forEach((item) => {
        if (item === "price") {
          const { min, max } = findMinMaxShort(state.filteredItems, "price");
          state.subfilters[item] = [min, max];
        }

        if (item === "tea") {
          const teaTypes = state.filteredItems.map((item) => item.tea?.name);
          const subfilters = state.subfilters[item];
          const array = subfilters.map((item) => {
            const isDisable = teaTypes.includes(item.type);
            return {
              ...item,
              disabled: isDisable,
            };
          });

          state.subfilters.tea = array;
        }
      });
    },
    setSubFilters: (state, action) => {
      const { name, type, value } = action.payload;
      if (type !== "price") {
        state.subfilters[type] = state.subfilters[type].map((item) => {
          if (item.active && item.type !== name) {
            return item;
          }
          if (item.active && item.type === name) {
            return { ...item, active: false };
          }
          return { ...item, active: item.type === name };
        });
      }

      if (type === "price") {
        state.subfilters.changedPrice[0] = value;
      }

      filterSlice.caseReducers.filterItemsOnSubfilter(state, type);
    },
    filterItemsOnSubfilter: (state, action) => {
      const changedRangeValues = [0, 0];

      changedRangeValues[0] =
        state.subfilters.changedPrice[0] > 0
          ? state.subfilters.changedPrice[0]
          : state.subfilters.price[0];
      changedRangeValues[1] = state.subfilters.price[1];

      const filteredProductsOnRange = (product) => {
        return product.price >= changedRangeValues[0] && product.price <= changedRangeValues[1];
      };

      let filtered = state.items.filter(filteredProductsOnRange);

      const filterProductsOnCheckboxes = (product) => {
        const activeCheckboxes = state.subfilters[action]
          .filter((cb) => cb.active)
          .map((cb) => cb.type);

        if (activeCheckboxes.length === 0) return true;

        const elementSubtype = product[action]?.name;
        return activeCheckboxes.includes(elementSubtype);
      };

      filtered = filtered.filter(filterProductsOnCheckboxes);

      state.filteredItems = filtered;
    },
    resetFilter: (state) => {
      state.filteredItems = state.items;
      state.category = state.category.map((item) => {
        return { ...item, active: item.value === "all" };
      });
      state.activeCategorie = "";
      state.subfilters.price = [0, 0];
      state.subfilters.changedPrice = [0, 0];
      state.subfilters.tea = state.subfilters.tea.map((item) => {
        return { ...item, active: false };
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

export const { setCategory, setSubFilters, resetFilter } = filterSlice.actions;
export default filterSlice.reducer;
