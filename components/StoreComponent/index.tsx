import parse from "html-react-parser";
import { fetchProducts } from "../../api/fetchProducts";
import { SortComponent } from "../SortComponent";
import styles from "./index.module.scss";

export default async function StoreComponent() {
  const products = await fetchProducts();

  return (
    
  );
}
