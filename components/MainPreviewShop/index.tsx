"use client";

import { useData } from "../../context/dataContext";
import Button from "../Button";
import ShopList from "../ShopList";
import styles from "./index.module.scss";

const VIEW_ITEMS = 6;

const MainPreviewShop = () => {
  const products = useData()?.slice(0, 5);
  if (!products) {
    return <div style={{ color: "red" }}>КОНТЕКСТ НЕ ДОСТУПЕН</div>;
  }

  if (products.length === 0) {
    return <div>Товары отсутствуют</div>;
  }
  return (
    <>
      <ShopList count={VIEW_ITEMS} />
      <div className={styles.showMore}>
        <Button type="link" desc="Показать еще" />
      </div>
    </>
  );
};

export default MainPreviewShop;
