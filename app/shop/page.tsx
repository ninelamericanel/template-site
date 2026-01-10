import parse from "html-react-parser";
import { FilterComponent } from "../../components/FilterComponent";
import styles from "./index.module.scss";
import { fetchProducts } from "../../api/fetchProducts";
import ShopList from "../../components/ShopList";
import { TCategory } from "../../src/state/filterSlice";

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

export default async function Store() {
  const products = await fetchProducts();
  const values = [...checkComponent(products)] as TCategory[];
  return (
    <section className={styles.section}>
      <div className={styles.titleBlock}>
        <h1 className={styles.title}>{parse(data.h1A)}</h1>
        <h1 className={styles.title}>{parse(data.h1B)}</h1>
      </div>
      <FilterComponent values={values} />
      {/* <div className={styles.list}>
        <ShopList data={products}></ShopList>
      </div> */}
    </section>
  );
}
