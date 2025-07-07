import React, { useState } from 'react';
import FormAddProduct from './FormAddProduct';
import FormEditProduct from './FormEditProduct';
import FormDeleteProduct from './FormDeleteProduct';
import './style/ProductManager.css';

const ProductManager = () => {
    const [view, setView] = useState('add'); // 'add', 'edit', 'delete'

    const handleSubmit = (formData) => {
        console.log('Produit soumis :', formData);
        // log ou envoi API ici
    };

    return (
        <div className="product-manager-container">
            <div className="button-group">
                <button
                    className={view === 'add' ? 'active' : ''}
                    onClick={() => setView('add')}
                >
                    Ajouter un produit
                </button>
                <button
                    className={view === 'edit' ? 'active' : ''}
                    onClick={() => setView('edit')}
                >
                    Modifier un produit
                </button>
                <button
                    className={view === 'delete' ? 'active' : ''}
                    onClick={() => setView('delete')}
                >
                    Supprimer un produit
                </button>
            </div>

          <div className="form-section">
    {view === 'add' && <FormAddProduct onSubmit={handleSubmit} />}
    {view === 'edit' && <FormEditProduct onSubmit={(data) => console.log('Produit modifié :', data)} />}
    {view === 'delete' && <FormDeleteProduct onDelete={(data) => console.log('Produit supprimé :', data)} />}
</div>
        </div>
    );
};

export default ProductManager;
