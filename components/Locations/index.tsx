"use client";
import { useEffect, useRef } from "react";
import styles from "./index.module.scss";
import Button from "../Button";
import { motion, useInView } from "framer-motion";
import parse from "html-react-parser";
import Modal from "../Modal";
import { cancelScroll } from "../../app/utils/cancelScroll";
import { toggleModal } from "../../src/state/modalSlice";
import { RootState } from "../../src/state/store";
import { useDispatch, useSelector } from "react-redux";

const data = [
  {
    id: "block1",
    title: parse("Ресторан на Гоголя"),
    description: parse("Описание локации"),
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
  const isModalOpen = useSelector((state: RootState) => state.modal.modalOpen);
  const dispatch = useDispatch();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false });

  useEffect(() => {
    cancelScroll(isModalOpen);
  }, [isModalOpen]);

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
          <Button
            type="button"
            desc="Забронировать столик"
            theme="light"
            func={() => dispatch(toggleModal("reserve-location"))}
            testId="button-reserve"
          />
          <Button type="button" desc="Адрес" theme="light" func={() => console.log("adresses")} />
        </motion.div>
      </div>
    </section>
  );
};

export default Location;
