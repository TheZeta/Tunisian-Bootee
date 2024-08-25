import React from 'react';
import '../styles/ProductCard.css'; // Import CSS file for styling
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  size: string;
  imageUrl: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, size, imageUrl }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      productId: id,
      name: name,
      price: price,
      quantity: 1,
    });
  };

  return (
    <div className="product-card">
      <img src={imageUrl} alt={name} className="product-image" />
      <h2>{name}</h2>
      <p>Size: {size}</p>
      <p>${price.toFixed(2)}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
