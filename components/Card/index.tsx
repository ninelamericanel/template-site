"use client";

import styles from "./index.module.scss";

const Card = ({ name, price, img }) => {
  return (
    <div className={styles.card}>
      <div>
        <Image src={img} />
      </div>
      <div className={styles.desc}>
        <p>{name}</p>
        <p>{price}</p>
      </div>
    </div>
  );
};

export default Card;
