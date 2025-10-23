import React from 'react';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  const subtotal = item.price * item.quantity;

  return (
    <div className="cart-item">
      {item.image && <img src={item.image} alt={item.name} className="cart-item-image" />}
      <div className="cart-item-details">
        <h4>{item.name}</h4>
        <p className="cart-item-price">Precio unitario: ${item.price}</p>
      </div>
      <div className="cart-item-quantity">
        <button 
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
          className="quantity-btn"
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button 
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          disabled={item.quantity >= item.stock}
          className="quantity-btn"
        >
          +
        </button>
      </div>
      <div className="cart-item-subtotal">
        <p>Subtotal: ${subtotal}</p>
      </div>
      <button onClick={() => onRemove(item.id)} className="remove-btn">
        Eliminar
      </button>
    </div>
  );
};

export default CartItem;
