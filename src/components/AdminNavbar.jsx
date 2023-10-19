import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { useHistory } from "history";
import "./navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const AdminNavbar = () => {
  const [showNavbarItems, setShowNavbarItems] = useState(false);
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  // const history = useHistory();

  const toggleNavbarItems = () => {
    setShowNavbarItems(!showNavbarItems);
  };

  const Logout = () => {
    console.log(cookies);
    setCookies("access_token", "");
    navigate("/adminLogin", { replace: true });
    // history.replace("/adminLogin");
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
          <Link to="/create" className="navbar-links">
            Create Products
          </Link>
          <Link to="/view" className="navbar-links">
            View Products
          </Link>
          {/* <Link className="navbar-links"> */}
          <button className="btn btn-primary btn-sm" onClick={Logout}>
            Logout
          </button>
          {/* </Link> */}
        </div>
        <div className="humburger-icon" onClick={toggleNavbarItems}>
          {showNavbarItems ? <IoMdClose /> : <GiHamburgerMenu />}
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
