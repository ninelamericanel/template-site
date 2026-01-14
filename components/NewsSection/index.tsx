"use client";
import Button from "../Button";
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
        <Button theme="light" type="link" href="/news" desc={data.buttonCreate} />
      </div>
      <div></div>
    </section>
  );
};

export default NewsSection;
