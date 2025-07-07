import React, { useState } from 'react';

const FormAddProduct = ({ onSubmit }) => {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setProduct({ ...product, image: files[0] });
        } else {
            setProduct({ ...product, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Préparer les données pour l'envoi (ex: FormData pour l'image)
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('price', product.price);
        formData.append('description', product.description);
        if (product.image) {
            formData.append('image', product.image);
        }
        if (onSubmit) {
            onSubmit(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="product-form">
            <div>
                <label>Nom du produit</label>
                <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Prix</label>
                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                />
            </div>
            <div>
                <label>Description</label>
                <textarea
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Image</label>
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Ajouter le produit</button>
        </form>
    );
};

export default FormAddProduct;