import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({ product }) => {
  return (
    <div className="product-card">
      {product.image && <img src={product.image} alt={product.name} className="product-image" />}
      <h4>{product.name}</h4>
      <p className="product-category">{product.category}</p>
      <p className="product-price">${product.price}</p>
      {product.stock > 0 ? (
        <Link to={`/item/${product.id}`} className="view-detail-btn">Ver detalle</Link>
      ) : (
        <p className="out-of-stock">Sin stock</p>
      )}
    </div>
  );
};

export default Item;
