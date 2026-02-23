import { useState } from "react";
import style from "./index.module.scss";
import { motion } from "framer-motion";

const BaseInput = ({ type, placeholder, required = false }) => {
  const [isFocused, setFocused] = useState(false);
  const alwaysPlaceholder = type === "date" || type === "time";

  console.log(isFocused);

  return (
    <div className={style.input}>
      <input
        required={required}
        type={type}
        placeholder={!isFocused ? placeholder : ""}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      ></input>
      {isFocused || alwaysPlaceholder ? (
        <motion.span
          className={style.placeholderMin}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {placeholder}
        </motion.span>
      ) : // (
      // <motion.p
      //   className={style.placeholder}
      //   initial={{ opacity: 0 }}
      //   animate={{ opacity: 1 }}
      //   exit={{ opacity: 0 }}
      // >
      //   {placeholder}
      // </motion.p>
      // )
      null}
    </div>
  );
};

export default BaseInput;
