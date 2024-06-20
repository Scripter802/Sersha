import React from 'react';
import { useGlobalContext } from '../../../../context/context';
import SingleQuizzCreateNew from './SingleQuizzCreateNew/SingleQuizzCreateNew';
import SingleQuizzEdit from './SingleQuizzEdit/SingleQuizzEdit';
import axios from 'axios';

const SingleQuizz = ({ quizz }) => {
  const { baseUrl, quizzCreateNew, questionEdit, setQuestionEdit, setSelectedQuestion } = useGlobalContext();

  const handleEditQuestion = (index) => {
    setSelectedQuestion({ ...quizz.questions[index], index });
    setQuestionEdit(true);
  };

  const handleDeleteQuestion = async (index) => {
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

  if (!quizz) return null;

  return (
    <div className="singleQuizzContainer">
      {quizzCreateNew ? (
        <SingleQuizzCreateNew />
      ) : questionEdit ? (
        <SingleQuizzEdit quizz={quizz} />
      ) : (

        <div className='singleQuizzWrapper'>
          <h3 className="quizTitle">Quiz: {quizz.title}</h3>

          {quizz.questions.map((quest, index) => (
            <div key={index}>
              <div data-label="No." className='noQuest'>{index + 1}</div>
              <div data-label="Question">{quest.text}</div>
              <div data-label="Options">{quest.answers.map((q, idx) => (
                <p key={idx}>{q.text}</p>
              ))}</div>
              <div data-label="Correct Answer">
                {quest.answers.filter(q => q.isCorrect).map((correctAnswer, idx) => (
                  <p key={idx}>{correctAnswer.text}</p>
                ))}
              </div>
              <div data-label="Bundle">
                {(() => {
                  switch (quizz.difficulty) {
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
              </div>
              <div data-label="Edit/Delete" className='settingsData'>
                <button className="edit-btn" onClick={() => handleEditQuestion(index)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDeleteQuestion(index)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleQuizz;
