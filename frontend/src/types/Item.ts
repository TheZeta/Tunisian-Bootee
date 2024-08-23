// src/types/Item.ts
export interface Item {
    id: number;
    name: string;
    price: number;
    size: string;
    imageData: string; // This will now be the image URL instead of Base64
    imageMimeType: string;
}
