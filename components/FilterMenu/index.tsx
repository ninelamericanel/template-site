"use client";

import { useDispatch, useSelector } from "react-redux";
import { setCategory, setSubFilters } from "../../src/state/filterSlice";
import { AnimatePresence, motion } from "framer-motion";
import { RootState } from "../../src/state/store";
import styles from "./index.module.scss";
import { useState } from "react";
import { RangeInput } from "../RangeInput";

const FilterMenu = () => {
  const [isActive, setIsActive] = useState<null | number>(null);
  const { subfilters, activeSubfilters, category } = useSelector(
    (state: RootState) => state.filter
  );
  const dispatch = useDispatch();

  const setFilter = (value, index) => {
    if (isActive === index) {
      setIsActive(null);
    } else {
      dispatch(setCategory(value));
      setIsActive(index);
    }
  };

  const setSubcategory = (name, type) => {
    dispatch(setSubFilters({ name, type }));
  };

  const renderCategory = category.map((item, i) => {
    const minPrice = subfilters.price[0];
    const maxPrice = subfilters.price[1];
    return (
      <>
        <li
          onClick={() => setFilter(item.value, i)}
          className={`${styles.itemFilter} ${isActive === i ? styles.itemFilterActive : ""}`}
        >
          {item.label}
        </li>
        {isActive === i && item.value !== "all" ? (
          <AnimatePresence>
            <motion.ul
              initial={{ height: "0px" }}
              animate={{ height: "fit-content" }}
              exit={{ height: "0px" }}
              transition={{ duration: 0.7 }}
              className={`${styles.filter}`}
            >
              {activeSubfilters.map((subfilter) => {
                if (subfilter === "price") {
                  return (
                    <RangeInput
                      changedValue={subfilters.changedPrice[0]}
                      minValue={minPrice}
                      maxValue={maxPrice}
                      title={"Цена"}
                    />
                  );
                }

                if (subfilter === "tea") {
                  return subfilters.tea.map((item) => {
                    return (
                      <div
                        className={`${styles.checkboxBlock} ${!item.disabled ? styles.disabled : ""}`}
                      >
                        <input
                          disabled={!item.disabled}
                          type="checkbox"
                          id={item.name}
                          name={item.name}
                          className={styles.checkbox}
                          onClick={() => setSubcategory(item.type, subfilter)}
                        />
                        <label className={styles.label} for={item.name}>
                          {item.name}
                        </label>
                      </div>
                    );
                  });
                }
              })}
            </motion.ul>
          </AnimatePresence>
        ) : null}
      </>
    );
  });

  return <ul className={styles.aside}>{renderCategory}</ul>;
};

export default FilterMenu;
