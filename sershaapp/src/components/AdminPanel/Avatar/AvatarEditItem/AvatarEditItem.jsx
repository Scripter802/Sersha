import React from 'react';
import { useGlobalContext } from '../../../../context/context';
import closeButton from '../../../../assets/images/adminPanel/closeButton.png';
import axios from 'axios';
import Dropzone from 'react-dropzone';

const AvatarEdit = () => {
  const {
    baseUrl,
    baseUrlImage,
    isAvatarEdit,
    setIsAvatarEdit,
    avatarEditing,
    setAvatarEditing,
    setAllAvatars
  } = useGlobalContext();
  console.log(avatarEditing)
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('id', avatarEditing.id);
    formData.append('image', avatarEditing.image);
    formData.append('name', avatarEditing.name);

    try {
      const response = await axios.put(`${baseUrl}/Avatar/${avatarEditing?.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setIsAvatarEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageDrop = (file) => {
    setAvatarEditing({ ...avatarEditing, image: file[0], imagePath: null });

  };

  console.log(avatarEditing)

  return (
    <div className="adminPanelCreateNewWrapper">
      <div className="close-btn" onClick={() => setIsAvatarEdit(false)}>
        <img src={closeButton} alt='close' />
      </div>
      <h3 className="p-3 text-center titleMini" style={{ padding: '.5rem' }}>Create New Avatar</h3>
      <div>
        <label className='fieldLabel'>Upload Avatar Image:</label>
        <Dropzone onDrop={handleImageDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="dropzoneAuthor">
              <input {...getInputProps()} />
              {avatarEditing ? (
                <img src={typeof avatarEditing.imagePath === 'string' && avatarEditing.imagePath !== null ? `${baseUrlImage}/${avatarEditing.imagePath}` : URL.createObjectURL(avatarEditing.image)} alt="Author Image" className="uploaded-imageAuthor" />
              ) : (
                <p>Drag 'n' drop an image here, or click to select an image</p>
              )}
            </div>
          )}
        </Dropzone>
      </div>

      <div>
        <label className='fieldLabel'>Name:</label>
        <input
          className='inputField'
          type="text"
          value={avatarEditing.name}
          placeholder='Name'
          onChange={(e) => setAvatarEditing({ ...avatarEditing, name: e.target.value })}
        />
      </div>
      <button className='submitBtn' onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default AvatarEdit;
