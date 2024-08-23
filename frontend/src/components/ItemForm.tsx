// src/components/ItemForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ItemForm: React.FC = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [size, setSize] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!name || !price || !size) {
            setError('All fields are required.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', price);
            formData.append('size', size);

            if (imageFile) {
                formData.append('imageFile', imageFile);
                formData.append('imageMimeType', imageFile.type); // Add MIME type
            }

            await axios.post(`${API_BASE_URL}/items`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Clear the form and error on successful submission
            setName('');
            setPrice('');
            setSize('');
            setImageFile(null);
            setError(null);

            // Optionally, you could refresh the item list here
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    return (
        <div>
            <h2>Add New Item</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Size:</label>
                    <input
                        type="text"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    />
                </div>
                <button type="submit">Add Item</button>
            </form>
        </div>
    );
};

export default ItemForm;
