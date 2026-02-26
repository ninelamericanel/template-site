import { useState } from "react";
import { MAX_PERSON, MIN_PERSON } from "../../src/constants";
import style from "../Switcher/index.module.scss";

const Switcher = () => {
  const [numberInput, setNumberInput] = useState(MIN_PERSON);

  const counter = (action) => {
    if (numberInput > MIN_PERSON) {
      setNumberInput(numberInput - 1);
    }

    if (numberInput < MAX_PERSON) {
      setNumberInput(numberInput + 1);
    }
  };

  return (
    <div className={style.switcher}>
      <div className={`${style.input} ${style.number}`}>
        <div className={style.button} onClick={() => counter("-")}>
          <p>-</p>
        </div>

        <input
          type={"number"}
          value={numberInput}
          min={MIN_PERSON}
          max={MAX_PERSON}
          className={style.numberInput}
        ></input>
        <div className={style.button} onClick={() => counter("+")}>
          <p>+</p>
        </div>
      </div>
      <p className={style.description}>Минимальное количество персон 1, максимально 20</p>
    </div>
  );
};

export default Switcher;
