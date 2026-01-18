"use client";

import { useDispatch, useSelector } from "react-redux";
import { ICategory, setCategory } from "../../src/state/filterSlice";
import { AnimatePresence, motion } from "framer-motion";
import { RootState } from "../../src/state/store";
import { findMinMaxShort } from "../../src/utils/findMinMaxShort";
import styles from "./index.module.scss";
import { useState } from "react";

const dataCategory = ["Торты", "Макаруны", "Шоколад", "Чай"];
const category = [
  {
    value: "all",
    label: "Все категории",
  },
  { value: "cake", label: "Торты" },
  { label: "Чай", value: "typeTea" },
  { label: "Шоколад", value: "chocolate" },
];

interface IMinMaxVulues {
  min: null | number;
  max: null | number;
}

const FilterMenu = () => {
  const [isActive, setIsActive] = useState<null | number>(null);
  const { filteredItems, subfilters, activeSubfilter } = useSelector(
    (state: RootState) => state.filter
  );
  const dispatch = useDispatch();
  const getPriceInfo = (): IMinMaxVulues => {
    let obj = { min: null, max: null };
    obj = findMinMaxShort(filteredItems, "price");
    return obj.max === obj.min ? { min: null, max: obj.max } : obj;
  };

  const setFilter = (value, index) => {
    if (isActive) {
      setIsActive(null);
    } else {
      dispatch(setCategory(value));
      setIsActive(index);
    }
  };

  const renderCategory = category.map((item, i) => {
    const { min: minPrice, max: maxPrice } = getPriceInfo();
    return (
      <>
        <li onClick={() => setFilter(item, i)}>{item.label}</li>
        {isActive === i && item.value !== "all" ? (
          <AnimatePresence>
            <motion.ul
              initial={{ height: "0px" }}
              animate={{ height: "fit-content" }}
              exit={{ height: "0px" }}
              transition={{ duration: 0.7 }}
            >
              {activeSubfilter.map((item) => {
                return (
                  <>
                    <li>{item.label}</li>
                    {item.title === "price" ? (
                      <div className={styles.subFilter}>
                        <input
                          type="range"
                          min={minPrice}
                          max={maxPrice}
                          value={maxPrice}
                          // onChange={}
                          className={styles.input}
                        />
                        <div className={styles.values}>
                          <span>{minPrice}</span>
                          <span>{maxPrice}</span>
                        </div>
                      </div>
                    ) : null}
                  </>
                );
              })}
            </motion.ul>
          </AnimatePresence>
        ) : null}
      </>
    );
  });

  console.log(category, activeSubfilter);

  return <ul className={styles.aside}>{renderCategory}</ul>;
};

export default FilterMenu;
