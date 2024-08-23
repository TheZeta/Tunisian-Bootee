// src/components/ItemCard.tsx
import React from 'react';
import { Item } from '../types/Item';

const ItemCard: React.FC<Item> = ({ name, price, size, imageData }) => {
    return (
        <div style={styles.card}>
            <img src={imageData} alt={name} style={styles.image} />
            <div style={styles.details}>
                <h2>{name}</h2>
                <p>Size: {size}</p>
                <p>Price: ${price.toFixed(2)}</p>
            </div>
        </div>
    );
};

const styles = {
    card: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        maxWidth: '300px',
        textAlign: 'center' as 'center',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        margin: '16px',
    },
    image: {
        width: '100%',
        height: 'auto',
        borderRadius: '8px 8px 0 0',
    },
    details: {
        paddingTop: '16px',
    },
};

export default ItemCard;
