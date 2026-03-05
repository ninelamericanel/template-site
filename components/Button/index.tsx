"use client";

import styles from "./index.module.scss";

interface IButton {
  desc: string;
  theme?: "dark" | "light";
  func: () => void;
  type?: "submit" | "button";
  testId: string;
  disabled: boolean;
}

export const Button = ({
  desc,
  theme = "light",
  func,
  type = "button",
  testId,
  disabled = false,
}: IButton) => {
  // "A man, a plan, a canal, Panama!"
  return (
    <button
      type={type}
      className={`${theme ? styles[theme] : ""} ${styles.button} ${disabled ? styles.disabled : ""}`}
      onClick={func}
      data-testId={testId}
      disabled={disabled}
    >
      {desc}
    </button>
  );
};

export const ButtonLink = ({ theme = "light", href, desc, testId }) => {
  return (
    <a href={href} className={`${theme ? styles[theme] : ""} ${styles.link}`} data-testId={testId}>
      {desc}
    </a>
  );
};
