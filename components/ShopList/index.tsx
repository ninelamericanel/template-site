"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Card from "../Card";
import styles from "./index.module.scss";
import { fetchData } from "../../src/state/filterSlice";
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

  const renderData = items.slice(0, count)?.map((item) => {
    return <Card data={item} key={item.id} />;
  });
  return <div className={styles.list}>{renderData}</div>;
};

export default ShopList;
