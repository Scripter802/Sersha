import React, { useEffect, useState } from 'react';
import './adminPanelAvatar.css';
import { useGlobalContext } from '../../../context/context';
import axios from 'axios';
import AvatarEdit from './AvatarEditItem/AvatarEditItem';
import AvatarCreateNew from './AvatarCreateNew/AvatarCreateNew';

const AdminPanelAvatar = () => {
  const { baseUrl, baseUrlImage, avatarCreateNew, setAvatarCreateNew, isAvatarEdit, setIsAvatarEdit, avatarEditing, setAvatarEditing, allAvatars, setAllAvatars } = useGlobalContext();
  // Sample clothing data
  const [clothingData, setClothingData] = useState([
    { id: 1, image: 'url_to_image_1', price: '$20' },
    { id: 2, image: 'url_to_image_2', price: '$30' },
    { id: 3, image: 'url_to_image_3', price: '$25' },
    // Add more clothing items as needed
  ]);

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const response = await axios.get(`${baseUrl}/Avatar`);
        setAllAvatars(response.data);
      } catch (error) {
        console.error('Error fetching Avatars:', error);
      }
    };

    fetchAvatars();
  }, [avatarCreateNew, isAvatarEdit]);

  const handleEdit = (item) => {
    setAvatarEditing(item);
    setIsAvatarEdit(true);
    console.log(`Editing item with id ${item.id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/Avatar/${id}`);
      if (response.statusText == 'OK' || "NO CONTENT") {

        // Update the allQuizzes state by filtering out the deleted quiz
        const updatedAvatars = allAvatars.filter(q => q.id !== id);
        setAllAvatars(updatedAvatars);
      }
    } catch (error) {
      console.error('Error deleting Avatar:', error);
    }
    console.log(`Deleting avatar with id ${id}`);
  };

  return (
    <>
      {avatarCreateNew ? (
        <AvatarCreateNew />
      ) : isAvatarEdit ? (
        <AvatarEdit />
      ) : (
        <div className="clothing-page">
          <div className='titleWrapper'>
            <h3>Avatar</h3>
            <button className="create-new-item-btn" onClick={() => setAvatarCreateNew(true)}>
              Create New Avatar
            </button>
          </div>
          <table className="clothing-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allAvatars?.map((item) => (
                <tr key={item.id}>
                  <td style={{ textAlign: "center" }}>{item.name}</td>
                  <td>
                    <img src={`${baseUrlImage}${item.imagePath}`} alt={`Clothing ${item.id}`} className="clothing-image" />
                  </td>
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

export default AdminPanelAvatar;
