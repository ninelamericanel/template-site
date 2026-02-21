import { useDispatch } from "react-redux";
import styles from "./index.module.scss";
import { setSubFilters } from "../../src/state/filterSlice";

export const Checkbox = ({ data, setCheckbox }) => {
  const { name, disabled, type } = data;
  const dispatch = useDispatch();

  return (
    <div className={`${styles.checkboxBlock} ${!disabled ? styles.disabled : ""}`}>
      <input
        disabled={!disabled}
        type="checkbox"
        id={name}
        name={name}
        className={styles.checkbox}
        onClick={setCheckbox}
      />
      <label className={styles.label} for={name}>
        {name}
      </label>
    </div>
  );
};
