import { Product } from '../types/Product';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://tunuspatik.com/api';

export const fetchProducts = async (): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return response.json();
};
