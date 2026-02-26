"use client";

import { useState } from "react";
import BaseInput from "../BaseInput";
import Button from "../Button";
import styles from "../Modal/index.module.scss";
import Portal from "../Portal";
import { seasonMessage } from "../../app/utils/seasonMessage";

const arrayOfInputs = [
  {
    type: "textarea",
    name: "name",
    placeholder: "Имя",
    require: true,
    requireForSend: true,
  },
  {
    type: "email",
    placeholder: "Электронная почта",
    require: true,
    name: "email",
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    requireForSend: true,
  },
  {
    type: "tel",
    placeholder: "Номер телефона",
    require: true,
    name: "tel",
    pattern: /^\+7\d{10}$/,
    requireForSend: true,
  },
  { type: "date", placeholder: "Дата", require: true, name: "date", requireForSend: true },
  { type: "time", placeholder: "Время", require: true, name: "time", requireForSend: true },
  {
    type: "number",
    placeholder: "Количество персон",
    require: false,
    name: "personCount",
    requireForSend: true,
  },
  { type: "textarea", placeholder: "Дополнительные пожелания", require: false, name: "extra" },
];

const Modal = ({ id, func }) => {
  const [formData, setFormData] = useState({});
  const [sendData, setSendData] = useState(false);
  const onChange = (data, name) => {
    setFormData({ ...formData, [name]: data });
  };

  const checkData = () => {
    const keysFieldData = Object.keys(formData);

    const requiredInputs = arrayOfInputs.filter((input) => input.require);

    return requiredInputs.filter((input) => !keysFieldData.includes(input.name)).length === 0;
  };

  const onSubmit = () => {
    if (checkData()) {
      setSendData(true);
    }
  };

  console.log(formData);

  return (
    <Portal id={id}>
      <>
        <div className={styles.modal}>
          <div className={styles.closeButton}>
            <Button type="button" theme="dark" func={func} desc="X" />
          </div>
          {sendData ? (
            <div>{`{${formData.name}, вы зарезервировали столик на ${formData.personCount} персоны, в ${formData.time} ${formData.date}. Для подтверждения бронирования мы свяжемся по номеру ${formData.tel}, ${seasonMessage(formData.email)}}`}</div>
          ) : (
            <form className={styles.form} name="reserve">
              {arrayOfInputs.map(({ type, placeholder, require, name, pattern }) => (
                <BaseInput
                  pattern={pattern}
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  func={onChange}
                  required={require}
                />
              ))}

              <div className={styles.submitButton}>
                <Button
                  type="button"
                  buttonType="submit"
                  desc="Отправить заявку"
                  theme="dark"
                  submitFunc={onSubmit}
                />
              </div>
            </form>
          )}
        </div>
      </>
    </Portal>
  );
};

export default Modal;
