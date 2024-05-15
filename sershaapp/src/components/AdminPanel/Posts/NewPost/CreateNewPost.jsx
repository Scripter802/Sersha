import React, { useState } from 'react';
import { useGlobalContext } from '../../../../context/context';
import Dropzone from 'react-dropzone';
import closeButton from '../../../../assets/images/adminPanel/closeButton.png'
import './createnewpost.css'

const CreatePost = () => {
    const { allPosts, setAllPosts,  createNewPost, setCreateNewPost } = useGlobalContext();
    const [postProfileName, setPostProfileName] = useState('');
    const [postContentImage, setPostContentImage] = useState(null);
    const [postAuthor, setPostAuthor] = useState('');
    const [postBundle, setPostBundle] = useState('');
    const [postType, setPostType] = useState('');

    const handleImageDrop = (acceptedFiles) => {
        // Handle image upload here
        const file = acceptedFiles[0];
        setPostContentImage(file);
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
            <div className="close-btn" onClick={() => setCreateNewPost(false)}><img src={closeButton} alt='close' /></div>
            <h3 className="p-3 text-center">Create New Post</h3>
            <div>
                <label>Headline:</label>
                <input className='postProfileName' type="text" value={postProfileName} placeholder='Title' onChange={(e) => setPostProfileName(e.target.value)} />
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
                <select className='postAuthor' type="dropdown" value={postAuthor} placeholder='Author' onChange={(e) => setPostAuthor(e.target.value)} >
                    <option value="fox">Sersha the fox</option>
                    <option value="Jess">Jess</option>
                    <option value="John">John</option>
                    <option value="Nicky">Nicky</option>
                    <option value="Sam">Sam</option>
                    <option value="Jess">Jess</option>
                </select>
            </div>

            <div>
                <label>Bundle</label>
                <select className='postBundles' type="dropdown" value={postBundle} placeholder='Choose a bundle' onChange={(e) => setPostBundle(e.target.value)} >
                    <option value="easy">Easy Bundle</option>
                    <option value="medium">Medium Bundle</option>
                    <option value="hard">Hard Bundle</option>
                </select>
            </div>
            
            <div>
                <label>Type of Post</label>
                <select className='postType' type="dropdown" value={postType} placeholder='Type of Post' onChange={(e) => setPostType(e.target.value)} >
                    <option value="check-in">Check-in</option>
                    <option value="headline">Headline</option>
                    <option value="status">Status</option>
                </select>
            </div>

            <button className='newPostBtn' onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default CreatePost;
