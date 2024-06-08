import React, { useEffect } from 'react';
import { useGlobalContext } from '../../../../../context/context';
import RightAnswerCreateNewAnswer from './RightAnswerCreateNewAnswer/RightAnswerCreateNewAnswer';
import RightAnswerEditAnswer from './RightAnswerEditAnswer/RightAnswerEditAnswer';
import './adminRightAnswerPreview.css';
import axios from 'axios';

const AdminRightAnswerPreview = () => {
  const { rightAnswerAPI, allRightAnswerQuestions, setAllRightAnswerQuestions, rightAnswerCreateNew, setRightAnswerCreateNew, editingQuestion, setEditingQuestion, setIsQuestionEdit, isQuestionEdit } = useGlobalContext();

  const questions = [
    {
      Question: "How Are You?",
      Options: [
        {
          option: 'Good',
          isCorrect: true,
        },
        {
          option: 'Not bad',
          isCorrect: false,
        },
        {
          option: 'Very good',
          isCorrect: false,
        },
      ],
      Stage: "Hard"
    },
    // Other questions
  ];

  useEffect(() => {
    const fetchRightAnswerQuestions = async () => {
      try {
        const response = await axios.get(rightAnswerAPI);
        setAllRightAnswerQuestions(response.data);
        console.log(response.data, allRightAnswerQuestions)
      } catch (error) {
        console.error('Error fetching right answer questions:', error);
      }
    };

    fetchRightAnswerQuestions();
  }, []);


  const handleEditQuestion = (index) => {
    setEditingQuestion(questions[index]);
    setIsQuestionEdit(true);
  };

  const handleDeleteQuestion = (index) => {
    // Add your delete logic here
  };

  return (
    <>
      {rightAnswerCreateNew ? (
        <RightAnswerCreateNewAnswer />
      ) : isQuestionEdit ? (
        <RightAnswerEditAnswer />
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
  );
}

export default AdminRightAnswerPreview;
