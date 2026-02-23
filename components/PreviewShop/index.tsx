// серверный компонент, тк получаю данные с сервера по ассортименту магазина
import { fetchProducts } from "../../api/fetchProducts";
import { DataContext } from "../../context/dataContext";
import styles from "./index.module.scss";

export default async function PreviewShop({ children }) {
  console.log("✅ 1. PreviewShop: старт рендера");
  const products = await fetchProducts();
  console.log("✅ 2. Данные получены:", products);

  // Критическая проверка
  if (!products || !Array.isArray(products)) {
    console.error("❌ Ошибка: products не массив:", products);
    return <div>Ошибка данных</div>;
  }

  if (products.length === 0) {
    console.warn("⚠️ Предупреждение: products пуст");
    return <div>Нет товаров</div>;
  }

  console.log("✅ 3. Передаю в провайдер:", products.length, "элементов");

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Сладкие моменты</h2>
      <DataContext.Provider value={products}>{children}</DataContext.Provider>
    </section>
  );
}
