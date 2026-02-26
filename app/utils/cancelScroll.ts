export const cancelScroll = (disable = false) => {
  const body = document.body;
  const header = document.getElementsByTagName("header");
  const footer = document.getElementsByTagName("footer");
  const main = document.getElementsByTagName("main");
  const content = [...header, ...footer, ...main];
  if (disable) {
    body.classList.add("disable");
    content.forEach((item) => item.classList.add("disable-content"));
  }
  if (!disable) {
    body.classList.remove("disable");
    content.forEach((item) => item.classList.remove("disable-content"));
  }
};
