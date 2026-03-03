import { cakes } from "../data/data-shop";

export const fetchProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cakes);
    }, 0);
  });
};

export const sendEmailMessage = async (email, name) => {
  const response = await fetch("https://localhost:3001/api/send-email", {
    method: "post",
    headers: {
      "Content-Type": "aplication/json",
    },
    body: JSON.stringify({ email, name }),
  });

  const result = await response.json();

  if (result.ok) return result.message;
  if (result.error) return result.error;
};
