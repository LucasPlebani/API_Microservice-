import React, { useState } from "react";
import { AgCharts } from "ag-charts-react";

// Données des produits
const initialProducts = [
  { name: 'Casque Gamer Pro', sales: 120, revenue: 3599.99, inStock: true , categorie: 'Audio' },
  { name: 'Clavier RGB', sales: 80, revenue: 1999.95, inStock: false, categorie: 'Périphériques' },
  { name: 'Écran 4K 27"', sales: 45, revenue: 13499.50, inStock: true, categorie: 'Moniteurs' },
  { name: 'Souris Sans Fil', sales: 150, revenue: 2999.00, inStock: true, categorie: 'Périphériques' },
  { name: 'Webcam HD', sales: 60, revenue: 899.99, inStock: false, categorie: 'Caméras' },
  { name: 'Microphone USB', sales: 90, revenue: 1299.99, inStock: true, categorie: 'Audio' },
  { name: 'Support de Bureau', sales: 30, revenue: 499.99, inStock: true, categorie: 'Accessoires' },
  { name: 'Station d\'Accueil', sales: 25, revenue: 2499.00, inStock: false, categorie: 'Accessoires' },
  { name: 'Câble HDMI', sales: 200, revenue: 199.95, inStock: true, categorie: 'Câbles' },
  { name: 'Adaptateur USB-C', sales: 110, revenue: 599.99, inStock: true, categorie: 'Accessoires' },
  { name: 'sauce mougou', sales: 2033, revenue: 10000.00, inStock: true, categorie: 'Alimentation' },
];

// Fonction qui regroupe les ventes par catégorie
function getCategorySalesData(products) {
  const grouped = {};

  products.forEach(product => {
    if (!grouped[product.categorie]) {
      grouped[product.categorie] = 0;
    }
    grouped[product.categorie] += product.sales;
  });

  const data = { periode: 'Total ventes' };
  for (const [category, sales] of Object.entries(grouped)) {
    data[category] = sales;
  }

  return [data]; // Un seul objet dans un tableau, car une seule "période"
}

const SellPerfomanceGraph = () => {
  const data = getCategorySalesData(initialProducts);

  const categories = Object.keys(data[0]).filter(key => key !== 'periode');

  const series = categories.map((category) => ({
    type: 'bar',
    xKey: 'periode',
    yKey: category,
    yName: category,
  }));

  const [options] = useState({
    title: {
      text: 'Ventes par Catégorie de Produit',
    },
    subtitle: {
      text: 'Nombre total de ventes',
    },
    data,
    series,
    axes: [
      { type: 'category', position: 'bottom' },
      { type: 'number', position: 'left', title: { text: 'Nombre de ventes' } }
    ],
    legend: {
      position: 'right',
    },
  });

  return <AgCharts options={options} />;
};

export default SellPerfomanceGraph;
