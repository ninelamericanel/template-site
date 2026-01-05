import styles from "./index.module.scss";

interface IButton {
  type: "link" | "button";
  href?: string;
  desc: string;
  theme?: "dark" | "light";
}

const Button = ({ type, href, desc, theme }: IButton) => {
  // "A man, a plan, a canal, Panama!"

  return type === "link" ? (
    <a href={href} className={styles.link}>
      {desc}
    </a>
  ) : (
    <div className={`${styles[theme]} ${styles.button}`}>
      <button type={type}>{desc}</button>
    </div>
  );
};

export default Button;
