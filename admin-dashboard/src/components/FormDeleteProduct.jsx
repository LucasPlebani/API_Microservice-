import React, { useState } from 'react';
import { mockProducts } from './mockProducts';

const FormDeleteProduct = ({ onDelete }) => {
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState(null);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        const found = mockProducts.find(p =>
            p.name.toLowerCase().includes(value.toLowerCase())
        );
        setSelected(found || null);
    };

    const handleDelete = () => {
        if (selected && onDelete) {
            onDelete(selected);
            setSelected(null);
            setSearch('');
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
            {selected && (
                <div className="delete-confirm">
                    <p>Voulez-vous supprimer <strong>{selected.name}</strong> ?</p>
                    <button onClick={handleDelete} className="delete-btn">Supprimer</button>
                </div>
            )}
        </div>
    );
};

export default FormDeleteProduct;
