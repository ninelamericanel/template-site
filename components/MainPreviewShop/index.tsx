"use client";

import { useData } from "../../context/dataContext";
import Button from "../Button";
import ShopList from "../ShopList";
import styles from "./index.module.scss";

const MainPreviewShop = () => {
  const products = useData()?.slice(0, 5);
  console.log("🔍 MainPreviewShop: useData вернул", products);
  if (!products) {
    return <div style={{ color: "red" }}>КОНТЕКСТ НЕ ДОСТУПЕН</div>;
  }

  if (products.length === 0) {
    return <div>Товары отсутствуют</div>;
  }
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

// export default function MainPreviewShop() {
//   const products = useData();
//   console.log("🔍 MainPreviewShop: useData вернул", products);

//   if (!products) {
//     return <div style={{ color: "red" }}>КОНТЕКСТ НЕ ДОСТУПЕН</div>;
//   }

//   if (products.length === 0) {
//     return <div>Товары отсутствуют</div>;
//   }

//   return (
//     <div>
//       <h3>Товары ({products.length} шт.):</h3>
//       <ul>
//         {products.slice(0, 5).map((item, i) => (
//           <li key={i}>
//             {item.name || "Без названия"} — {item.price} ₽
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

export default MainPreviewShop;
