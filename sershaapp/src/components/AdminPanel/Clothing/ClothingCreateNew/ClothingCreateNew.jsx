import React from 'react';
import { useGlobalContext } from '../../../../context/context';
import closeButton from '../../../../assets/images/adminPanel/closeButton.png';
import axios from 'axios';

const ClothingCreateNew = () => {
  const {
    baseUrl,
    clothingCreateNew,
    setClothingCreateNew,
    clothingNewItem,
    setClothingNewItem,
    setAllClothing
  } = useGlobalContext();

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('type', clothingNewItem.type);
    formData.append('image', clothingNewItem.image);
    formData.append('bodyPart', clothingNewItem.bodyPart);
    formData.append('name', clothingNewItem.name);

    try {
      const response = await axios.post(`${baseUrl}/SershaItem/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setClothingNewItem({
        type: '',
        image: null,
        bodyPart: '',
        name: '',
      });
      console.log(response.data);
      setClothingCreateNew(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (file) => {
    setClothingNewItem({ ...clothingNewItem, image: file });
  };

  return (
    <div className="createNewEmojiEmotionContainer">
      <div className="close-btn" onClick={() => setClothingCreateNew(false)}>
        <img src={closeButton} alt='close' />
      </div>
      <h3 className="p-3 text-center titleMini" style={{ padding: '.5rem' }}>Create New Clothing Item</h3>
      <div>
        <label className='fieldLabel'>Upload Item Image:</label>
        <input
          className='inputField'
          type="file"
          onChange={(e) => handleImageChange(e.target.files[0])}
        />
      </div>
      <div>
        <label>Body Part</label>
        <select
          className='dropdown'
          value={clothingNewItem.bodyPart}
          onChange={(e) => setClothingNewItem({ ...clothingNewItem, bodyPart: e.target.value })}
        >
          <option value="" disabled>Select body part</option>
          <option value="0">Head</option>
          <option value="1">Body</option>
        </select>
      </div>
      <div>
        <label>Type</label>
        <select
          className='dropdown'
          value={clothingNewItem.type}
          onChange={(e) => setClothingNewItem({ ...clothingNewItem, type: e.target.value })}
        >
          <option value="" disabled>Select type</option>
          <option value="0">Hat</option>
          <option value="1">Glasses</option>
          <option value="2">Torso</option>
          <option value="3">Legs</option>
        </select>
      </div>
      <div>
        <label className='questionFieldLabel'>Name:</label>
        <input
          className='newRightAnswerQuestionInput'
          type="text"
          value={clothingNewItem.name}
          placeholder='Name'
          onChange={(e) => setClothingNewItem({ ...clothingNewItem, name: e.target.value })}
        />
      </div>
      <button className='submitBtn' onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default ClothingCreateNew;
