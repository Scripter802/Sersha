import { useEffect } from 'react';
import { useGlobalContext } from '../../../../../context/context'
import AdminCorrectIncorrectEdit from './AdminCorrectIncorrectEdit/AdminCorrectIncorrectEdit';
import AdminCorrectIncorrectCreateNew from './CorrectIncorrectCreateNew/AdminCorrectIncorrectCreateNew'
import './adminCorrectIncorrectPreview.css'
import axios from 'axios';

const AdminCorrectIncorrectPreview = () => {
  const { correctIncorrectAPI,
    correctIncorrectCreateNew,
    setCorrectIncorrectCreateNew,
    allCorrectIncorrect,
    setAllCorrectIncorrect,
    isCorrectIncorrectEdit,
    setIsCorrectIncorrectEdit,
    setEditingCorrectIncorrect,
  } = useGlobalContext();

  const statement = [
    {
      Statement: "The Great Wall of China is visible from space.",
      isTrue: true,
      Stage: 'Easy',
    },
    {
      Statement: "The Great Wall of China is visible from space.",
      isTrue: false,
      Stage: 'Easy',
    },
    {
      Statement: "The Great Wall of China is visible from space.",
      isTrue: true,
      Stage: 'Easy',
    },
    {
      Statement: "The Great Wall of China is visible from space.",
      isTrue: false,
      Stage: 'Easy',
    },
  ];

  useEffect(() => {
    const fetchRightAnswerQuestions = async () => {
      try {
        const response = await axios.get(correctIncorrectAPI);
        setAllCorrectIncorrect(response.data);

        console.log(allCorrectIncorrect)
      } catch (error) {
        console.error('Error fetching right answer questions:', error);
      }
    };

    fetchRightAnswerQuestions();
  }, [setAllCorrectIncorrect]);

  const handleEditStatement = (index) => {
    setEditingCorrectIncorrect(statement[index]);
    setIsCorrectIncorrectEdit(true);
  };

  const handleDeleteStatement = (index) => {
    // Add your delete logic here
  };


  return (
    <>
      {correctIncorrectCreateNew ? (
        <AdminCorrectIncorrectCreateNew />
      ) : isCorrectIncorrectEdit ? (
        <AdminCorrectIncorrectEdit />
      ) : (
        <div className='correctIncorrectWrapperList'>
          <div className='createNewCorrectIncorrectBtnWrapper'>
            <h3 className="quizTitle">Correct/Incorrect</h3>
            <button className="createNewCorrectIncorrectQuestionBtn" onClick={() => (setCorrectIncorrectCreateNew(true))}>Create New Question</button>
          </div>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>No.</th>
                <th>Question</th>
                <th>Correct Answer</th>
                <th>BundleBundle</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {statement && statement.map((state, index) =>
                <tr key={index}>
                  <td data-label="No.">{index + 1}</td>
                  <td data-label="Question">{state.Statement}</td>
                  <td data-label="Correct Answer">{state.isTrue === true ? "True" : 'False'}</td>
                  <td data-label="Bundle">{state.Stage}</td>

                  <td data-label="Edit/Delete" className='settingsData'>
                    <button className="edit-btn" onClick={() => handleEditStatement(index)}>Edit</button>

                    <button className="delete-btn" onClick={() => handleDeleteStatement(index)}>Delete</button>
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

export default AdminCorrectIncorrectPreview
