"use client";

import { useEffect, useRef, useState } from "react";
import BaseInput from "../BaseInput";
import Button from "../Button";
import styles from "../Modal/index.module.scss";
import Portal from "../Portal";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../src/state/modalSlice";
import { RootState } from "../../src/state/store";

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

const Modal = ({ id }) => {
  const [formData, setFormData] = useState({});
  const [sendData, setSendData] = useState(true);
  const isModalOpen = useSelector((state: RootState) => state.modal.modalOpen);
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const onChange = (data, name) => {
    setFormData({ ...formData, [name]: data });
  };

  useEffect(() => {
    const handleEvent = (event) => {
      if (!isModalOpen) return;
      if (modalRef.current && modalRef.current?.contains(event.target)) return;
      dispatch(toggleModal());
    };

    const handleEsc = (event) => {
      if (event.key === "Escape" && isModalOpen) {
        dispatch(toggleModal());
      }
    };
    if (!isModalOpen) return;

    if (isModalOpen) {
      document.body.addEventListener("click", handleEvent);
      document.body.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.body.removeEventListener("click", handleEvent);
      document.body.removeEventListener("keydown", handleEsc);
    };
  }, [isModalOpen]);

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

  return (
    <Portal id={id}>
      <>
        <div className={styles.modal} ref={modalRef}>
          <div className={styles.closeButton}>
            <Button type="button" theme="dark" func={() => dispatch(toggleModal())} desc="X" />
          </div>
          {sendData ? (
            <div className={styles.sendMessage}>
              <p>
                <span>{formData.name}</span>
                {`, вы зарезервировали столик на `} <span>{formData.personCount}</span>{" "}
                {`персоны, в `}
                <span>
                  {formData.time} {formData.date}
                </span>{" "}
                {`.`}
              </p>
              <div>
                <p>
                  {`Для подтверждения бронирования мы свяжемся по номеру `}{" "}
                  <span>{formData.tel}</span> {`,`}
                </p>
                <p>
                  {`а на почтовый ящик `} <span>{formData.email}</span>{" "}
                  {`вышлем сообщение с новинками этого сезона`}
                </p>
              </div>
            </div>
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
                <Button type="submit" desc="Отправить заявку" theme="dark" func={onSubmit} />
              </div>
            </form>
          )}
        </div>
      </>
    </Portal>
  );
};

export default Modal;
