import React, { useState } from 'react';
import { useGlobalContext } from '../../../../context/context';
import Dropzone from 'react-dropzone';
import closeButton from '../../../../assets/images/adminPanel/closeButton.png'
import './createNewPostAuthor.css'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const CreateNewPostAuthor = () => {
  const { baseUrl, setCreateNewPostAuthor } = useGlobalContext();
  const [authorId, setAuthorId] = useState('');
  const [newPostAuthorName, setNewPostAuthorName] = useState('');
  const [newPostAuthorImage, setNewPostAuthorImage] = useState(null);
  const [newPostAuthorImagePath, setNewPostAuthorImagePath] = useState('');

  const handleImageDrop = (acceptedFiles) => {
    // Handle image upload here
    const file = acceptedFiles[0];
    setNewPostAuthorImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uniqueId = uuidv4();

    // Save the new post data
    const newPostAuthorFormData = new FormData();
    newPostAuthorFormData.append("Id", uniqueId);
    newPostAuthorFormData.append("authorName", newPostAuthorName);
    newPostAuthorFormData.append("AuthorImage", newPostAuthorImage);
    newPostAuthorFormData.append("authorImagePath", '/');
    // Reset form fields
    setNewPostAuthorName('');
    setNewPostAuthorImage('');
    try {
      const response = await axios.post(`${baseUrl}/Author`, newPostAuthorFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setCreateNewPostAuthor(false);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="adminPanelCreateNewWrapper">
      <div className="close-btn" onClick={() => setCreateNewPostAuthor(false)}><img src={closeButton} alt='close' /></div>
      <h3 className="p-3 text-center">Create New Author</h3>
      <div>
        <label>Author name:</label>
        <input className='inputField' type="text" value={newPostAuthorName} placeholder='Author Name' onChange={(e) => setNewPostAuthorName(e.target.value)} />
      </div>

      <div>
        <label>Author Image:</label>
        <Dropzone onDrop={handleImageDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="dropzoneAuthor">
              <input {...getInputProps()} />
              {newPostAuthorImage ? (
                <img src={URL.createObjectURL(newPostAuthorImage)} alt="Author" className="uploaded-image-Author" />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <p>Drag 'n' drop an image here</p>
                  <p>or click to select an image</p>
                </div>
              )}
            </div>
          )}
        </Dropzone>
      </div>

      <button className='submitBtn' onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CreateNewPostAuthor;
