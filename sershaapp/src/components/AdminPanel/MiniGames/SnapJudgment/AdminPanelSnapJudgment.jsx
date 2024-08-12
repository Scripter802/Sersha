import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../../../context/context';
import './adminPanelSnapJudgment.css';
import SnapJudgmentCreateNew from './SnapJudgmentCreateNew/SnapJudgmentCreateNew';
import SnapJudgmentEdit from './SnapJudgmentEdit/SnapJudgmentEdit';
import axios from 'axios';

const AdminPanelSnapJudgment = () => {
  const { baseUrl, baseUrlImage, snapJudgmentCreateNew,
    setSnapJudgmentCreateNew,
    editingSnapJudgment,
    setEditingSnapJudgment,
    isSnapJudgmentEdit,
    setIsSnapJudgmentEdit,
    allSnapJudgmentAssignments,
    setAllSnapJudgmentAssignments,
  } = useGlobalContext();
  let dif;
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

  const handleEditSnapJudgment = (post) => {
    console.log(post)
    setEditingSnapJudgment(post);
    setIsSnapJudgmentEdit(true)
  };

  const handleDeleteSnapJudgment = async (post) => {
    try {
      const response = await axios.delete(`${baseUrl}/Quizzes/${post.id}`);
      if (response.status === 200) {


        // Update the allQuizzes state by filtering out the deleted quiz
        const updatedAssignments = allSnapJudgmentAssignments.filter(q => q.id !== post.id);
        setAllSnapJudgmentAssignments(updatedAssignments);
      }
    } catch (error) {
      console.error('Error deleting the question:', error);
    }
  };

  useEffect(() => {
    const fetchAllQuizzesEasy = async () => {
      try {
        const response = await axios.get(`${baseUrl}/Quizzes`);
        console.log(`response: ${response.data}`);
        const filteredData = response.data.filter(res => res.questions[0].type === 4);

        // Avoid adding duplicates
        setAllSnapJudgmentAssignments(prev => {
          const newAssignments = filteredData.filter(newRes =>
            !prev.some(prevRes => prevRes.id === newRes.id) // assuming each quiz has a unique id
          );
          return [...prev, ...newAssignments];
        });
      } catch (error) {
        console.error('Error fetching Snap Judgement questions:', error);
      }
    };

    fetchAllQuizzesEasy();

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
          <div className='titleWrapper'>
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
                  <td data-label="Image"><img src={`${baseUrlImage}${post?.questions[0]?.imagePath}`} alt="Post Image" /></td>
                  <td data-label="AuthorName">{post?.questions[0]?.text}</td>
                  <td data-label="Content">{post?.questions[0]?.content}</td>
                  <td data-label="AuthorName">{post?.questions[0]?.answers.map((ans, i) => (
                    ans.isCorrect ? ans.text : ''
                  ))}</td>
                  <td data-label="Bundle">{post.difficulty == '0' ? 'Easy' : post.difficulty == '1' ? 'Medium' : 'Hard'}</td>

                  <td data-label="Edit/Delete" className='settingsData'>
                    <button className="edit-btn" onClick={() => handleEditSnapJudgment(post)}>Edit</button>

                    <button className="delete-btn" onClick={() => handleDeleteSnapJudgment(post)}>Delete</button>
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
