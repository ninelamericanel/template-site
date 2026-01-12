"use client";

import { useSelector, useDispatch } from "react-redux";
import { ICategory, IFilterState, TCategory, setCategory } from "../../src/state/filterSlice";
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

export const FilterComponent = () => {
  const { category, subfilters, activeSubfilter } = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();
  const filters: ICategory[] = [
    {
      value: "all",
      label: "Все категории",
    },
    { value: "cake", label: "Торты" },
    { value: "chocolate", label: "Шоколад" },
    { value: "typeTea", label: "Чай" },
  ];

  const selectTab = (item: ICategory) => {
    dispatch(setCategory(item));
  };

  const resetTab = () => {
    dispatch(
      setCategory({
        value: "all",
        label: "Все категории",
      })
    );
  };

  if (category.value !== "all") {
    return (
      <div className={styles.block}>
        {activeSubfilter.map((item) => {
          const subfilter = subfilters[item];
          if (subfilter.name === "price") {
          }

          return <p className={styles.item}>{subfilter.name}</p>;
        })}
        <p className={styles.back} onClick={resetTab}>
          &lt;
        </p>
      </div>
    );
  }

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
