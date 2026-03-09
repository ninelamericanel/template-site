"use client";

import parse from "html-react-parser";
import Hero from "../components/Hero/Hero";
import BannerSlider from "../components/BannerSlider/BannerSlider";
import Locations from "../components/Locations";
import Features from "../components/Features";
import NewsSection from "../components/NewsSection";
import Modal from "../components/Modal";
import { RootState } from "../src/state/store";
import { useSelector } from "react-redux";

const data = [
  {
    id: "block1",
    title: parse("Ресторан на Гоголя"),
    description: parse("Описание локации"),
    // img: location1,
  },
  {
    id: "block2",
    title: parse("Бутик на&nbsp;Малой Бронной"),
    description: "",
    // img: location2
  },
  {
    id: "block3",
    title: parse("Бутик на&nbsp;Малой Бронной"),
    description: "",
    // img: location2
  },
];

export default function Home() {
  const isModalOpen = useSelector((state: RootState) => state.modal.modalOpen);
  const isModalName = useSelector((state: RootState) => state.modal.modalID);
  return (
    <>
      <Hero />
      <BannerSlider />
      <div className="main-location">
        <Locations data={data[0]} />
        <Locations data={data[1]} />
        <Locations data={data[2]} />
      </div>
      {/* <PreviewShop>
        <MainPreviewShop />
      </PreviewShop> */}
      <NewsSection />
      <Features />
      {isModalOpen ? <Modal id={isModalName} /> : null}
    </>
  );
}
