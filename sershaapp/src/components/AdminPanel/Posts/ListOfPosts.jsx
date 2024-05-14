import React from 'react'
import { useGlobalContext } from '../../../context/context';

import './listofposts.css'
import CreatePost from './NewPost/CreateNewPost';

const ListOfPosts = () => {
    const { allPosts, setAllPosts, createNewPost, setCreateNewPost } = useGlobalContext();
    

    const handleDelete = (postId) => {

    };

    const handleEdit = (postId) => {

    };

  return (
      <div className="listOfPostsContainer">
        {createNewPost === true ? (
             <CreatePost /> ) : (
                <>
            <h3 className="p-3 text-center">All Posts</h3>
            <button className="create-post-btn" onClick={() => (setCreateNewPost(true))}>Create New Post</button>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Image</th>
                        <th>Stage</th>
                        <th>Author</th>
                        <th>Author photo</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {allPosts && allPosts.map(post =>
                        <tr key={post.id}>
                            <td><img src={post.profilePicture} alt="" /> {post.profileName}</td>
                            <td><img src={post?.image} alt="postImage" /></td>
                            <td>{post.text}</td>
                            <td className='settingsData'>
                                <button className="edit-btn" onClick={() => handleEdit(post.id)}>Edit</button>
                            
                                <button className="delete-btn" onClick={() => handleDelete(post.id)}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
        )}
            </div>
    );
}

export default ListOfPosts