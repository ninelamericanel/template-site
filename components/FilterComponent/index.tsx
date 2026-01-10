"use client";

import { useSelector, useDispatch } from "react-redux";
import { IFilterState, TCategory, setCategory } from "../../src/state/filterSlice";
import styles from "./index.module.scss";
import { RootState } from "../../src/state/store";

interface ISort {
  values: TCategory[];
}

interface IFilterTea {
  color: "green" | "black";
  collection: "base" | "holidays" | "special";
  price: number;
}

interface IFilterCake {
  collection: "base" | "holidays" | "special";
  price: number;
}

interface IFilterMacarons {
  collection: "base" | "holidays" | "special";
  price: number;
  count: number;
}

interface IFilter {
  value: TCategory;
  label: string;
}

export const FilterComponent = ({ values }: ISort) => {
  const { category, subfilters, activeSubfilter } = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();
  const filters: IFilter[] = [
    {
      value: "all",
      label: "Все категории",
    },
    { value: "cake", label: "Торты" },
    { value: "chocolate", label: "Шоколад" },
    { value: "tea", label: "Чай" },
  ];

  const selectTab = (item: IFilter) => {
    dispatch(setCategory(item));
  };

  return (
    <div className={styles.block}>
      {filters.map((item) => {
        return (
          <p className={styles.item} onClick={() => selectTab(item)}>
            {item.label}
          </p>
        );
      })}
    </div>
  );
};
