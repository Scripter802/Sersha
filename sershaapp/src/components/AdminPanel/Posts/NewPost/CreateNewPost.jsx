import React, { useState } from 'react';
import { useGlobalContext } from '../../../../context/context';
import Dropzone from 'react-dropzone';
import './createnewpost.css'

const CreatePost = () => {
    const { allPosts, setAllPosts,  createNewPost, setCreateNewPost } = useGlobalContext();
    const [profileName, setProfileName] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);

    const handleImageDrop = (acceptedFiles) => {
        // Handle image upload here
        const file = acceptedFiles[0];
        setImage(file);
    };

    const handleSubmit = () => {
        // Save the new post data
        const newPost = {
            id: allPosts.length + 1, // Generate a unique ID for the new post
            profileName,
            text,
            image: image ? URL.createObjectURL(image) : null, // Convert image to URL
        };

        // Update the list of posts
        setAllPosts([...allPosts, newPost]);

        // Reset form fields
        setProfileName('');
        setText('');
        setImage(null);
        setCreateNewPost(false);
    };

    return (
        <div className="newpostcontainer">
            <div className="close-btn" onClick={() => setCreateNewPost(false)}>X</div>
            <h3 className="p-3 text-center">Create New Post</h3>
            <div>
                <label>Profile Name:</label>
                <input className='postProfileName' type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)} />
            </div>
            <div>
                <label>Text:</label>
                <textarea value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <div>
                <label>Image:</label>
                <Dropzone onDrop={handleImageDrop}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} className="dropzone">
                            <input {...getInputProps()} />
                            {image ? (
                                <img src={URL.createObjectURL(image)} alt="Post" className="uploaded-image" />
                            ) : (
                                <p>Drag 'n' drop an image here, or click to select an image</p>
                            )}
                        </div>
                    )}
                </Dropzone>
            </div>
            <button className='newPostBtn' onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default CreatePost;
