"use client";
import styles from "./index.module.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../src/state/store";

export const FilterComponent = () => {
  const { category } = useSelector((state: RootState) => state.filter);

  const findActiveCategory = () => category.filter((cb) => cb.active).map((cb) => cb.label)[0];

  return (
    <>
      <div className={styles.block}>
        <p>{findActiveCategory()}</p>
      </div>
    </>
  );
};
