"use client";

import Image from "next/image";
import styles from "./index.module.scss";
import { ICake } from "../../data/data-shop";
// import bg from "../../src/assets/mainBg.png";

interface IProps {
  data: ICake;
}

const Card = ({ data }: IProps) => {
  const { photos, name, price } = data;
  return (
    <div className={styles.card}>
      <div className={styles.img}>
        {photos?.length ? (
          // <Image src={""} alt={name} fill />
          <div />
        ) : null}
      </div>
      <div className={styles.desc}>
        <p>{name}</p>
        <p>{price} RUB</p>
      </div>
    </div>
  );
};

export default Card;
