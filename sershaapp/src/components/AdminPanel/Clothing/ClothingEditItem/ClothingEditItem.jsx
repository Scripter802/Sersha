import React from 'react';
import { useGlobalContext } from '../../../../context/context';
import closeButton from '../../../../assets/images/adminPanel/closeButton.png';
import axios from 'axios';
import Dropzone from 'react-dropzone';

const ClothingEditItem = () => {
  const {
    baseUrl,
    baseUrlImage,
    isClothingItemEdit,
    setIsClothingItemEdit,
    clothingEditingItem,
    setClothingEditingItem,
    setAllClothing
  } = useGlobalContext();

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('id', clothingEditingItem.id);
    formData.append('type', clothingEditingItem.type);
    formData.append('image', clothingEditingItem.image);
    formData.append('bodyPart', clothingEditingItem.bodyPart);
    formData.append('name', clothingEditingItem.name);

    try {
      const response = await axios.put(`${baseUrl}/SershaItem/${clothingEditingItem.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setIsClothingItemEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageDrop = (file) => {
    setClothingEditingItem({ ...clothingEditingItem, image: file[0], imagePath: null });
  };

  console.log(clothingEditingItem)

  return (
    <div className="adminPanelCreateNewWrapper">
      <div className="close-btn" onClick={() => setIsClothingItemEdit(false)}>
        <img src={closeButton} alt='close' />
      </div>
      <h3 className="p-3 text-center titleMini" style={{ padding: '.5rem' }}>Create New Clothing Item</h3>
      <div>
        <label className='fieldLabel'>Upload Item Image:</label>
        <Dropzone onDrop={handleImageDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="dropzoneAuthor">
              <input {...getInputProps()} />
              {clothingEditingItem ? (
                <img src={typeof clothingEditingItem.imagePath === 'string' ? `${baseUrlImage}/${clothingEditingItem.imagePath}` : URL.createObjectURL(clothingEditingItem.image)} alt="Author Image" className="uploaded-imageAuthor" />
              ) : (
                <p>Drag 'n' drop an image here, or click to select an image</p>
              )}
            </div>
          )}
        </Dropzone>
      </div>
      <div>
        <label>Body Part</label>
        <select
          className='dropdown'
          value={clothingEditingItem.bodyPart}
          onChange={(e) => setClothingEditingItem({ ...clothingEditingItem, bodyPart: e.target.value })}
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
          value={clothingEditingItem.type}
          onChange={(e) => setClothingEditingItem({ ...clothingEditingItem, type: e.target.value })}
        >
          <option value="" disabled>Select type</option>
          <option value="0">Hat</option>
          <option value="1">Glasses</option>
          <option value="2">Torso</option>
          <option value="3">Legs</option>
        </select>
      </div>
      <div>
        <label className='fieldLabel'>Name:</label>
        <input
          className='inputField'
          type="text"
          value={clothingEditingItem.name}
          placeholder='Name'
          onChange={(e) => setClothingEditingItem({ ...clothingEditingItem, name: e.target.value })}
        />
      </div>
      <button className='submitBtn' onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default ClothingEditItem;
