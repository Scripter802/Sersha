import React from 'react';
import { useGlobalContext } from '../../../../../context/context';
import RightAnswerCreateNewAnswer from './RightAnswerCreateNewAnswer/RightAnswerCreateNewAnswer';
import RightAnswerEditAnswer from './RightAnswerEditAnswer/RightAnswerEditAnswer';
import './adminRightAnswerPreview.css';

const AdminRightAnswerPreview = () => {
  const { rightAnswerCreateNew, setRightAnswerCreateNew, editingQuestion, setEditingQuestion, setIsQuestionEdit, isQuestionEdit } = useGlobalContext();

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
              {questions && questions.map((quest, index) => (
                <tr key={index}>
                  <td data-label="No.">{index + 1}</td>
                  <td data-label="Question">{quest.Question}</td>
                  <td data-label="Options">{quest.Options.map((q, idx) => (
                    <p key={idx}>{q.option}</p>
                  ))}</td>
                  <td data-label="Correct answer">{quest.Options.find(q => q.isCorrect)?.option}</td>
                  <td data-label="Bundle">{quest.Stage}</td>
                  <td data-label="Edit/Delete" className='settingsData'>
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
