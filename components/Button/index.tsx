"use client";

import styles from "./index.module.scss";

interface IButton {
  type: "link" | "button";
  href?: string;
  desc: string;
  theme?: "dark" | "light";
  func: () => void;
  buttonType?: "submit" | "button";
}

const Button = ({ type, href, desc, theme, func, buttonType = "button" }: IButton) => {
  // "A man, a plan, a canal, Panama!"

  return type === "link" ? (
    <a href={href} className={`${theme ? styles[theme] : ""} ${styles.link}`}>
      {desc}
    </a>
  ) : (
    <div className={`${theme ? styles[theme] : ""} ${styles.button}`} onClick={func}>
      <button type={buttonType}>{desc}</button>
    </div>
  );
};

export default Button;
