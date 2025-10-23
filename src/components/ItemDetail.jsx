import React from 'react';
import { Link } from 'react-router-dom';
import ItemCount from './ItemCount';

const ItemDetail = ({ product, onAddToCart, itemAddedToCart }) => {
  return (
    <div className="item-detail">
      {product.image && <img src={product.image} alt={product.name} className="detail-image" />}
      <div className="detail-info">
        <h2>{product.name}</h2>
        <p className="product-description">{product.description}</p>
        <p className="product-category">Categoría: {product.category}</p>
        <p className="product-price">Precio: ${product.price}</p>
        <p className="product-stock">Stock disponible: {product.stock}</p>
        
        {product.stock > 0 ? (
          !itemAddedToCart ? (
            <ItemCount stock={product.stock} initial={1} onAdd={onAddToCart} />
          ) : (
            <div className="added-to-cart-actions">
              <p className="success-message">✓ Producto agregado al carrito</p>
              <Link to="/cart" className="go-to-cart-btn">Ir al carrito</Link>
              <Link to="/" className="continue-shopping-btn">Seguir comprando</Link>
            </div>
          )
        ) : (
          <p className="out-of-stock-message">Producto sin stock</p>
        )}
      </div>
    </div>
  );
};

export default ItemDetail;
