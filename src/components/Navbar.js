import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [showNavbarItems, setShowNavbarItems] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["access_token"]);

  const toggleNavbarItems = () => {
    setShowNavbarItems(!showNavbarItems);
  };
  return (
    <header>
      <div className="navbar-containers">
        <div className="navbar-brands">
          <h2 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            PRODUCTS
          </h2>
        </div>
        <div className={`navbar-item ${showNavbarItems ? "show" : ""}`}>
          <Link to="/about" className="navbar-links">
            About Us
          </Link>
          <Link to="/contact" className="navbar-links">
            Contact
          </Link>
          <Link to="/favorites" className="navbar-links">
            My Favorites
          </Link>
          <Link
            to={cookies.access_token ? "/admin" : "/adminRegister"}
            className="navbar-links"
          >
            Admin
          </Link>
        </div>
        <div className="humburger-icon" onClick={toggleNavbarItems}>
          {showNavbarItems ? <IoMdClose /> : <GiHamburgerMenu />}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
