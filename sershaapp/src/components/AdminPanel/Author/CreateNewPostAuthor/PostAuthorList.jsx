import React, { useEffect } from 'react'
import { useGlobalContext } from '../../../../context/context';
import axios from 'axios'

import './postAuthorList.css'
import CreateNewPostAuthor from './CreateNewPostAuthor';
import AdminPanelEditPostAuthor from './EditPostAuthor';
import EditPostAuthor from './EditPostAuthor';

const PostAuthorList = () => {
  const { baseUrl, baseUrlImage, getAllAuthors, allAuthors, createNewPostAuthor, setCreateNewPostAuthor, isPostAuthorEdit, setIsPostAuthorEdit, editingPostAuthor, setEditingPostAuthor, handleDeleteAuthor } = useGlobalContext();

  useEffect(() => {
    getAllAuthors()
  }, [createNewPostAuthor, isPostAuthorEdit]);



  const handleEdit = (author) => {
    setEditingPostAuthor(author);
    setIsPostAuthorEdit(true);
  };

  return (
    <>
      {createNewPostAuthor === true ? (
        <CreateNewPostAuthor />) :
        isPostAuthorEdit === true ? (
          <EditPostAuthor />
        )
          : (
            <div className="listOfPostsContainer">
              <div className='titleWrapper'>
                <h3 className="p-3 text-center">All Authors</h3>
                <button className="create-post-btn" onClick={() => (setCreateNewPostAuthor(true))}>Create New Author</button>
              </div>
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Author Name</th>
                    <th>Author Image</th>
                    <th>Edit/Delete</th>
                  </tr>
                </thead>
                <tbody>

                  {allAuthors && allAuthors.map((author, index) =>
                    <tr key={author.id}>
                      <td data-label="No.">{index + 1}</td>
                      <td data-label="Author Name">{author.authorName}</td>
                      <td data-label="Author Image">{author.authorImagePath ? <img src={`${baseUrlImage}${author.authorImagePath}`} alt="postAuthorImage" /> : <p style={{ textAlign: 'center' }}>/</p>}</td>

                      <td data-label="Edit/delete" className='settingsData'>
                        <button className="edit-btn" onClick={() => handleEdit(author)}>Edit</button>

                        <button className="delete-btn" onClick={() => handleDeleteAuthor(author.id)}>Delete</button>
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

export default PostAuthorList
