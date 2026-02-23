"use client";
import Hero from "../components/Hero/Hero";
import BannerSlider from "../components/BannerSlider/BannerSlider";
import Locations from "../components/Locations";
import Features from "../components/Features";
import PreviewShop from "../components/PreviewShop";
import MainPreviewShop from "../components/MainPreviewShop";
import NewsSection from "../components/NewsSection";

export default function Home() {
  return (
    <>
      <Hero />
      <BannerSlider />
      <div className="main-location">
        <Locations />
        <Locations />
        <Locations />
      </div>
      <PreviewShop>
        <MainPreviewShop />
      </PreviewShop>
      <NewsSection />
      <Features />
    </>
  );
}
