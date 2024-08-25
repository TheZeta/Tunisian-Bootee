import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import { fetchProducts } from '../services/productService';
import { Product } from '../types/Product';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchAndSetProducts();
  }, []);

  return (
    <div>
      <h1>Welcome to Tunus Patik</h1>
      <ProductList products={products} />
    </div>
  );
};

export default Home;
