"use client";

import { ICake } from "../../data/data-shop";
import Card from "../Card";
import styles from "./index.module.scss";

interface IProps {
  data: ICake[];
}
const ShopList = ({ data }: IProps) => {
  const renderData = data?.map((item, index) => {
    return <Card data={item} />;
  });
  return <div className={styles.list}>{renderData}</div>;
};

export default ShopList;
