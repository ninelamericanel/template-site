import { useState } from "react";
import style from "./index.module.scss";
import { motion } from "framer-motion";
import Button from "../Button";
import { MAX_PERSON, MIN_PERSON } from "../../src/constants";

interface IProps {
  type: string;
  placeholder: string;
  required: boolean;
  func: (value: string, name: string) => void;
  name: string;
  pattern?: string;
  errorFunc?: (message: string) => void;
}

const messageInput = (type) => {
  switch (type) {
    case "email":
      return `Email должен содержать символ @`;
    case "tel":
      return `Номер телефона должен начинаться с + и иметь 10 символов`;
    case "name":
      return `Введите имя`;
    case "date":
      return `Выберите дату`;
    case "time":
      return `Выберите время`;
  }
};

const BaseInput = ({ type, placeholder, required = false, func, name, pattern }: IProps) => {
  const [isFocused, setFocused] = useState(false);
  const [isError, setError] = useState(false);
  const [isInfoError, setInfoError] = useState("");
  const [numberInput, setNumberInput] = useState(MIN_PERSON);
  const alwaysPlaceholder = type === "date" || type === "time";

  console.log(isFocused);

  const countPerson = (action) => {
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

  const countInput = (
    <>
      <div className={`${style.input} ${style.number}`}>
        <div className={style.button} onClick={() => countPerson("-")}>
          <p>-</p>
        </div>

        <input
          type={"number"}
          value={numberInput}
          min={MIN_PERSON}
          className={style.numberInput}
        ></input>
        <div className={style.button} onClick={() => countPerson("+")}>
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

  return (
    <>
      {type === "number" ? (
        countInput
      ) : (
        <>
          <div className={`${style.input} ${isError ? style.inputError : ""}`}>
            <input
              name={name}
              required={required}
              type={type}
              placeholder={!isFocused ? placeholder : ""}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onChange={(event) => {
                setError(false);
                if (event.target.value.match(pattern)) {
                  func(event.target.value, name);
                } else {
                  setError(true);
                }
              }}
            ></input>
            {isFocused || alwaysPlaceholder ? (
              <motion.span
                className={`${style.placeholderMin} ${isError ? style.error : ""}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {placeholder}
              </motion.span>
            ) : null}
          </div>
          {isError ? (
            <div className={style.error}>
              <p>
                Проверьте правильность введенных данных <span className={style.infoError}>?</span>
              </p>

              {isFocused ? (
                <motion.span
                  className={style.tooltip}
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {messageInput(name)}
                </motion.span>
              ) : null}
            </div>
          ) : null}
        </>
      )}
    </>
  );
};

export default BaseInput;
