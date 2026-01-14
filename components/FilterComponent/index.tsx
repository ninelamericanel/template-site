"use client";

import { useSelector, useDispatch } from "react-redux";
import { findMinMaxShort } from "../../src/utils/findMinMaxShort";
import {
  ICategory,
  IFilterState,
  TCategory,
  resetFilter,
  setCategory,
} from "../../src/state/filterSlice";
import styles from "./index.module.scss";
import { RootState } from "../../src/state/store";
import { useState } from "react";

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

interface IMinMaxVulues {
  min: null | number;
  max: null | number;
}

export const FilterComponent = () => {
  const [isOpenFilter, openFilter] = useState<boolean>(false);
  const { category, subfilters, activeSubfilter, filteredItems } = useSelector(
    (state: RootState) => state.filter
  );
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
    dispatch(resetFilter());
  };

  const openValue = () => {
    openFilter(!isOpenFilter);
  };

  const getPriceInfo = (): IMinMaxVulues => {
    let obj = { min: null, max: null };
    obj.min = findMinMaxShort(filteredItems, "price").min;
    obj.max = findMinMaxShort(filteredItems, "price").max;

    return obj;
  };

  if (category.value !== "all") {
    return (
      <div className={styles.block}>
        {activeSubfilter.map((item) => {
          const subfilter = subfilters[item];
          if (subfilter.name === "price") {
          }

          return (
            <>
              <p className={styles.item} onClick={openValue}>
                {subfilter.name}
              </p>
              {isOpenFilter ? (
                <div className={styles.subFilter}>
                  <input
                    type="range"
                    min={getPriceInfo().max !== getPriceInfo().min ? getPriceInfo().min : null}
                    max={getPriceInfo().max !== getPriceInfo().min ? getPriceInfo().max : null}
                    className={styles.input}
                  />
                  <div className={styles.values}>
                    <span>{getPriceInfo().min}</span>
                    <span>{getPriceInfo().max}</span>
                  </div>
                </div>
              ) : null}
            </>
          );
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
