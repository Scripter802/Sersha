import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../../../context/context';
import Dropzone from 'react-dropzone';
import closeButton from '../../../../assets/images/adminPanel/closeButton.png'
import './adminPanelEditPost.css';
import axios from 'axios';

const AdminPanelEditPost = () => {
    const { baseUrl, editingPost, setIsPostEdit, setAllPosts } = useGlobalContext();
    const [postHeadline, setPostHeadline] = useState('');
    const [postContentImage, setPostContentImage] = useState(null);
    const [postAuthor, setPostAuthor] = useState(editingPost.postAuthor);
    const [postBundle, setPostBundle] = useState(editingPost.stage);
    const [postType, setPostType] = useState(editingPost.type);

    console.log(postHeadline, postAuthor, postBundle, postType)

    useEffect(() => {
        if (editingPost) {
            setPostHeadline(editingPost.title);
            setPostContentImage(editingPost.imagePath);
            setPostAuthor(editingPost.author);
            setPostBundle(editingPost.stage);
            setPostType(editingPost.type);
        }
    }, [editingPost]);

    const handleImageDrop = (acceptedFiles) => {
        setPostContentImage(acceptedFiles[0]);
    };

    const handleSubmit = async () => {
        const updatedPost = {
            ...editingPost,
            title: postHeadline,
            author: postAuthor,
            stage: postBundle,
            type: postType,
            // Handle image upload if necessary
        };

        if (postContentImage && typeof postContentImage !== 'string') {
            const formData = new FormData();
            formData.append('file', postContentImage);
            const imageUploadResponse = await axios.post(`${baseUrl}/upload`, formData);
            updatedPost.imagePath = imageUploadResponse.data.path;
        }

        await axios.put(`${baseUrl}/post/${editingPost.id}`, updatedPost);
        setAllPosts(prevPosts => prevPosts.map(post => post.id === editingPost.id ? updatedPost : post));
        setIsPostEdit(false);
    };

    return (
        <div className="newpostcontainer">
            <div className="close-btn" onClick={() => setIsPostEdit(false)}><img src={closeButton} alt='close' /></div>
            <h3 className="p-3 text-center">Edit Post</h3>
            <div>
                <label>Headline:</label>
                <input className='postHeadline' type="text" value={postHeadline} placeholder='Title' onChange={(e) => setPostHeadline(e.target.value)} />
            </div>

            <div>
                <label>News Feed Content Image</label>
                <Dropzone onDrop={handleImageDrop}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} className="dropzone">
                            <input {...getInputProps()} />
                            {postContentImage ? (
                                <img src={typeof postContentImage === 'string' ? `${baseUrl}/${postContentImage}` : URL.createObjectURL(postContentImage)} alt="Post" className="uploaded-image" />
                            ) : (
                                <p>Drag 'n' drop an image here, or click to select an image</p>
                            )}
                        </div>
                    )}
                </Dropzone>
            </div>

            <div>
                <label>Author</label>
                <select className='postAuthor' value={postAuthor} onChange={(e) => setPostAuthor(e.target.value)}>
                    <option value="fox" selected={postAuthor === 'Sersha the fox'}>Sersha the fox</option>
                    <option value="Jess" selected={postAuthor === 'Jess'}>Jess</option>
                    <option value="John" selected={postAuthor === 'John'}>John</option>
                    <option value="Nicky" selected={postAuthor === 'Nicky'}>Nicky</option>
                    <option value="Sam" selected={postAuthor === 'Sam'}>Sam</option>
                </select>
            </div>

            <div>
                <label>Bundle</label>
                <select className='postBundles' value={postBundle} onChange={(e) => setPostBundle(e.target.value)}>
                    <option value="Easy" selected={postBundle === 'Easy'}>Easy Bundle</option>
                    <option value="Medium" selected={postBundle === 'Medium'}>Medium Bundle</option>
                    <option value="Hard" selected={postBundle === 'Hard'}>Hard Bundle</option>
                </select>
            </div>

            <div>
                <label>Type of Post</label>
                <select className='postType' onChange={(e) => setPostType(e.target.value)}>
                    <option value="Check-in" selected={postType === 'Check-in'}>Check-in</option>
                    <option value="Headline" selected={postType === 'Headline'}>Headline</option>
                    <option value="Status" selected={postType === 'Status'}>Status</option>
                </select>
            </div>

            <button className='newPostBtn' onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default AdminPanelEditPost;