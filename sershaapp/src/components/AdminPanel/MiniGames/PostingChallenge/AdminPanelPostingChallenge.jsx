import React from 'react';
import { useGlobalContext } from '../../../../context/context';
import './adminPanelPostingChallenge.css';
import PostingChallengeCreateNew from './PostingChallengeCreateNew/PostingChallengeCreateNew';
import PostingChallengeEdit from './PostingChallengeEdit/PostingChallengeEdit';

const AdminPanelPostingChallenge = () => {
  const {
    postingChallengeCreateNew,
    setPostingChallengeCreateNew,
    isPostingChallengeEdit,
    setIsPostingChallengeEdit,
    editingPostingChallenge,
    setEditingPostingChallenge,
    allPostingChallengeAssignments,
    setAllPostingChallengeAssignments,
  } = useGlobalContext();

  const handleEditPostingChallenge = (index) => {
    setEditingPostingChallenge(allPostingChallengeAssignments[index]);
    setIsPostingChallengeEdit(true);
  };

  const handleDeletePostingChallenge = (index) => {
    // const updatedAssignments = allPostingChallengeAssignments.filter((_, i) => i !== index);
    // setAllPostingChallengeAssignments(updatedAssignments);
  };

  return (
    <>
      {postingChallengeCreateNew ? (
        <PostingChallengeCreateNew />
      ) : isPostingChallengeEdit ? (
        <PostingChallengeEdit />
      ) : (
        <div className='SnapJudgmentWrapperList'>
          <div className='createNewSnapJudgmentBtnWrapper'>
            <h3 className="snapJudgmentTitle">Posting Challenge</h3>
            <button className="createNewSnapJudgmentBtn" onClick={() => setPostingChallengeCreateNew(true)}>Create New Question</button>
          </div>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>No.</th>
                <th>Image</th>
                <th>Author Name</th>
                <th>Post Content</th>
                <th>Correct Answer</th>
                <th>Stage</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {allPostingChallengeAssignments && allPostingChallengeAssignments.map((post, index) =>
                <tr key={index}>
                  <td data-label="No.">{index + 1}</td>
                  <td data-label="Image"><img src={post.Image} alt="Post Image" /></td>
                  <td data-label="AuthorName">{post.AuthorName}</td>
                  <td data-label="PostContent">{post.PostContent}</td>
                  <td data-label="CorrectAnswer">{post.CorrectAnswer}</td>
                  <td data-label="Stage">{post.Stage}</td>
                  <td data-label="Edit/Delete" className='settingsData'>
                    <button className="edit-btn" onClick={() => handleEditPostingChallenge(index)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDeletePostingChallenge(index)}>Delete</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default AdminPanelPostingChallenge;
