"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ICake } from "../../data/data-shop";
import Card from "../Card";
import styles from "./index.module.scss";
import { fetchData, resetFilter } from "../../src/state/filterSlice";
import { RootState } from "../../src/state/store";

interface IShopList {
  count: number;
}

const ShopList = ({ count }: IShopList) => {
  const { filteredItems: items } = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, []);

  console.log(items, "ShopList");

  const renderData = items.slice(0, count)?.map((item, index) => {
    return <Card data={item} />;
  });
  return <div className={styles.list}>{renderData}</div>;
};

export default ShopList;
