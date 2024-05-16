import React, { useEffect } from 'react'
import { useGlobalContext } from '../../../context/context';
import axios from 'axios'

import './adminPanelListOfPosts.css'
import AdminPanelCreateNewPost from './NewPost/AdminPanelCreateNewPost';

const AdminPanelListOfPosts = () => {
  const { baseUrl, allPosts, setAllPosts, createNewPost, setCreateNewPost, isPostsLoading, setIsPostsLoading, getAllPosts } = useGlobalContext();

  useEffect(() => {
    getAllPosts()
  }, []);

  console.log(allPosts)

  const handleDelete = (postId) => {

  };

  const handleEdit = (postId) => {

  };

  return (
    <>
      {createNewPost === true ? (
        <AdminPanelCreateNewPost />) : (
        <div className="listOfPostsContainer">
          <div className='createNewPostBtnWrapper'>
            <h3 className="p-3 text-center">All Posts</h3>
            <button className="create-post-btn" onClick={() => (setCreateNewPost(true))}>Create New Post</button>
          </div>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Headline</th>
                <th>Content Image</th>
                <th>Bundle</th>
                <th>Type of Post</th>
                <th>Author</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {allPosts && allPosts.map(post =>
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td><img src={post?.image} alt="postImage" /></td>
                  <td>
                    {post.stage == '1' && 'Easy Bundle'}
                    {post.stage == '2' && 'Medium Bundle'}
                    {post.stage == '3' && 'Hard Bundle'}
                  </td>
                  <td>{post.type}</td>
                  <td><img src={`${baseUrl}/${post?.imagePath}`} />{post?.author}</td>
                  <td className='settingsData'>
                    <button className="edit-btn" onClick={() => handleEdit(post.id)}>Edit</button>

                    <button className="delete-btn" onClick={() => handleDelete(post.id)}>Delete</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default AdminPanelListOfPosts