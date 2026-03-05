"use client";
import { ButtonLink } from "../Button";
import styles from "./index.module.scss";

const data = {
  title: "Журнал ресторана",
  buttonCreate: "Разместить статью",
};

const NewsSection = () => {
  return (
    <section className={styles.newsSection}>
      <div className={styles.mainBlock}>
        <h2 className={styles.title}>{data.title}</h2>
        <ButtonLink theme="light" href="/news" desc={data.buttonCreate} />
      </div>
      <div></div>
    </section>
  );
};

export default NewsSection;
