import React, { useEffect, useState } from 'react';
import './adminPanelClothingPage.css';
import ClothingCreateNew from './ClothingCreateNew/ClothingCreateNew';
import { useGlobalContext } from '../../../context/context';
import axios from 'axios';
import ClothingEditItem from './ClothingEditItem/ClothingEditItem';

const AdminPanelClothingPage = () => {
  const { baseUrl, baseUrlImage, clothingCreateNew, setClothingCreateNew, isClothingItemEdit, setIsClothingItemEdit, clothingEditingItem, setClothingEditingItem, allClothing, setAllClothing } = useGlobalContext();
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
  }, [clothingCreateNew, isClothingItemEdit]);

  const handleEdit = (item) => {
    setClothingEditingItem(item);
    setIsClothingItemEdit(true);
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
      ) : isClothingItemEdit ? (
        <ClothingEditItem />
      ) : (
        <div className="clothing-page">
          <div className='titleWrapper'>
            <h3>Clothing</h3>
            <button className="create-new-item-btn" onClick={() => setClothingCreateNew(true)}>
              Create New Item
            </button>
          </div>
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
                    <button onClick={() => handleEdit(item)} className="edit-btn">Edit</button>
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
