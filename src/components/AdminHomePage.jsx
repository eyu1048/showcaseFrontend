import nike from "../Assets/Nike.jpeg";
import shirts from "../Assets/shirts.jpeg";
import bags from "../Assets/bags.jpeg";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../components/imageslider.css";

const AdminHomePage = () => {
  const images = [bags, nike, shirts];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="image-slider-wrapper2">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index + 1}`} className="slide-img" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AdminHomePage;
