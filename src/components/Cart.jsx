import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';
import '../styles/Cart.css';

const Cart = () => {
  const { cart, removeFromCart, clearCart, getTotalPrice, updateQuantity } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <h2>Tu carrito está vacío</h2>
          <p>¡Agrega productos para comenzar a comprar!</p>
          <Link to="/" className="continue-shopping-btn">Ir a la tienda</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Mi Carrito</h2>
      <div className="cart-items">
        {cart.map((item) => (
          <CartItem 
            key={item.id} 
            item={item} 
            onRemove={removeFromCart}
            onUpdateQuantity={updateQuantity}
          />
        ))}
      </div>
      <div className="cart-summary">
        <h3>Resumen de compra</h3>
        <p className="total-items">Total de productos: {cart.reduce((acc, item) => acc + item.quantity, 0)}</p>
        <p className="total-price">Total: ${getTotalPrice()}</p>
        <div className="cart-actions">
          <button onClick={clearCart} className="clear-cart-btn">Vaciar carrito</button>
          <Link to="/checkout" className="checkout-btn">Finalizar compra</Link>
        </div>
        <Link to="/" className="continue-shopping-link">← Continuar comprando</Link>
      </div>
    </div>
  );
};

export default Cart;
