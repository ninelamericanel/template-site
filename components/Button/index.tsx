import styles from "./index.module.scss";

interface IButton {
  type: "link" | "button";
  href?: string;
  desc: string;
  theme?: "dark" | "light";
}

const Button = ({ type, href, desc, theme }: IButton) => {
  // "A man, a plan, a canal, Panama!"

  const button =
    type === "link" ? (
      <a href={href} className={styles.link}>
        {desc}
      </a>
    ) : (
      <button type={type}>{desc}</button>
    );
  return <div className={`${styles[theme]} ${styles.button}`}>{button}</div>;
};

export default Button;
