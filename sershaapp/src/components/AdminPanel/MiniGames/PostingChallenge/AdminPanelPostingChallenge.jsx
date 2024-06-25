import React, { useEffect } from 'react';
import { useGlobalContext } from '../../../../context/context';
import './adminPanelPostingChallenge.css';
import PostingChallengeCreateNew from './PostingChallengeCreateNew/PostingChallengeCreateNew';
import PostingChallengeEdit from './PostingChallengeEdit/PostingChallengeEdit';
import axios from 'axios';

const AdminPanelPostingChallenge = () => {
  const {
    baseUrl,
    baseUrlImage,
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

  const handleDeletePostingChallenge = async (post) => {
    try {
      const response = await axios.delete(`${baseUrl}/Quizzes/${post.id}`);
      if (response.status === 200) {


        // Update the allQuizzes state by filtering out the deleted quiz
        const updatedQuizzes = allPostingChallengeAssignments.filter(q => q.id !== post.id);
        setAllQuizzes(updatedQuizzes);
      }
    } catch (error) {
      console.error('Error deleting the question:', error);
    }
  };

  useEffect(() => {
    const fetchAllPostingChallenge = async () => {
      try {
        const response = await axios.get(`${baseUrl}/Quizzes/ListMinigameQuestionsByTypeAndDifficulty/0/7`);
        setAllPostingChallengeAssignments(response.data);
      } catch (error) {
        console.error('Error fetching Posting Challenge assignment:', error);
      }
    };

    fetchAllPostingChallenge();
  }, [postingChallengeCreateNew, editingPostingChallenge]);
  console.log(allPostingChallengeAssignments)


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
                  <td data-label="Image"><img src={`${baseUrlImage}${post.imagePath}`} alt="Post Image" /></td>
                  <td data-label="AuthorName">{post.text}</td>
                  <td data-label="PostContent">{post.content}</td><td data-label="AuthorName">{post.answers.map((ans, i) => (
                    ans.isCorrect ? ans.text : ''
                  ))}</td>
                  <td data-label="Stage">Easy</td>
                  <td data-label="Edit/Delete" className='settingsData'>
                    <button className="edit-btn" onClick={() => handleEditPostingChallenge(index)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDeletePostingChallenge(post)}>Delete</button>
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
