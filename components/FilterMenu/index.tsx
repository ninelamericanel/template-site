import { useDispatch, useSelector } from "react-redux";
import { ICategory, setCategory } from "../../src/state/filterSlice";
import { motion } from "framer-motion";
import { RootState } from "../../src/state/store";
import { findMinMaxShort } from "../../src/utils/findMinMaxShort";
import styles from "./index.module.scss";

const dataCategory = ["Торты", "Макаруны", "Шоколад", "Чай"];
const category = [
  {
    value: "all",
    label: "Все категории",
  },
  { value: "cake", label: "Торты" },
  { label: "Чай", value: "typeTea" },
  { label: "Шоколад", value: "chocolate" },
];

const FilterMenu = () => {
  const { filteredItems, subfilters } = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();
  const getPriceInfo = () => {
    let obj = { min: null, max: null };
    obj = findMinMaxShort(filteredItems, "price");
    return obj.max === obj.min ? { min: null, max: obj.max } : obj;
  };

  const setFilter = (value) => dispatch(setCategory(value));

  const renderCategory = category.map((item) => (
    <p onClick={() => setFilter(item)}>{item.label}</p>
  ));

  console.log(category);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      exit={{ opacity: 0 }}
      className={styles.filter}
    >
      {renderCategory}
    </motion.div>
  );
};

export default FilterMenu;
