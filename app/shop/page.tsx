import parse from "html-react-parser";
import { useDispatch } from "react-redux";
import { FilterComponent } from "../../components/FilterComponent";
import styles from "./index.module.scss";
import { fetchProducts } from "../../api/fetchProducts";
import ShopList from "../../components/ShopList";
import { TCategory, setItems } from "../../src/state/filterSlice";
import { ICake } from "../../data/data-shop";
import { useSelector } from "react-redux";
import { RootState } from "../../src/state/store";
import { useEffect } from "react";

const data = {
  h1A: "Сладкие моменты",
  h1B: "c Laduree",
  desc: `Ресторан Ladur&eacute;e &agrave;-la Russe`,
  buttonDesc: "Перейти в магазин",
  link: "/shop",
  // bg,
};

const checkComponent = (array) => {
  const arr = array.map((item) => {
    return item?.type;
  });
  return new Set(arr);
};

function filterItems(
  array,
  typeFilter,
  categoryFilters,
  typeKey = "type",
  categoryKey = "category"
) {
  // 1‑й уровень: фильтрация по типу товара
  const typeFiltered = typeFilter ? array.filter((item) => item[typeKey] === typeFilter) : array;

  // 2‑й уровень: фильтрация по спискам категорий
  if (!categoryFilters || categoryFilters.length === 0) {
    return typeFiltered;
  }

  return typeFiltered.filter((item) => categoryFilters.includes(item[categoryKey]));
}

export default async function Store() {
  return (
    <section className={styles.section}>
      <div className={styles.titleBlock}>
        <h1 className={styles.title}>{parse(data.h1A)}</h1>
        <h1 className={styles.title}>{parse(data.h1B)}</h1>
      </div>
      <FilterComponent />
      <div className={styles.list}>
        <ShopList />
      </div>
    </section>
  );
}
