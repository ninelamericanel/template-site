"use client";
import Hero from "../components/Hero/Hero";
import BannerSlider from "../components/BannerSlider/BannerSlider";
import Locations from "../components/Locations";
import Features from "../components/Features";
import NewsSection from "../components/NewsSection";
import Modal from "../components/Modal";
import { RootState } from "../src/state/store";
import { useSelector } from "react-redux";

export default function Home() {
  const isModalOpen = useSelector((state: RootState) => state.modal.modalOpen);
  const isModalName = useSelector((state: RootState) => state.modal.modalID);
  return (
    <>
      <Hero />
      <BannerSlider />
      <div className="main-location">
        <Locations />
        <Locations />
        <Locations />
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
