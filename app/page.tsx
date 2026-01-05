"use client";
import Hero from "../components/Hero/Hero";
import BannerSlider from "../components/BannerSlider/BannerSlider";
import Locations from "../components/Locations";
import Features from "../components/Features";
import PreviewShop from "../components/PreviewShop";

export default function Home() {
  return (
    <>
      <Hero />
      <BannerSlider />
      <div>
        <Locations />
        <Locations />
        <Locations />
      </div>
      <PreviewShop />
      <Features />
    </>
  );
}
