"use client";

import { ReactElement, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface IProps {
  id: string;
  children: ReactElement;
}

const Portal = ({ id, children }: IProps) => {
  const [container, setContainer] = useState(null);

  useEffect(() => {
    if (id) {
      const portalContainer = document.body;
      setContainer(portalContainer);
    }
  }, []);
  return container ? createPortal(children, container, id) : null;
};

export default Portal;
