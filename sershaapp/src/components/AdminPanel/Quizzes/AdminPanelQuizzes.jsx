import React, { useState } from 'react'
import { useGlobalContext } from '../../../context/context';

import './adminPanelQuizzes.css'
import QuizzesCreateNew from './QuizzesCreateNew/QuizzesCreateNew';
import QuizzesEdit from './QuizzesEdit/QuizzesEdit';

const AdminPanelQuizzes = () => {
  const { quizzesCreateNew, quizzesEdit, allQuizzes } = useGlobalContext();
  const [quizzes, setQuizzes] = useState(['Right Answer', 'Correct/Incorect', 'Grouping', 'Fill in the blank']);


  const [allRightAnswerQuestions, setAllRightAnswerQuestions] = useState([
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "quizId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "quiz": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "difficulty": 0,
        "type": 0,
        "questions": [
          "string"
        ]
      },
      "text": "string",
      "answers": [
        {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "text": "string",
          "isCorrect": true,
          "questionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "question": "string"
        }
      ]
    },
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "quizId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "quiz": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "difficulty": 0,
        "type": 0,
        "questions": [
          "string"
        ]
      },
      "text": "string",
      "answers": [
        {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "text": "string",
          "isCorrect": true,
          "questionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "question": "string"
        }
      ]
    }
  ])

  return (
    <div className="adminPanelQuizzesContainer" style={{ position: 'relative' }}>
      <>
        {quizzesCreateNew ? (
          <QuizzesCreateNew />
        ) : quizzesEdit ? (
          <QuizzesEdit />
        ) : (
          <div className='rightAnswerWrapperList'>
            <div className='createNewQuestionBtnWrapper'>
              <h3 className="quizTitle">Right Answer</h3>
              <button className="createNewQuestionBtn" onClick={() => setRightAnswerCreateNew(true)}>Create New Question</button>
            </div>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Question</th>
                  <th>Options</th>
                  <th>Correct answer</th>
                  <th>Bundle</th>
                  <th>Edit/Delete</th>
                </tr>
              </thead>
              <tbody>
                {allRightAnswerQuestions?.questions && allRightAnswerQuestions.questions.map((quest, index) => (
                  <tr key={index}>
                    <td data-label="No.">{index + 1}</td>
                    <td data-label="Question">{quest.text}</td>
                    <td data-label="Options">{quest.answers.map((q, idx) => (
                      <p key={idx}>{q.text}</p>
                    ))}</td>
                    <td data-label="Correct answer">
                      {quest.answers.filter(q => q.isCorrect).map((correctAnswer, idx) => (
                        <p key={idx}>{correctAnswer.text}</p>
                      ))}
                    </td>                  <td data-label="Bundle">
                      {(() => {
                        switch (allRightAnswerQuestions.difficulty) {
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
                    </td>                  <td data-label="Edit/Delete" className='settingsData'>
                      <button className="edit-btn" onClick={() => handleEditQuestion(index)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDeleteQuestion(index)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </>
    </div>
  );
}

export default AdminPanelQuizzes
