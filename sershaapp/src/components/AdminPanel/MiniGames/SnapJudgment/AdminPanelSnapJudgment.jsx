import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../../../context/context';
import './adminPanelSnapJudgment.css';
import SnapJudgmentCreateNew from './SnapJudgmentCreateNew/SnapJudgmentCreateNew';
import SnapJudgmentEdit from './SnapJudgmentEdit/SnapJudgmentEdit';
import axios from 'axios';

const AdminPanelSnapJudgment = () => {
  const { baseUrl, snapJudgmentCreateNew,
    setSnapJudgmentCreateNew,
    editingSnapJudgment,
    setEditingSnapJudgment,
    isSnapJudgmentEdit,
    setIsSnapJudgmentEdit,
    allSnapJudgmentAssignments,
    setAllSnapJudgmentAssignments,
  } = useGlobalContext();
  // const [postImage, setPostImage] = useState(null);
  // const [postAuthor, setPostAuthor] = useState('');
  // const [postContent, setPostContent] = useState('');
  // const [correctAnswer, setCorrectAnswer] = useState('');

  const allSnapJudgment = [
    {
      Image: null,
      AuthorName: 'John',
      PostContent: 'Ovo je probni post',
      CorrectAnswer: '',
      Stage: '',
    },
    {
      Image: null,
      AuthorName: '',
      PostContent: 'Ovo je probni post',
      CorrectAnswer: '',
      Stage: '',
    },
    {
      Image: null,
      AuthorName: '',
      PostContent: 'Ovo je probni post',
      CorrectAnswer: '',
      Stage: '',
    },
  ]

  const handleEditSnapJudgment = (index) => {
    setEditingSnapJudgment(index);
    setIsSnapJudgmentEdit(true)
  };

  // const handleDeleteSnapJudgment = (index) => {

  // };

  useEffect(() => {
    const fetchAllQuizzes = async () => {
      try {
        const response = await axios.get(`${baseUrl}/Quizzes/ListMinigameQuestionsByTypeAndDifficulty/0/4`);
        setAllSnapJudgmentAssignments(response.data);
      } catch (error) {
        console.error('Error fetching right answer questions:', error);
      }
    };

    fetchAllQuizzes();
  }, [snapJudgmentCreateNew, editingSnapJudgment]);
  console.log(allSnapJudgmentAssignments)

  return (
    <>
      {snapJudgmentCreateNew ? (
        <SnapJudgmentCreateNew />
      ) : isSnapJudgmentEdit ? (
        <SnapJudgmentEdit />
      ) : (
        <div className='SnapJudgmentWrapperList'>
          <div className='createNewSnapJudgmentBtnWrapper'>
            <h3 className="snapJudgmentTitle">Snap Judgment</h3>
            <button className="createNewSnapJudgmentBtn" onClick={() => (setSnapJudgmentCreateNew(true))}>Create New Question</button>
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
              {allSnapJudgmentAssignments && allSnapJudgmentAssignments.map((post, index) =>
                <tr key={index}>
                  <td data-label="No.">{index + 1}</td>
                  <td data-label="Image"><img src={post.Image} alt="Post Image" /></td>
                  <td data-label="AuthorName">{post.text}</td>
                  <td data-label="Content">{post.content}</td>
                  <td data-label="AuthorName">{post.answers.map((ans, i) => (
                    ans.isCorrect ? ans.text : ''
                  ))}</td>
                  <td data-label="Bundle">Easy</td>

                  <td data-label="Edit/Delete" className='settingsData'>
                    <button className="edit-btn" onClick={() => handleEditSnapJudgment(index)}>Edit</button>

                    <button className="delete-btn" onClick={() => handleDeleteSnapJudgment(index)}>Delete</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )
      }
    </>
  )
}

export default AdminPanelSnapJudgment
