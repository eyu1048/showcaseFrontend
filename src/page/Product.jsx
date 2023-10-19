import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { BsHandThumbsUp } from "react-icons/bs";
import { BsHandThumbsDown } from "react-icons/bs";
import axios from "axios";

const Product = ({ data }) => {
  const { _id: id, name, price, description, files } = data;
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const [file, setFile] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const response = await axios.get(
        "https://showcasebackend.onrender.com/admin/favorites"
      );

      // console.log("response", response.data.data);
      setFavorites(response.data.data);
    };
    fetchFavorites();
  });

  const handleClick = () => {
    console.log("data " + data);
    // console.log(id, name, price);
    navigate(`/product/${id}`);
  };

  const checkFavorites = (id) => {
    const boolean = favorites.some((fav) => fav._id === id);
    return boolean;
  };

  const handleFavorites = async (data) => {
    console.log("thumbs up");
    // console.log(data);
    try {
      const response = await axios.post(
        "https://showcasebackend.onrender.com/admin/favorites",

        {
          data,
          // files: files,
        }
      );

      console.log("response", response.data);

      setFile(response.data.data.files);

      console.log("favorite", response.data.data);

      if (response.status === 200) {
        if (files) {
          try {
            console.log("file", files);

            const favoriteId = response.data.data._id;

            console.log("favoriteId" + favoriteId);
          } catch (error) {
            console.error(error);
          }
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const removeFavorites = async (id) => {
    console.log("ThumbsDown");

    try {
      const response = await axios.delete(
        `https://showcasebackend.onrender.com/admin/favorites/${id}`
      );

      console.log(response.data.data);
      setFavorites(response.data.data);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div className="product" key={id}>
      {/* <img src={productImage} /> */}
      <div className="description">
        {data.files.map((file) => {
          // console.log(file.path);
          return (
            <img
              src={`https://showcasebackend.onrender.com/admin/${file.path}`}
              onClick={handleClick}
            />
          );
        })}

        <div className="product-info">
          <div className="product-description">
            <div>
              <p className="product-p">{name}</p>
              <p>{price} birr</p>
            </div>
            {checkFavorites(id) ? (
              <button onClick={() => removeFavorites(id)}>
                <BsHandThumbsDown className="thumbs-up-icon" />
              </button>
            ) : (
              <button onClick={() => handleFavorites(data)}>
                <BsHandThumbsUp className="thumbs-up-icon" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
