"use client";

import { useData } from "../../context/dataContext";
import Button from "../Button";
import ShopList from "../ShopList";
import styles from "./index.module.scss";

const MainPreviewShop = () => {
  const products = useData()?.slice(0, 5);
  // 6 max length items
  return (
    <>
      <ShopList data={products} />
      <div className={styles.showMore}>
        <Button type="link" desc="Показать еще" />
      </div>
    </>
  );
};

export default MainPreviewShop;
