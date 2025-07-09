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

    const handleDelete = async () => {
        if (selected) {
            try {
                await fetch(`/api/marchandises/${selected._id}`, {
                    method: "DELETE"
                });
                alert("Produit supprimé avec succès !");
                if (onDelete) onDelete(selected); // Optionnel si le parent a besoin d’être informé
                setSelected(null);
                setSearch('');
            } catch (err) {
                console.error("Erreur lors de la suppression :", err);
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
