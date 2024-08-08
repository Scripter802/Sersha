import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../../../context/context';
import Dropzone from 'react-dropzone';
import closeButton from '../../../../assets/images/adminPanel/closeButton.png'
import './adminPanelEditPost.css';
import axios from 'axios';

const AdminPanelEditPost = () => {
    const { baseUrl, baseUrlImage, editingPost, setIsPostEdit, setAllPosts, allAuthors } = useGlobalContext();
    const [postHeadline, setPostHeadline] = useState('');
    const [postContentImage, setPostContentImage] = useState(null);
    const [postAuthor, setPostAuthor] = useState(editingPost.postAuthor);
    const [postBundle, setPostBundle] = useState(editingPost.stage);
    const [postType, setPostType] = useState(editingPost.type);
    const [postId, setPostId] = useState(editingPost.id);

    console.log(editingPost)

    useEffect(() => {
        if (editingPost) {
            setPostId(editingPost.id)
            setPostHeadline(editingPost.title);
            setPostContentImage(editingPost.imagePath);
            setPostAuthor(editingPost.authorId);
            setPostBundle(editingPost.stage);
            setPostType(editingPost.type);
        }
        console.log(`postAuthor: ${editingPost}`)
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
            image: postContentImage,
        };

        const updatedPostFormData = new FormData();
        updatedPostFormData.append("Id", postId);
        updatedPostFormData.append("Title", postHeadline);
        updatedPostFormData.append("Content", "/");
        updatedPostFormData.append("Image", postContentImage);
        updatedPostFormData.append("Stage", postBundle);
        updatedPostFormData.append("Type", postType);
        updatedPostFormData.append("AuthorId", postAuthor);
        console.log(postAuthor.id)


        // await axios.put(`${baseUrl}/post/${editingPost.id}`, updatedPostFormData, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //         'Access-Control-Allow-Origin': '*',
        //         'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        //     },
        // });

        setAllPosts(prevPosts => prevPosts.map(post => post.id === editingPost.id ? updatedPost : post));
        setIsPostEdit(false);
    };

    return (
        <div className="editpostcontainer">
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
                                <img src={typeof postContentImage === 'string' ? `${baseUrlImage}/${postContentImage}` : URL.createObjectURL(postContentImage)} alt="Post" className="uploaded-image" />
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
                    {allAuthors.map((author) => (
                        <option value={author.id} key={author.id}>{author.authorName}</option>
                    ))}
                    {console.log(postAuthor)}
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