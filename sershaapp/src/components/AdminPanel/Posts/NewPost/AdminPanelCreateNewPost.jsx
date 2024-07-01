import React, { useState } from 'react';
import { useGlobalContext } from '../../../../context/context';
import Dropzone from 'react-dropzone';
import closeButton from '../../../../assets/images/adminPanel/closeButton.png'
import './adminPanelCreateNewPost.css'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const AdminPanelCreateNewPost = () => {
    const { baseUrl, allAuthors, getAllAuthors, allPosts, setAllPosts, createNewPost, setCreateNewPost } = useGlobalContext();
    const [postHeadline, setPostHeadline] = useState('');
    const [postContentImage, setPostContentImage] = useState(null);
    const [postAuthor, setPostAuthor] = useState('');
    const [postBundle, setPostBundle] = useState('');
    const [postType, setPostType] = useState('');

    const handleImageDrop = (acceptedFiles) => {
        // Handle image upload here
        const file = acceptedFiles[0];
        setPostContentImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const uniqueId = uuidv4();

        // Save the new post data
        const newPostFormData = new FormData();
        newPostFormData.append("Id", uniqueId);
        newPostFormData.append("Title", postHeadline);
        newPostFormData.append("Content", "/");
        newPostFormData.append("Image", postContentImage);
        newPostFormData.append("Stage", postBundle);
        newPostFormData.append("Type", postType);
        newPostFormData.append("AuthorId", postAuthor);
        console.log(postAuthor.id)
        // Reset form fields
        setPostHeadline('');
        setPostContentImage('');
        try {
            const response = await axios.post(`${baseUrl}/Post`, newPostFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setCreateNewPost(false);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    console.log(allPosts)
    return (
        <div className="adminPanelCreateNewWrapper">
            <div className="close-btn" onClick={() => setCreateNewPost(false)}><img src={closeButton} alt='close' /></div>
            <h3 className="p-3 text-center">Create New Post</h3>
            <div>
                <label>Headline:</label>
                <input className='inputField' type="text" value={postHeadline} placeholder='Title' onChange={(e) => setPostHeadline(e.target.value)} />
            </div>

            <div>
                <label>News Feed Content Image</label>
                <Dropzone onDrop={handleImageDrop}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} className="dropzone">
                            <input {...getInputProps()} />
                            {postContentImage ? (
                                <img src={URL.createObjectURL(postContentImage)} alt="Post" className="uploaded-image" />
                            ) : (
                                <p>Drag 'n' drop an image here, or click to select an image</p>
                            )}
                        </div>
                    )}
                </Dropzone>
            </div>

            <div>
                <label>Author</label>
                <select className='inputField' type="dropdown" value={postAuthor} placeholder='Author' onChange={(e) => setPostAuthor(e.target.value)} >
                    <option value="" disabled >Select Author</option>
                    {allAuthors.map((author) => (
                        <option value={author.id} key={author.id}>{author.authorName}</option>
                    ))}
                    {console.log(postAuthor)}
                </select>
            </div>

            <div>
                <label>Bundle</label>
                <select className='inputField' type="dropdown" value={postBundle} placeholder='Choose a bundle' onChange={(e) => setPostBundle(e.target.value)} >
                    <option value="" disabled>Select Bundle</option>
                    <option value="Easy">Easy Bundle</option>
                    <option value="Medium">Medium Bundle</option>
                    <option value="Hard">Hard Bundle</option>
                </select>
            </div>

            <div>
                <label>Type of Post</label>
                <select className='inputField' type="dropdown" value={postType} placeholder='Type of Post' onChange={(e) => setPostType(e.target.value)} >
                    <option value="" disabled>Select Type</option>
                    <option value="Check-in">Check-in</option>
                    <option value="Headline">Headline</option>
                    <option value="Status">Status</option>
                </select>
            </div>

            <button className='submitBtn' onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default AdminPanelCreateNewPost;
