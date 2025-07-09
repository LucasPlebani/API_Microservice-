import React, { useEffect, useState } from 'react';
import '../components/style/ProductTable.css';

const ProductTable = ({ userId, refreshFlag }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  // Récupérer les produits du vendeur connecté
  useEffect(() => {
    if (!userId) return;
    fetch(`/api/marchandises/store/${userId}`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Erreur fetch produits vendeur', err));
  }, [userId, refreshFlag]); // refreshFlag permet de forcer le refresh après ajout/suppression/modif

  // Suppression d'un produit
  const handleDelete = async (productId) => {
    await fetch(`/api/marchandises/${productId}`, { method: 'DELETE' });
    setProducts(products.filter(p => p._id !== productId));
  };

  // Recherche
  const filteredProducts = products.filter(product =>
    product.nom.toLowerCase().includes(search.toLowerCase())
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
            <th>Prix</th>
            <th>Volume</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product._id}>
                <td>{product.nom}</td>
                <td>{product.prix}</td>
                <td>{product.volume}</td>
                <td>
                  <button onClick={() => handleDelete(product._id)}>Supprimer</button>
                  {/* Ajoute ici un bouton/modale pour modifier */}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-results">Aucun produit trouvé</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;