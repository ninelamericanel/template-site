"use client";
import { motion } from "framer-motion";
import parse from "html-react-parser";
import styles from "./index.module.scss";
import Button from "../Button";

const data = {
  h1: "Laduree Russia",
  desc: `Ресторан Ladur&eacute;e &agrave;-la Russe`,
  buttonDesc: "Перейти в магазин",
  link: "/shop",
};

export default function Hero() {
  return (
    <section className={`${styles.section}`}>
      {/* <motion.div initial={{ scale: 0 }} animate={{ scale: 1.2 }}> */}
      {/* <Image
        src={data.bg}
        className={styles.bg}
        alt="macarons background"
        width={100}
        height={100}
        sizes="100vw"
      /> */}
      {/* </motion.div> */}
      <div className={styles.content}>
        <div className={styles.textContent}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {data.h1}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            {parse(data.desc)}
          </motion.p>
        </div>
        <div className={styles.button}>
          <Button theme="light" type="link" href={data.link} desc={data.buttonDesc} />
        </div>
      </div>
    </section>
  );
}
