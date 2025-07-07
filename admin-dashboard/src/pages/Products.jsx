import React from "react";
import ProductManager from "../components/ProductManager";
function Products() {
  return (
    <div className="product-page">
      <h1>Product Page</h1>
      <p>This is the product page where you can manage products.</p>
      <ProductManager  />
      {/* Add your product management components here */}
    </div>
  );
}
export default Products;