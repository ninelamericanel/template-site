"use client";
import styles from "./index.module.scss";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import FilterMenu from "../FilterMenu";
import { useSelector } from "react-redux";
import { RootState } from "../../src/state/store";

export const FilterComponent = () => {
  const { category } = useSelector((state: RootState) => state.filter);
  const [isOpenFilter, openFilter] = useState<boolean>(false);

  const openValue = () => {
    openFilter(!isOpenFilter);
  };

  return (
    <>
      <div className={styles.block} onClick={openValue}>
        <p>{category.label}</p>
      </div>
      <AnimatePresence>{isOpenFilter ? <FilterMenu /> : null}</AnimatePresence>
    </>
  );
};
