import React from 'react';
import { useCart } from '../context/CartContext';

const ShoppingCart: React.FC = () => {
  const { cart } = useCart();

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price.toFixed(2)} x {item.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShoppingCart;
