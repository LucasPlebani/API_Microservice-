import React, { useState } from 'react';

const FormAddProduct = () => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('price', product.price);
        formData.append('description', product.description);
        formData.append('vendeurId', utilisateurConnecteId);
        if (product.image) {
            formData.append('image', product.image);
        }

        try {
            const response = await fetch("http://localhost:8000/api/marchandises", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Erreur lors de l'ajout du produit.");
            }

            alert("Produit ajouté avec succès !");
            setProduct({ name: '', price: '', description: '', image: null }); // reset

        } catch (err) {
            console.error("Erreur :", err);
            alert("Une erreur est survenue lors de l'ajout du produit.");
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
