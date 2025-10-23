import React from 'react';
import { useCart } from "../context/CartContext";
import '../styles/CartWidget.css';

const CartWidget = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <div className="cart-widget">
      <svg className="cart-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5M7 13v8a2 2 0 002 2h6a2 2 0 002-2v-8m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v4.01"
        />
      </svg>
      {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
    </div>
  );
};

export default CartWidget;
