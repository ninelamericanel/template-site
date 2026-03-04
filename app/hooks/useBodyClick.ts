import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useBodyClick = (callback) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClick = (event) => {
      if (callback) {
        callback(event, dispatch);
      }
    };

    document.body.addEventListener("click", handleClick);
    return () => document.body.removeEventListener("click", handleClick);
  }, [callback, dispatch]);
};
