// серверный компонент, тк получаю данные с сервера по ассортименту магазина
import { fetchProducts } from "../../api/fetchProducts";
import Button from "../Button";
import styles from "./index.module.scss";

export default async function PreviewShop() {
  const products = await fetchProducts();
  return (
    <section className={styles.section}>
      <h2 className={styles.title}> Сладкие моменты</h2>
      <div className={styles.list}></div>
      <Button type="link" desc="Показать еще"></Button>
    </section>
  );
}
