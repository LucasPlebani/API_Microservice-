import {React, UseState} from "react";

function LateralNavigation() {
  return (
    <div className="lateral-navigation">
      <ul>
        <li>
          <a href="/dashboard">Dashboard</a>
        </li>
        <li>
          <a href="/products">Produits</a>
        </li>
        <li>
          <a href="/orders">Commandes</a>
        </li>
        <li>
          <a href="/customers">Clients</a>
        </li>
        <li>
          <a href="/settings">Paramètres</a>
        </li>
      </ul>
    </div>
  );
}
export default LateralNavigation;