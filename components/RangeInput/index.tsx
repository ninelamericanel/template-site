"use client";
import { useDispatch } from "react-redux";
import { setSubFilters } from "../../src/state/filterSlice";
import styles from "./index.module.scss";

interface IProps {
  minValue: number;
  maxValue: number;
  title: string;
  changedValue: number;
}

export const RangeInput = ({ minValue, maxValue, changedValue, title }: IProps) => {
  const dispatch = useDispatch();
  const step = 500;

  const onChangefunc = (v) => {
    dispatch(setSubFilters({ type: "price", value: v }));
  };

  return (
    <>
      <p>{title}</p>
      <div className={styles.subFilter}>
        <input
          type="range"
          min={minValue}
          max={maxValue}
          value={changedValue ? changedValue : minValue}
          step={step}
          onChange={(event) => onChangefunc(+event.target.value)}
          className={styles.input}
        />
        <div className={styles.values}>
          <span>{changedValue ? changedValue : minValue}</span>
          <span>{maxValue ? maxValue : null}</span>
        </div>
      </div>
    </>
  );
};
