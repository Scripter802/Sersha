import React, { useEffect } from 'react'
import { useGlobalContext } from '../../../context/context';
import axios from 'axios'

import './adminPanelListOfPosts.css'
import AdminPanelCreateNewPost from './NewPost/AdminPanelCreateNewPost';
import AdminPanelEditPost from './EditPost/AdminPanelEditPost';

const AdminPanelListOfPosts = () => {
  const { baseUrl, baseUrlImage, allPosts, setAllPosts, getAllAuthors, createNewPost, setCreateNewPost, isPostEdit, setIsPostEdit, isPostsLoading, setIsPostsLoading, getAllPosts, handleDeletePost, setEditingPost } = useGlobalContext();

  useEffect(() => {
    getAllPosts()
    getAllAuthors()
  }, [createNewPost]);

  console.log(allPosts)



  const handleEditPost = (post) => {
    setEditingPost(post);
    setIsPostEdit(true);
  };

  return (
    <>
      {createNewPost === true ? (
        <AdminPanelCreateNewPost />) :
        isPostEdit === true ? (
          <AdminPanelEditPost />
        )
          : (
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
                      <td>{post.title}{console.log(post)}</td>
                      <td>{post.imagePath != null ? <img src={`http://192.168.1.7:8080/api${post.imagePath}`} alt="postImage" /> : <p style={{ textAlign: 'center' }}>/</p>}</td>
                      <td>
                        {post.stage}
                      </td>
                      <td>{post.type}</td>
                      <td>{post.author.authorName}</td>
                      <td className='settingsData'>
                        <button className="edit-btn" onClick={() => handleEditPost(post)}>Edit</button>

                        <button className="delete-btn" onClick={() => handleDeletePost(post.id)}>Delete</button>
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
