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
