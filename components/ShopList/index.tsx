"use client";

import { ICake } from "../../data/data-shop";
import Card from "../Card";
import styles from "./index.module.scss";

interface IProps {
  data: ICake[];
}
const ShopList = ({ data }: IProps) => {
  const renderData = data?.map((item, index) => {
    return (
      <div className={styles.list}>
        <Card data={item} />
      </div>
    );
  });
  return renderData;
};

export default ShopList;
