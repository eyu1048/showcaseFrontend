import React, { useState, useEffect } from "react";
import axios from "axios";
import "./product.css";
import Product from "./Product";
import ProductCategories from "../components/ProductCategories";
import { useGlobalContext } from "../context";

const App = () => {
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:3001/admin/viewProduct"
  //       );

  //       console.log(response.data.data);
  //       setProducts(response.data.data);
  //     } catch (ex) {
  //       console.log(ex);
  //     }
  //   };
  //   fetchProducts();
  // }, []);

  const { products, selectedCategory } = useGlobalContext();

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.type === selectedCategory)
    : products;

  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>BabiChulo Shop</h1>
      </div>
      <ProductCategories />
      <div className="products">
        {filteredProducts.length === 0 ? (
          <div
          // style={{
          //   display: flex,
          //   alignItems: center,
          //   justifyContent: center,
          // }}
          >
            No products found for the selected category.
          </div>
        ) : (
          filteredProducts.map((product) => <Product data={product} />)
        )}
      </div>
      {/* <div className="products">
        {filteredProducts.map((product) => {
          return <Product data={product} />;
        })}
      </div> */}
    </div>
  );
};

export default App;
