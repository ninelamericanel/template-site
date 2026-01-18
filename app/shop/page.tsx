import parse from "html-react-parser";
import { FilterComponent } from "../../components/FilterComponent";
import styles from "./index.module.scss";
import ShopList from "../../components/ShopList";
import FilterMenu from "../../components/FilterMenu";

const data = {
  h1A: "",
  h1B: "",
  link: "/shop",
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
        <FilterMenu />
        <ShopList count={5} />
      </div>
    </section>
  );
}
