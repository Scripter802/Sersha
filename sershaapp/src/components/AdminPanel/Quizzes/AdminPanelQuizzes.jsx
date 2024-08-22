import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../../context/context';
import './adminPanelQuizzes.css';
import QuizzesCreateNew from './QuizzesCreateNew/QuizzesCreateNew';
import QuizzesEdit from './QuizzesEdit/QuizzesEdit';
import SingleQuizz from './SingleQuizzes/SingleQuizz.jsx';
import axios from 'axios';

const AdminPanelQuizzes = () => {
  const { baseUrl, quizzesCreateNew, setQuizzesCreateNew, correctIncorrectIsTrue, setCorrectIncorrectIsTrue, quizzesEdit, allQuizzes, setAllQuizzes, setSelectedQuestion, setQuestionEdit } = useGlobalContext();
  const [isSingleQuizz, setIsSingleQuizz] = useState(false);
  const [selectedQuizz, setSelectedQuizz] = useState(null);

  const handleDeleteQuizz = async (quizz) => {
    try {
      const response = await axios.delete(`${baseUrl}/Quizzes/${quizz.id}`);
      if (response.status === 200) {
        const updatedQuestions = quizz.questions.filter((_, idx) => idx !== quizz.index);
        quizz.questions = updatedQuestions;
        setSelectedQuestion({ ...quizz }); // Force re-render

        // Update the allQuizzes state by filtering out the deleted quiz
        const updatedQuizzes = allQuizzes.filter(q => q.id !== quizz.id);
        setAllQuizzes(updatedQuizzes);
      }
    } catch (error) {
      console.error('Error deleting the question:', error);
    }
  };

  useEffect(() => {
    const fetchAllQuizzes = async () => {
      try {
        const response = await axios.get(`${baseUrl}/Quizzes`);

        const filteredData = response.data.filter(res =>
          res?.questions[0]?.type === 0 ||
          res?.questions[0]?.type === 1 ||
          res?.questions[0]?.type === 2 ||
          res?.questions[0]?.type === 3
        );

        // Avoid adding duplicates
        setAllQuizzes(prev => {
          const newAssignments = filteredData.filter(newRes =>
            !prev.some(prevRes => prevRes.id === newRes.id)
          );
          return [...prev, ...newAssignments];
        });

      } catch (error) {
        console.error('Error fetching Quizzes questions:', error);
      }
    };

    fetchAllQuizzes();
  }, [quizzesEdit, quizzesCreateNew, isSingleQuizz]);

  // const handleEditQuestion = (index) => {
  //   setEditingQuestion(questions[index]);
  //   setIsQuestionEdit(true);
  // };

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
    <div className="" style={{ position: 'relative' }}>
      {quizzesCreateNew ? (
        <QuizzesCreateNew />
      ) : quizzesEdit ? (
        <QuizzesEdit />
      ) : (
        <div className='adminPanelQuizzesContainer'>
          <div className='titleWrapper'>
            <h3 className="quizzTitle">Quizzes</h3>
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
                <tr key={indexQ}>
                  {console.log(quest)}
                  <td data-label="No.">{indexQ + 1}</td>
                  <td data-label="Question">{`${quest.quizName}`}</td>
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
                  <td data-label="ConversationStarter">{`${quest.conversationStarter}`}</td>
                  <td data-label="NumberOfQuestions" className='noQ'>{quest.questions.length}</td>
                  <td data-label="Edit/Delete" className='settingsData'>
                    <button className="edit-btn" onClick={() => handleOpenSingleQuizz(quest)}>Edit</button>
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
            <SingleQuizz quizz={selectedQuizz} setIsSingleQuizz={setIsSingleQuizz} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanelQuizzes;
