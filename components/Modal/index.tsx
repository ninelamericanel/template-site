"use client";

import { useState } from "react";
import BaseInput from "../BaseInput";
import Button from "../Button";
import styles from "../Modal/index.module.scss";
import Portal from "../Portal";

const arrayOfButtons = [
  {
    type: "textarea",
    name: "name",
    placeholder: "Имя",
    require: true,
  },
  {
    type: "email",
    placeholder: "Электронная почта",
    require: true,
    name: "email",
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  {
    type: "tel",
    placeholder: "Номер телефона",
    require: true,
    name: "tel",
    pattern: /^\+7\d{10}$/,
  },
  { type: "date", placeholder: "Дата", require: true, name: "date" },
  { type: "time", placeholder: "Время", require: true, name: "time" },
];

const Modal = ({ id, func }) => {
  const [formData, setFormData] = useState({});
  const [sendData, setSendData] = useState(false);
  const [isError, setError] = useState(false);
  const onChange = (data, name) => {
    setFormData({ ...formData, [name]: data });
  };

  const onSubmit = () => {
    console.log(formData);
    setSendData(true);
  };

  const onError = (message) => {
    setError(message);
  };

  return (
    <Portal id={id}>
      <>
        <div className={styles.modal}>
          <div className={styles.closeButton}>
            <Button type="button" theme="dark" func={func} desc="X" />
          </div>
          {sendData ? (
            <div>Thanks for reserve</div>
          ) : (
            <form className={styles.form} name="reserve">
              {arrayOfButtons.map(({ type, placeholder, require, name, pattern }) => (
                <div>
                  <BaseInput
                    pattern={pattern}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    func={onChange}
                    required={require}
                  />
                </div>
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
