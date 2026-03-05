import { useState } from "react";
import { reserveInputs } from "../../src/constants";
import styles from "./index.module.scss";
import BaseInput from "../BaseInput";
import { Button } from "../Button";

const ReserveModal = ({}) => {
  const [formData, setFormData] = useState({});
  const [sendData, setSendData] = useState(false);
  const onChange = (data, name) => {
    setFormData({ ...formData, [name]: data });
  };

  const checkData = () => {
    const keysFieldData = Object.keys(formData);

    const requiredInputs = reserveInputs.filter((input) => input.require);

    return requiredInputs.filter((input) => !keysFieldData.includes(input.name)).length === 0;
  };

  const onSubmit = () => {
    if (checkData()) {
      setSendData(true);
    }
  };
  return (
    <>
      {" "}
      {sendData ? (
        <div className={styles.sendMessage}>
          <p>
            <span>{formData.name}</span>
            {`, вы зарезервировали столик на `} <span>{formData.personCount}</span> {`персоны, в `}
            <span>
              {formData.time} {formData.date}
            </span>{" "}
            {`.`}
          </p>
          <div>
            <p>
              {`Для подтверждения бронирования мы свяжемся по номеру `} <span>{formData.tel}</span>{" "}
              {`,`}
            </p>
            <p>
              {`а на почтовый ящик `} <span>{formData.email}</span>{" "}
              {`вышлем сообщение с новинками этого сезона`}
            </p>
          </div>
        </div>
      ) : (
        <form className={styles.form} name="reserve">
          {reserveInputs.map(({ type, placeholder, require, name, pattern }) => (
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
    </>
  );
};

export default ReserveModal;
