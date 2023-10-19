import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./detail.css";
import Navbar from "./Navbar";

const ProductDetails = () => {
  const [products, setProducts] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/admin/product/${id}`
        );
        console.log(JSON.stringify(response.data.data));
        setProducts(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
    console.log("products" + products);
  }, [id]);
  if (!products) {
    return <div>Loading...</div>;
  }

  const { _id, name, price, description, files } = products;

  return (
    <>
      <Navbar />
      <div className="productDetails-container" key={_id}>
        {files.map((file) => {
          console.log(file.path);
          const imageUrl = `http://localhost:3001/admin/${file.path}`;
          console.log("imageUrl" + imageUrl);
          return (
            <img key={file} src={imageUrl} alt={name} className="file-img" />
          );
        })}
        <div className="productDetails-info">
          <p>Name: {name}</p>
          <p>Price: {price}</p>
          <p>Description: {description}</p>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
