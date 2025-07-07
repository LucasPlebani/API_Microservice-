import React from "react";
import Button from "../components/ButtonComponent";
import Card from "../components/Card";
import "../components/style/dashboard.css";
import ProductTable from "../components/ProductTable";
import PieCategory from "../components/PieCategory";
import SellPerfomanceGraph from "../components/SellPerformanceGraph";
import { MdOutlineSell, MdEuroSymbol, MdProductionQuantityLimits } from "react-icons/md";

function Dashboard() {
  return (
    <div className="admin-dashboard">
      <h1>Dashboard Magasin </h1>
      <div className="Cards">
        <Card title="Nombre de vente" description="1,234" icon={<MdOutlineSell />} buttonText={"page vente"} />
        <Card title="Chiffre d'affaire Total" description="746.15€" icon={<MdEuroSymbol />} buttonText={"page vente"} />
        <Card title="Top produit" description="sauce Mougou" icon={<MdProductionQuantityLimits />} buttonText={"page produit"} />
      </div>

      <ProductTable />
      <div className="graphSection"> 
      <PieCategory />
      <SellPerfomanceGraph />
      </div>
      <Button text="Créer un magasin" href="/" />
    </div>
  );
}
export default Dashboard;