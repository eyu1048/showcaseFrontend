import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import axios from "axios";

const Favorite = ({ data, favorites }) => {
  const { _id: id, name, price, description, files } = data;
  const navigate = useNavigate();

  const removeFavorites = async (id) => {
    try {
      const response = await axios.delete(
        `https://showcasebackend.onrender.com/admin/favorites/${id}`
      );

      console.log(response.data.data);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div className="product" key={id}>
      {favorites.length > 0 ? (
        <div className="description">
          {files.map((file) => {
            // console.log(file.path);
            return (
              <img
                src={`https://showcasebackend.onrender.com/admin/${file.path}`}
                onClick={() => navigate(`/product/${id}`)}
              />
            );
          })}
          <div className="product-info">
            <div className="product-description">
              <div>
                <p className="product-p">{name}</p>
                <p>{price} birr</p>
              </div>
              <button onClick={() => removeFavorites(id)}>
                <IoMdClose />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty">
          <h2>No Favorites found</h2>
        </div>
      )}
    </div>
  );
};

export default Favorite;
