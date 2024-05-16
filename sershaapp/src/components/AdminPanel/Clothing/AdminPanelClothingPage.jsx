import React, { useState } from 'react';
import './adminPanelClothingPage.css';

const AdminPanelClothingPage = () => {
    // Sample clothing data
    const [clothingData, setClothingData] = useState([
        { id: 1, image: 'url_to_image_1', price: '$20' },
        { id: 2, image: 'url_to_image_2', price: '$30' },
        { id: 3, image: 'url_to_image_3', price: '$25' },
        // Add more clothing items as needed
    ]);

    const handleCreateNewItem = () => {
        // Implement functionality to create new items
        // This could include opening a modal or redirecting to a new page
        console.log('Creating new item...');
    };

    const handleEdit = (id) => {
        // Implement functionality to edit the clothing item
        console.log(`Editing item with id ${id}`);
    };

    const handleDelete = (id) => {
        // Implement functionality to delete the clothing item
        console.log(`Deleting item with id ${id}`);
    };

    return (
        <div className="clothing-page">
            <h1>Clothing</h1>
            <button className="create-new-item-btn" onClick={handleCreateNewItem}>
                Create New Item
            </button>
            <table className="clothing-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {clothingData.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <img src={item.image} alt={`Clothing ${item.id}`} className="clothing-image" />
                            </td>
                            <td>{item.price}</td>
                            <td className='settingsData'>
                                <button onClick={() => handleEdit(item.id)} className="edit-btn">Edit</button>
                                <button onClick={() => handleDelete(item.id)} className="delete-btn">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPanelClothingPage;
