// src/services/itemService.ts
import { Item } from '../types/Item';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://tunuspatik.com/api';

export const fetchItems = async (): Promise<Item[]> => {
    const response = await fetch(`${API_BASE_URL}/items`);
    if (!response.ok) {
        throw new Error('Failed to fetch items');
    }
    return response.json();
};

export const fetchItemImage = async (id: number): Promise<string> => {
    const response = await fetch(`${API_BASE_URL}/items/${id}/image`);
    if (!response.ok) {
        throw new Error('Failed to fetch item image');
    }
    const blob = await response.blob();
    return URL.createObjectURL(blob);
};
