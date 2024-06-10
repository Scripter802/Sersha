import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../../../../context/context';
import AdminCorrectIncorrectEdit from './AdminCorrectIncorrectEdit/AdminCorrectIncorrectEdit';
import AdminCorrectIncorrectCreateNew from './CorrectIncorrectCreateNew/AdminCorrectIncorrectCreateNew';
import './adminCorrectIncorrectPreview.css';
import axios from 'axios';

const AdminCorrectIncorrectPreview = () => {
  const {
    correctIncorrectAPI,
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
      } catch (error) {
        console.error('Error fetching right answer questions:', error);
      }
    };

    fetchRightAnswerQuestions();
  }, [correctIncorrectAPI, setAllCorrectIncorrect]);


  const handleEditStatement = (index) => {
    setEditingCorrectIncorrect(allCorrectIncorrect.questions[index]);
    console.log(`ALL: ${allCorrectIncorrect.questions[index]}`)
    setIsCorrectIncorrectEdit(true);
  };

  const handleDeleteStatement = async (index) => {
    try {
      const statementToDelete = allCorrectIncorrect[index];
      await axios.delete(`${correctIncorrectAPI}/${statementToDelete.id}`);
      setAllCorrectIncorrect(allCorrectIncorrect.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting statement:', error);
    }
  };

  return (
    <>
      {correctIncorrectCreateNew ? (
        <AdminCorrectIncorrectCreateNew />
      ) : isCorrectIncorrectEdit ? (
        <AdminCorrectIncorrectEdit />
      ) : (
        <div className="correctIncorrectWrapperList">
          <div className="createNewCorrectIncorrectBtnWrapper">
            <h3 className="quizTitle">Correct/Incorrect</h3>
            <button
              className="createNewCorrectIncorrectQuestionBtn"
              onClick={() => setCorrectIncorrectCreateNew(true)}
            >
              Create New Question
            </button>
          </div>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>No.</th>
                <th>Question</th>
                <th>Correct Answer</th>
                <th>Bundle</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {allCorrectIncorrect.questions != undefined && allCorrectIncorrect.questions.map((state, index) => (
                <tr key={state.id}>
                  <td data-label="No.">{index + 1}</td>
                  <td data-label="Question">{state.text}</td>
                  <td data-label="Correct Answer">{state.isCorrect ? 'True' : 'False'}</td>
                  <td data-label="Bundle">{state.difficulty}</td>
                  <td data-label="Edit/Delete" className="settingsData">
                    <button className="edit-btn" onClick={() => handleEditStatement(index)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDeleteStatement(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default AdminCorrectIncorrectPreview;
