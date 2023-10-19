import React, { useState, useEffect } from "react";
import axios from "axios";
import "./product.css";
import Favorite from "./Favorite";
import Navbar from "../components/Navbar";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const response = await axios.get(
        "https://showcasebackend.onrender.com/admin/favorites"
      );

      console.log("response", response.data.data);
      setFavorites(response.data.data);
    };
    fetchFavorites();
  });
  return (
    <>
      <Navbar />
      <div>
        <div className="shopTitle">
          <h1>My Favorites</h1>
        </div>
        <div className="products">
          {favorites.map((product) => {
            return <Favorite data={product} favorites={favorites} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Favorites;
