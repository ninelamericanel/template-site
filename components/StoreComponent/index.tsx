import parse from "html-react-parser";
import { fetchProducts } from "../../api/fetchProducts";
import { SortComponent } from "../FilterComponent";
import styles from "./index.module.scss";

export default async function StoreComponent() {
  const products = await fetchProducts();

  return (
    
  );
}
