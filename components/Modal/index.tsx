"use client";

import BaseInput from "../BaseInput";
import Button from "../Button";
import styles from "../Modal/index.module.scss";
import Portal from "../Portal";

const arrayOfButtons = [
  {
    type: "textarea",
    placeholder: "Имя",
  },
  { type: "email", placeholder: "Электронная почта" },
  { type: "tel", placeholder: "Номер телефона" },
  { type: "date", placeholder: "Дата" },
  { type: "time", placeholder: "Время" },
];

const Modal = ({ id, func }) => {
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Portal id={id}>
      <>
        <div className={styles.modal}>
          <div className={styles.closeButton}>
            <Button type="button" theme="dark" func={func} desc="X" />
          </div>

          <form className={styles.form} name="reserve">
            {arrayOfButtons.map(({ type, placeholder }) => (
              <BaseInput type={type} placeholder={placeholder} />
            ))}

            <div className={styles.submitButton}>
              <Button
                type="button"
                buttonType="submit"
                desc="Отправить заявку"
                theme="dark"
                submitFunc={(data) => onSubmit}
              />
            </div>
          </form>
        </div>
      </>
    </Portal>
  );
};

export default Modal;
