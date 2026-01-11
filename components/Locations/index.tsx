"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import styles from "./index.module.scss";

import location1 from "../../src/assets/location1.png";
import location2 from "../../src/assets/location2.png";
import Button from "../Button";
import { motion, useInView } from "framer-motion";
import parse from "html-react-parser";

const data = [
  {
    id: "block1",
    title: parse("Ресторан Ladur&eacute;e &agrave;-la Russe на&nbsp;Никольской"),
    description: parse(
      "Интерьер La&nbsp;Dur&eacute;e вдохновлён театральной эстетикой &laquo;Русских сезонов&raquo; Сергея Дягилева и&nbsp;эскизами Льва Бакста. Французская лёгкость и&nbsp;русское вдохновение сплетаются здесь в&nbsp;пространстве, где каждый десерт&nbsp;&mdash; маленькое представление."
    ),
    // img: location1,
  },
  {
    id: "block2",
    title: parse("Бутик на&nbsp;Малой Бронной"),
    description: "",
    // img: location2
  },
];

const Location = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false });
  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.imageWrapper}>
        {/* <Image src={data[0].img} alt={data[0].title} fill className={styles.img} /> */}
      </div>
      <div className={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.5 }}
          className={styles.textContent}
        >
          {/* <div className={styles.textContent}> */}
          <p>{data[0].description}</p>
          <h2>{data[0].title}</h2>
          {/* </div> */}
        </motion.div>
        <motion.div
          className={styles.buttons}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 2 }}
        >
          <Button type="button" desc="Забронировать столик" theme="light" />
          <Button type="button" desc="Адрес" theme="light" />
        </motion.div>
      </div>
    </section>
  );
};

export default Location;
