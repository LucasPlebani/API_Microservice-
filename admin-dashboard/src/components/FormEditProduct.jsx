import React, { useState } from 'react';
import { mockProducts } from './mockProducts';

const FormEditProduct = ({ onSubmit }) => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (product && onSubmit) {
            onSubmit(product); // ici on envoie les infos mises à jour
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
