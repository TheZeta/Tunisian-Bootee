import React from 'react';
import { useParams } from 'react-router-dom';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Product {id}</h1>
      {/* Add product details and "Add to Cart" button here */}
    </div>
  );
};

export default ProductPage;
