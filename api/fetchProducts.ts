import { cakes } from "../data/data-shop";

export const fetchProducts = () => {
  return setTimeout(() => {
    console.log(cakes);
    return cakes;
  }, 0);
};
