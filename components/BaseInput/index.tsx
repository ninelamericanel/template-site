import { useState } from "react";
import style from "./index.module.scss";
import { motion } from "framer-motion";

interface IProps {
  type: string;
  placeholder: string;
  required: boolean;
  func: (value: string, name: string) => void;
  name: string;
  pattern?: string;
  errorFunc?: (message: string) => void;
}

const BaseInput = ({ type, placeholder, required = false, func, name, pattern }: IProps) => {
  const [isFocused, setFocused] = useState(false);
  const [isError, setError] = useState(false);
  const [isInfoError, setInfoError] = useState("");
  const alwaysPlaceholder = type === "date" || type === "time";

  console.log(isFocused);

  return (
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
          <p>Некорректно заполненное поле</p>
          <span className={style.infoError} onClick={() => setInfoError(type)}>
            ?
          </span>
        </div>
      ) : null}
    </>
  );
};

export default BaseInput;
