"use client";

import styles from "./index.module.scss";

interface IButton {
  type: "link" | "button";
  href?: string;
  desc: string;
  theme?: "dark" | "light";
  func: () => void;
  testId?: string;
  disabled?: boolean;
}

const Button = ({ type, href, desc, theme, func }: IButton) => {
  // "A man, a plan, a canal, Panama!"

  return type === "link" ? (
    <a href={href} className={`${theme ? styles[theme] : ""} ${styles.link}`}>
      {desc}
    </a>
  ) : (
    <button
      type={buttonType}
      className={`${theme ? styles[theme] : ""} ${styles.button}`}
      onClick={func}
    >
      {desc}
    </button>
  );
};

export default Button;
