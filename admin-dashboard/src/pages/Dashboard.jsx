import React, { useEffect, useState } from "react";
import Button from "../components/ButtonComponent";
import Card from "../components/Card";
import "../components/style/dashboard.css";
import ProductTable from "../components/ProductTable";
import PieCategory from "../components/PieCategory";
import SellPerfomanceGraph from "../components/SellPerformanceGraph";
import { MdOutlineSell, MdEuroSymbol, MdProductionQuantityLimits } from "react-icons/md";

function Dashboard() {
  const [produits, setProduits] = useState([]);
  const userId = localStorage.getItem("userId"); // <-- récupère l'id du vendeur connecté

  useEffect(() => {
    const fetchProduits = async () => {
      if (!userId) return;
      try {
        const res = await fetch(`/api/marchandises/store/${userId}`);
        const data = await res.json();
        setProduits(data);
      } catch (error) {
        console.error("Erreur fetch produits vendeur", error);
      }
    };

    fetchProduits();
  }, [userId]);

  return (
    <div className="admin-dashboard">
      <h1>Dashboard Magasin </h1>
      <div className="Cards">
        <Card title="Nombre de vente" description="1,234" icon={<MdOutlineSell />} buttonText={"page vente"} />
        <Card title="Chiffre d'affaire Total" description="746.15€" icon={<MdEuroSymbol />} buttonText={"page vente"} />
        <Card title="Top produit" description="sauce Teriaki" icon={<MdProductionQuantityLimits />} buttonText={"page produit"} />
      </div>

      <ProductTable userId={userId} />
      <div className="graphSection">
        <PieCategory />
        <SellPerfomanceGraph />
      </div>
      <Button text="Créer un magasin" href="/" />
    </div>
  );
}
export default Dashboard;