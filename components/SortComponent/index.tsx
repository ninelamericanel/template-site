import styles from "./index.module.scss";

interface ISort {
  values: string[];
}

export const SortComponent = ({ values }: ISort) => {
  console.log("render sort", values);
  return (
    <div className={styles.block}>
      {values.map((item) => (
        <p className={styles.item}>{item}</p>
      ))}
    </div>
  );
};
