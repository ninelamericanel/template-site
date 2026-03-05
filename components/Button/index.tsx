"use client";

import styles from "./index.module.scss";

interface IButton {
  desc: string;
  theme?: "dark" | "light";
  func: () => void;
  type?: "submit" | "button";
}

export const Button = ({ desc, theme = "light", func, type = "button" }: IButton) => {
  // "A man, a plan, a canal, Panama!"
  return (
    <button type={type} className={`${theme ? styles[theme] : ""} ${styles.button}`} onClick={func}>
      {desc}
    </button>
  );
};

export const ButtonLink = ({ theme = "light", href, desc }) => {
  return (
    <a href={href} className={`${theme ? styles[theme] : ""} ${styles.link}`}>
      {desc}
    </a>
  );
};
