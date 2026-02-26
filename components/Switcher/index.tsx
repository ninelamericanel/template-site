import { useState } from "react";
import { MIN_PERSON } from "../../src/constants";

const Switcher = () => {
  const [numberInput, setNumberInput] = useState(MIN_PERSON);

  const counter = (action) => {
    if (action === "-") {
      if (numberInput >= MIN_PERSON) {
        setError(false);
        setNumberInput(numberInput - 1);
      } else {
        setError(true);
      }
    }

    if (action === "+") {
      if (numberInput <= MAX_PERSON) {
        setError(false);
        setNumberInput(numberInput + 1);
      } else {
        setError(true);
      }
    }
  };

  return (
    <>
      <div className={`${style.input} ${style.number}`}>
        <div className={style.button} onClick={() => counter("-")}>
          <p>-</p>
        </div>

        <input
          type={"number"}
          value={numberInput}
          min={MIN_PERSON}
          className={style.numberInput}
        ></input>
        <div className={style.button} onClick={() => counter("+")}>
          <p>+</p>
        </div>
      </div>
      {isError || numberInput < MIN_PERSON || numberInput > MAX_PERSON ? (
        <div className={style.error}>
          <p>Минимальное количество персон 1, максимально 20</p>
        </div>
      ) : null}
    </>
  );
};

export default Switcher;
