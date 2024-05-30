import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../../../context/context';
import Dropzone from 'react-dropzone';
import closeButton from '../../../../assets/images/adminPanel/closeButton.png'
import './editPostAuthor.css';
import axios from 'axios';

const EditPostAuthor = () => {
  const { baseUrl, baseUrlImage, editingPost, setIsPostEdit, setAllAuthors, allAuthors, isPostAuthorEdit, setIsPostAuthorEdit, editingPostAuthor, setEditingPostAuthor } = useGlobalContext();
  const [postAuthorName, setPostAuthorName] = useState('');
  const [postAuthorImage, setPostAuthorImage] = useState(null);


  useEffect(() => {
    if (editingPostAuthor) {
      setPostAuthorName(editingPostAuthor.authorName);
      setPostAuthorImage(editingPostAuthor.authorImagePath);
    }
  }, [editingPostAuthor]);

  const handleImageDrop = (acceptedFiles) => {
    setPostAuthorImage(acceptedFiles[0]);
  };

  const handleSubmit = async () => {

    const newPostAuthorFormData = new FormData();
    newPostAuthorFormData.append("Id", editingPostAuthor.id);
    newPostAuthorFormData.append("authorName", postAuthorName);
    newPostAuthorFormData.append("authorImage", postAuthorImage);


    await axios.put(`${baseUrl}/Author/${editingPostAuthor.id}`, newPostAuthorFormData);
    setAllAuthors(prevAuthors => prevAuthors.map(author => author.id === editingPostAuthor.id ? updatedPost : post));
    setIsPostAuthorEdit(false);
  };

  return (
    <div className="editPostAuthorContainer">
      <div className="close-btnAuthor" onClick={() => setIsPostAuthorEdit(false)}><img src={closeButton} alt='close' /></div>
      <h3 className="p-3 text-center">Edit Author</h3>
      <div>
        <label>Author Name</label>
        <input className='postAuthorName' type="text" value={postAuthorName} placeholder='AuthorName' onChange={(e) => setPostAuthorName(e.target.value)} />
      </div>

      <div>
        <label>Author Image</label>
        <Dropzone onDrop={handleImageDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="dropzoneAuthor">
              <input {...getInputProps()} />
              {postAuthorImage ? (
                <img src={typeof postAuthorImage === 'string' ? `${baseUrlImage}/${postAuthorImage}` : URL.createObjectURL(postAuthorImage)} alt="Author Image" className="uploaded-imageAuthor" />
              ) : (
                <p>Drag 'n' drop an image here, or click to select an image</p>
              )}
            </div>
          )}
        </Dropzone>
      </div>

      <button className='newPostAuthorEditBtn' onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default EditPostAuthor