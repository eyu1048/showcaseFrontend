import React from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar_log = () => {
  const navigate = useNavigate();
  return (
    <header>
      <div className="navbar-containers">
        <div className="navbar-brands">
          <h2 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            PRODUCTS
          </h2>
        </div>
      </div>
    </header>
  );
};

export default Navbar_log;
