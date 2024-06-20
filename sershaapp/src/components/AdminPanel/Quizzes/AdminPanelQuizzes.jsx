import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../../context/context';
import './adminPanelQuizzes.css';
import QuizzesCreateNew from './QuizzesCreateNew/QuizzesCreateNew';
import QuizzesEdit from './QuizzesEdit/QuizzesEdit';
import SingleQuizz from './SingleQuizzes/SingleQuizz.jsx';
import axios from 'axios';

const AdminPanelQuizzes = () => {
  const { baseUrl, quizzesCreateNew, setQuizzesCreateNew, quizzesEdit, allQuizzes, setAllQuizzes, setSelectedQuestion, setQuestionEdit } = useGlobalContext();
  const [isSingleQuizz, setIsSingleQuizz] = useState(false);
  const [selectedQuizz, setSelectedQuizz] = useState(null);

  useEffect(() => {
    const fetchAllQuizzes = async () => {
      try {
        const response = await axios.get(`${baseUrl}/Quizzes`);
        setAllQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching right answer questions:', error);
      }
    };

    fetchAllQuizzes();
  }, []);

  const handleEditQuestion = (index) => {
    setEditingQuestion(questions[index]);
    setIsQuestionEdit(true);
  };

  const handleDeleteQuizz = async (quizz) => {
    try {
      const response = await axios.delete(`${baseUrl}/Quizzes/${quizz.id}`);
      if (response.status === 200) {
        const updatedQuestions = quizz.questions.filter((_, idx) => idx !== index);
        quizz.questions = updatedQuestions;
        setSelectedQuestion({ ...quizz }); // Force re-render
      }
    } catch (error) {
      console.error('Error deleting the question:', error);
    }
  };

  const handleOpenSingleQuizz = (quizz) => {
    setSelectedQuizz(quizz);
    setIsSingleQuizz(true);
  };

  const handleCloseSingleQuizz = () => {
    setIsSingleQuizz(false);
    setSelectedQuizz(null);
    setQuestionEdit(false);
    setSelectedQuestion(null);
  };

  return (
    <div className="adminPanelQuizzesContainer" style={{ position: 'relative' }}>
      {quizzesCreateNew ? (
        <QuizzesCreateNew />
      ) : quizzesEdit ? (
        <QuizzesEdit />
      ) : (
        <div className='rightAnswerWrapperList'>
          <div className='createNewQuestionBtnWrapper'>
            <h3 className="quizTitle">Quizzes</h3>
            <button className="createNewQuizzBtn" onClick={() => setQuizzesCreateNew(true)}>Create New Quizz</button>
          </div>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>No.</th>
                <th>Quizz Name</th>
                <th>Bundle</th>
                <th>Conversation Starter</th>
                <th>Number of questions</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {allQuizzes && allQuizzes.map((quest, indexQ) => (
                <tr key={indexQ} onClick={() => handleOpenSingleQuizz(quest)}>
                  <td data-label="No.">{indexQ + 1}</td>
                  <td data-label="Question">{`Quizz Name ${indexQ + 1}`}</td>
                  <td data-label="Bundle">
                    {(() => {
                      switch (quest.difficulty) {
                        case 0:
                          return 'Easy';
                        case 1:
                          return 'Medium';
                        case 2:
                          return 'Hard';
                        default:
                          return 'Unknown';
                      }
                    })()}
                  </td>
                  <td data-label="ConversationStarter">{`Conversation Starter Text ${indexQ + 1}`}</td>
                  <td data-label="NumberOfQuestions" className='noQ'>{quest.questions.length}</td>
                  <td data-label="Edit/Delete" className='settingsData'>
                    <button className="edit-btn" onClick={() => handleEditQuestion(index)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDeleteQuizz(quest)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isSingleQuizz && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseSingleQuizz}>&times;</span>
            <SingleQuizz quizz={selectedQuizz} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanelQuizzes;
