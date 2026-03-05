"use client";

import { useEffect, useRef } from "react";
import { Button } from "../Button";
import styles from "../Modal/index.module.scss";
import Portal from "../Portal";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../src/state/modalSlice";
import { RootState } from "../../src/state/store";
import ReserveModal from "../ReseveModal";

const Modal = ({ id }) => {
  //
  const isModalOpen = useSelector((state: RootState) => state.modal.modalOpen);

  const modalRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleEvent = (event) => {
      if (!isModalOpen) return;
      if (modalRef.current && modalRef.current?.contains(event.target)) return;
      dispatch(toggleModal(""));
    };

    const handleEsc = (event) => {
      if (event.key === "Escape" && isModalOpen) {
        dispatch(toggleModal(""));
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

  const reserveModal = id === "reserve-location" ? <ReserveModal /> : null;

  return (
    <Portal id={id}>
      <>
        <div className={styles.modal} ref={modalRef}>
          <div className={styles.closeButton}>
            <Button type="button" theme="dark" func={() => dispatch(toggleModal(""))} desc="X" />
          </div>
          {reserveModal}
        </div>
      </>
    </Portal>
  );
};

export default Modal;
