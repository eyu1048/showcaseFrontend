import React from "react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          // "http://localhost:3001/admin/viewProduct"
          "https://showcasebackend.onrender.com/admin/viewProduct"
        );

        console.log(response.data.data);
        setProducts(response.data.data);
      } catch (ex) {
        console.log(ex);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = (category) => {
    setSelectedCategory(category);
  };

  return (
    <AppContext.Provider
      value={{ products, filteredProducts, selectedCategory }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext };
