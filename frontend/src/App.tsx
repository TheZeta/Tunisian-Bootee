// src/App.tsx
import React, { useEffect, useState } from 'react';
import ItemCard from './components/ItemCard';
import ItemForm from './components/ItemForm';
import { fetchItems, fetchItemImage } from './services/itemService';
import { Item } from './types/Item';

const App: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadItems = async () => {
            try {
                const itemsData = await fetchItems();
                
                // Ensure itemsData is an array before mapping
                if (!Array.isArray(itemsData)) {
                    throw new Error('Fetched data is not an array');
                }

                const itemsWithImages = await Promise.all(
                    itemsData.map(async (item) => {
                        const imageUrl = await fetchItemImage(item.id);
                        return { ...item, imageData: imageUrl };
                    })
                );
                setItems(itemsWithImages);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        loadItems();
    }, []);

    return (
        <div>
            <h1>Item List</h1>
            <ItemForm />
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <div style={styles.grid}>
                {items.map((item) => (
                    <ItemCard key={item.id} {...item} />
                ))}
            </div>
        </div>
    );
};

const styles = {
    grid: {
        display: 'flex',
        flexWrap: 'wrap' as 'wrap',
        justifyContent: 'center',
    },
};

export default App;
