import React, { useState } from 'react';
import { mockProducts } from './mockProducts';

/**
 * Appelle l'API pour mettre à jour un produit.
 * @param {Object} selectedProduct - Le produit à mettre à jour.
 * @returns {Promise<Response>}
 */
const updateProduct = async (selectedProduct) => {
    return fetch(`/api/marchandises/${selectedProduct._id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nom: selectedProduct.name,
            prix: selectedProduct.price,
            description: selectedProduct.description,
        }),
    });
};

const FormEditProduct = () => {
    const [search, setSearch] = useState('');
    const [product, setProduct] = useState(null);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        const found = mockProducts.find(p =>
            p.name.toLowerCase().includes(value.toLowerCase())
        );
        setProduct(found || null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (product) {
            try {
                await updateProduct(product);
                alert("Produit mis à jour avec succès !");
            } catch (err) {
                console.error("Erreur lors de la mise à jour :", err);
            }
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Rechercher un produit"
                value={search}
                onChange={handleSearch}
                className="search-bar"
            />
            {product && (
                <form onSubmit={handleSubmit} className="product-form">
                    <div>
                        <label>Nom</label>
                        <input type="text" name="name" value={product.name} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Prix</label>
                        <input type="number" name="price" value={product.price} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea name="description" value={product.description} onChange={handleChange} required />
                    </div>
                    <button type="submit">Modifier le produit</button>
                </form>
            )}
        </div>
    );
};

export default FormEditProduct;
