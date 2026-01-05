// серверный компонент, тк получаю данные с сервера по ассортименту магазина
import { fetchProducts } from "../../api/fetchProducts";
import { DataContext } from "../../context/dataContext";
import styles from "./index.module.scss";

export default async function PreviewShop({ children }) {
  const products = await fetchProducts();
  return (
    <section className={styles.section}>
      <h2 className={styles.title}> Сладкие моменты</h2>
      <DataContext.Provider data={products}>{children}</DataContext.Provider>
    </section>
  );
}
