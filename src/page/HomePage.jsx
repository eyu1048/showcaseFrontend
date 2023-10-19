import React from "react";
import Navbar from "../components/Navbar";
import Products from "../page/Products";
import img1 from "../Assets/b1.jpeg";
import img2 from "../Assets/b3.jpeg";
import img3 from "../Assets/f5.jpeg";
import img4 from "../Assets/f6.jpeg";
import img5 from "../Assets/f7.jpeg";
import nike from "../Assets/Nike.jpeg";
import bags from "../Assets/bags.jpeg";
import shirts from "../Assets/shirts.jpeg";
import ImageSlider from "../components/ImageSlider";

const HomePage = () => {
  const images = [nike, img2, bags, shirts];
  return (
    <div>
      <Navbar />
      <ImageSlider images={images} />
      <Products />
    </div>
  );
};

export default HomePage;
