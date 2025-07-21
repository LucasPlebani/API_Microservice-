import React, { useState } from "react";
import "../components/style/ProductTable.css";

const initialProducts = [
  {
    name: "Casque Gamer Pro",
    sales: 120,
    revenue: 3599.99,
    inStock: true,
    categorie: "Audio",
  },
  {
    name: "Clavier RGB",
    sales: 80,
    revenue: 1999.95,
    inStock: false,
    categorie: "Périphériques",
  },
  {
    name: 'Écran 4K 27"',
    sales: 45,
    revenue: 13499.5,
    inStock: true,
    categorie: "Moniteurs",
  },
  {
    name: "Souris Sans Fil",
    sales: 150,
    revenue: 2999.0,
    inStock: true,
    categorie: "Périphériques",
  },
  {
    name: "Webcam HD",
    sales: 60,
    revenue: 899.99,
    inStock: false,
    categorie: "Caméras",
  },
  {
    name: "Microphone USB",
    sales: 90,
    revenue: 1299.99,
    inStock: true,
    categorie: "Audio",
  },
  {
    name: "Support de Bureau",
    sales: 30,
    revenue: 499.99,
    inStock: true,
    categorie: "Accessoires",
  },
  {
    name: "Station d'Accueil",
    sales: 25,
    revenue: 2499.0,
    inStock: false,
    categorie: "Accessoires",
  },
  {
    name: "Câble HDMI",
    sales: 200,
    revenue: 199.95,
    inStock: true,
    categorie: "Câbles",
  },
  {
    name: "Adaptateur USB-C",
    sales: 110,
    revenue: 599.99,
    inStock: true,
    categorie: "Accessoires",
  },
  {
    name: "Mario Kart",
    sales: 2033,
    revenue: 10000.0,
    inStock: true,
    categorie: "Alimentation",
  },
];

const ProductTable = () => {
  const [search, setSearch] = useState("");

  const filteredProducts = initialProducts.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="table-container">
      <h2 className="table-title">Produits vendus</h2>

      <input
        type="text"
        placeholder="Rechercher un produit..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      <table className="product-table">
        <thead>
          <tr>
            <th>Produit</th>
            <th>Ventes</th>
            <th>Revenu (€)</th>
            <th>En stock</th>
            <th>Catégorie</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.sales}</td>
                <td>{product.revenue.toFixed(2)}</td>
                <td className={product.inStock ? "in-stock" : "out-of-stock"}>
                  {product.inStock ? "Oui" : "Non"}
                </td>
                <td>{product.categorie}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-results">
                Aucun produit trouvé
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
