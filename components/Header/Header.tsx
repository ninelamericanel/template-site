"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import styles from "../Header/Header.module.scss";

export default function bHeader() {
  const ref = useRef(null);

  // Отслеживаем позицию скролла относительно нашего элемента
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Прозрачность логотипа (исчезает при скролле вниз)
  const logoOpacity = useTransform(
    scrollYProgress,
    [0, 0.4], // от 0 до 30% скролла
    [1, 0] // от 100% до 0% прозрачности
  );

  // Появление меню (появляется после скролла > 30%)
  const menuOpacity = useTransform(
    scrollYProgress,
    [0.4, 1], // от 30% до 50% скролла
    [0, 1] // от 0% до 100% прозрачности
  );

  return (
    <header ref={ref} className={styles.header}>
      {/* Логотип (плавно исчезает) */}
      <div className={styles.logoBlock}>
        <motion.div
          style={{
            opacity: logoOpacity,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <h1>Логотип</h1>
        </motion.div>
      </div>

      {/* Меню (плавно появляется) */}
      <motion.div
        style={{
          opacity: menuOpacity,
        }}
      >
        <div className={styles.secondHeader}>
          <h1>Логотип</h1>
          <nav className={styles.nav}>
            <a href="#">Главная</a>
            <a href="#">О нас</a>
            <a href="#">Контакты</a>
          </nav>
        </div>
      </motion.div>
    </header>
  );
}
