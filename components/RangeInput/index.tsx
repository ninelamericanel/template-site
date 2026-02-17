import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../src/state/store";
import styles from "./index.module.scss";

interface IProps {
  minValue: number;
  maxValue: number;
  title: string;
}

function roundToStep(number, step) {
  return Math.round(number / step) * step;
}

export const RangeInput = ({ minValue, maxValue, title }: IProps) => {
  const step = 500;
  const averageValue = roundToStep(Math.floor((minValue + maxValue) / 2), step);
  const [value, setValue] = useState(averageValue);

  return (
    <>
      <p>{title}</p>
      <div className={styles.subFilter}>
        <input
          type="range"
          min={minValue}
          max={maxValue}
          value={value}
          step={step}
          onChange={(event) => setValue(+event.target.value)}
          className={styles.input}
        />
        <div className={styles.values}>
          <span>{value}</span>
          <span>{maxValue ? maxValue : value}</span>
        </div>
      </div>
    </>
  );
};
