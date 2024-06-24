import React, { useEffect, useState } from 'react';
import './adminPanelClothingPage.css';
import ClothingCreateNew from './ClothingCreateNew/ClothingCreateNew';
import { useGlobalContext } from '../../../context/context';
import axios from 'axios';

const AdminPanelClothingPage = () => {
    const { baseUrl, baseUrlImage, clothingCreateNew, setClothingCreateNew, allClothing, setAllClothing } = useGlobalContext();
    // Sample clothing data
    const [clothingData, setClothingData] = useState([
        { id: 1, image: 'url_to_image_1', price: '$20' },
        { id: 2, image: 'url_to_image_2', price: '$30' },
        { id: 3, image: 'url_to_image_3', price: '$25' },
        // Add more clothing items as needed
    ]);

    useEffect(() => {
        const fetchClothing = async () => {
            try {
                const response = await axios.get(`${baseUrl}/SershaItem`);
                setAllClothing(response.data);
                console.log(response.data, allClothing)
            } catch (error) {
                console.error('Error fetching Clothing:', error);
            }
        };

        fetchClothing();
    }, []);

    const handleCreateNewItem = () => {
        // Implement functionality to create new items
        // This could include opening a modal or redirecting to a new page
        console.log('Creating new item...');
    };

    const handleEdit = (id) => {
        // Implement functionality to edit the clothing item
        console.log(`Editing item with id ${id}`);
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${baseUrl}/SershaItem/${id}`);
            if (response.status === 200) {

                // Update the allQuizzes state by filtering out the deleted quiz
                const updatedClothingg = allClothing.filter(q => q.id !== allClothing.id);
                setAllClothing(updatedClothingg);
            }
        } catch (error) {
            console.error('Error deleting the question:', error);
        }
        console.log(`Deleting item with id ${id}`);
    };

    return (
        <>
            {clothingCreateNew ? (
                <ClothingCreateNew />
            ) : (
                <div className="clothing-page">
                    <h1>Clothing</h1>
                    <button className="create-new-item-btn" onClick={() => setClothingCreateNew(true)}>
                        Create New Item
                    </button>
                    <table className="clothing-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Body part</th>
                                <th>Type</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allClothing?.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <img src={`${baseUrlImage}${item.imagePath}`} alt={`Clothing ${item.id}`} className="clothing-image" />
                                    </td>
                                    <td>{item.bodyPart == 0 ? 'Head' : 'Body'}</td>
                                    <td>{item.type == 0 ? 'Hat' : item.type == 1 ? 'Glasses' : item.type == 2 ? 'Torso' : 'Legs'}</td>
                                    <td className='settingsData'>
                                        <button onClick={() => handleEdit(item.id)} className="edit-btn">Edit</button>
                                        <button onClick={() => handleDelete(item.id)} className="delete-btn">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default AdminPanelClothingPage;
