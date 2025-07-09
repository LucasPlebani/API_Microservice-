import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiBox, FiUsers, FiSettings } from "react-icons/fi";
import { MdOutlineSell } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";

import { TfiStatsUp } from "react-icons/tfi";


import "./style/Sidebar.css";

function Sidebar({ isOpen }) {
  

  return (
    <nav className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      <ul>
        <li>
          <NavLink to="/shop/dashboard">
            <FiHome className="icon" />
            {isOpen && <span>Tableau de bord</span>}
          </NavLink>
        </li>
        <li>
        
          <NavLink to="/shop/dashboard/products">
            <FiBox className="icon" />
            {isOpen && <span>Produits</span>}
          </NavLink>
        </li>
          <li>
           <NavLink to="/promotion">
            <MdOutlineSell className="icon" />
            {isOpen && <span>promotions</span>}
          </NavLink>
        </li>
        <li>
           <NavLink to="/analytics">
            <TfiStatsUp className="icon" />
            {isOpen && <span>Statistiques</span>}
          </NavLink>
        </li>
        <li>
           <NavLink to="/orders">
            <CiDeliveryTruck className="icon" />
            {isOpen && <span>commande</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/users">
            <FiUsers className="icon" />
            {isOpen && <span>Utilisateurs</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings">
            <FiSettings className="icon" />
            {isOpen && <span>Paramètres</span>}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;

