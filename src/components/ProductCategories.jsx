import React from "react";
import "./category.css";
import { useGlobalContext } from "../context";

const ProductCategories = () => {
  const { filteredProducts } = useGlobalContext();
  const handleCategory = (category) => {
    filteredProducts(category);
  };

  return (
    <div className="product_category">
      <span className="category_items" onClick={() => handleCategory(null)}>
        All
      </span>
      <span className="category_items" onClick={() => handleCategory("SHOES")}>
        SHOES
      </span>
      <span className="category_items" onClick={() => handleCategory("BAGS")}>
        BAGS
      </span>
      <span
        className="category_items"
        onClick={() => handleCategory("CLOTHES")}
      >
        CLOTHES
      </span>
      <span
        className="category_items"
        onClick={() => handleCategory("ELECTRONICS")}
      >
        ELECTRONICS
      </span>
    </div>
  );
};

export default ProductCategories;
