import { cakes } from "../data/data-shop";

export const fetchProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cakes);
    }, 0);
  });
};
