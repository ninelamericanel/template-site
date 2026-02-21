"use client";

import { useDispatch, useSelector } from "react-redux";
import { setCategory, setSubFilters } from "../../src/state/filterSlice";
import { AnimatePresence, motion } from "framer-motion";
import { RootState } from "../../src/state/store";
import styles from "./index.module.scss";
import { useState } from "react";
import { RangeInput } from "../RangeInput";
import { Checkbox } from "../Checkbox";

const Menu = ({ data, isActive, setActive, id }) => {
  const { subfilters, activeSubfilters, category } = useSelector(
    (state: RootState) => state.filter
  );
  const { value, label } = data;

  const dispatch = useDispatch();

  const setFilter = (value, index) => {
    if (isActive === index) {
      setActive(null);
    } else {
      dispatch(setCategory(value));
      setActive(index);
    }
  };
  //name - имя чекбокса, type - тип категории

  const setSubcategory = (name, type) => {
    console.log("name, type", name, type);
    dispatch(setSubFilters({ name, type }));
  };

  // const renderCategory = category.map((item, i) => {
  const minPrice = subfilters.price[0];
  const maxPrice = subfilters.price[1];

  return (
    <>
      <motion.li
        onClick={() => setFilter(value, id)}
        className={`${styles.itemFilter} ${isActive === id ? styles.itemFilterActive : ""}`}
      >
        {label}
      </motion.li>
      {isActive === id && value !== "all" ? (
        <motion.ul
          className={`${styles.filter}`}
          layout
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          exit={{ opacity: 0, scaleY: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          style={{
            transformOrigin: "top", // Точка отсчёта — сверху
            overflow: "hidden", // Скрываем содержимое за границами
          }}
          key={id}
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
              return subfilters.tea.map((item) => (
                <Checkbox data={item} setCheckbox={() => setSubcategory(item.type, subfilter)} />
              ));
            }
          })}
        </motion.ul>
      ) : null}
    </>
  );
};

export const FilterMenu = () => {
  const [isActive, setActive] = useState<null | string>(null);
  const { category } = useSelector((state: RootState) => state.filter);

  return (
    <AnimatePresence initial={false}>
      <ul className={styles.aside}>
        {category.map((item) => (
          <Menu
            key={item.value}
            data={item}
            isActive={isActive}
            setActive={setActive}
            id={`${item.value}-FilterMenu`}
          />
        ))}
      </ul>
    </AnimatePresence>
  );
};

export default FilterMenu;

//todo
// при рендере раскрывающего  меню необхоимо оборачивать именно элементы раскрытия
// в компонент <AnimatePresence/>
// если элементы добавляются и удаляются из DOM, то оборачивать необходимо сам  список

// для корректной анимации добавления элемента в DOM  и его удаления лучше устанавливать
// transform и opacity как измяемые величины
// layout -> paint -> composite  - width и height вызывают перерисовку на этапе layout,
// что может приводить к рывкам, а transform и opacity на этапе composite
// есть нюансы использования transform
// height разрешается использоавать в комбинации и при определенных условиях
