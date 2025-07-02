import React from "react";
import { FaBell, FaRegUserCircle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdMessage } from "react-icons/md";
import ShopDropdown from "./ShopdropdownHeader";
import Logo from "../assets/logo_MarioCart.png";

import "./style/header.css";

 function Header({ toggleSidebar }) {
  return (
    <header className="admin-header">
      <div className="open-menu" onClick={toggleSidebar}>
        <RxHamburgerMenu className="icon" />
      </div>
      <div className="logo-container">
        <img src={Logo} alt="Mario Kart Logo" className="logo" />
      </div>

      <div className="header-icons">
        <MdMessage className="icon" />
        <FaBell className="icon" />
        <FaRegUserCircle className="icon" />
      </div>
      <div className="shop-dropdown">
        <ShopDropdown />
      </div>
    </header>
  );
}

export default Header;