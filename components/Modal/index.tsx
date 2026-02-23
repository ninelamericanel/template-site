import BaseInput from "../BaseInput";
import Button from "../Button";
import styles from "../Modal/index.module.scss";
import Portal from "../Portal";

const Modal = ({ id, func }) => {
  return (
    <Portal id={id}>
      <>
        <div className={styles.modal}>
          <div className={styles.closeButton}>
            <Button type="button" theme="dark" func={func} desc="X" />
          </div>

          <form className={styles.form}>
            <BaseInput type={"textarea"} placeholder={"Имя"} />
            <BaseInput type={"email"} placeholder={"Электронная почта"} />
            <BaseInput type={"tel"} placeholder={"Номер телефона"} />
            <BaseInput type={"date"} placeholder={"Дата"} />
            <BaseInput type={"time"} placeholder={"Время"} />

            <div className={styles.submitButton}>
              <Button type="button" buttonType="submit" desc="Отправить заявку" theme="dark" />
            </div>
          </form>
        </div>
      </>
    </Portal>
  );
};

export default Modal;
