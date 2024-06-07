import React from 'react';
import { useGlobalContext } from '../../../context/context'
import './adminPanelDm.css';

const AdminPanelDm = () => {
  const { rightAnswerCreateNew, setRightAnswerCreateNew, editingQuestion, setEditingQuestion, setIsQuestionEdit, isQuestionEdit } = useGlobalContext();

  const dms = [
    {
      Message: "How Are You?",
      Answers: [
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
      Stage: "Easy",
      Author: {
        AuthorName: 'Sersha the Fox',
        AuthorImage: '',
      }
    },
    {
      Message: "How Are You?",
      Answers: [
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
      Stage: "Easy",
      Author: {
        AuthorName: 'Sersha the Fox',
        AuthorImage: '',
      }
    },
    {
      Message: "How Are You?",
      Answers: [
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
      Stage: "Easy",
      Author: {
        AuthorName: 'Sersha the Fox',
        AuthorImage: '',
      }
    },
  ];

  // const handleEditQuestion = (index) => {
  //   setEditingQuestion(questions[index]);
  //   setIsQuestionEdit(true);
  // };

  // const handleDeleteQuestion = (index) => {
  //   // Add your delete logic here
  // };

  return (
    <>
      {/* {rightAnswerCreateNew ? (
        <RightAnswerCreateNewAnswer />
      ) : isQuestionEdit ? (
        <RightAnswerEditAnswer />
      ) : ( */}
      <div className='dmsWrapperList'>
        <div className='createNewMessageBtnWrapper'>
          <h3 className="dmsTitle">DM's</h3>
          <button className="createNewMessageBtn" onClick={() => setRightAnswerCreateNew(true)}>Create New Message</button>
        </div>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>No.</th>
              <th>Message</th>
              <th>Answers</th>
              <th>Correct answer</th>
              <th>Bundle</th>
              <th>Author</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {dms && dms.map((msg, index) => (
              <tr key={index}>
                <td data-label="No.">{index + 1}</td>
                <td data-label="Message">{msg.Message}</td>
                <td data-label="Options">{msg.Answers.map((m, idx) => (
                  <p key={idx}>{m.option}</p>
                ))}</td>
                <td data-label="Correct answer">{msg.Answers.find(m => m.isCorrect)?.option}</td>
                <td data-label="Bundle">{msg.Stage}</td>
                <td data-label="Author">{msg.Author.AuthorName}</td>
                <td data-label="Edit/Delete" className='settingsData'>
                  <button className="edit-btn" onClick={() => handleEditQuestion(index)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteQuestion(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* )} */}
    </>
  );
}

export default AdminPanelDm;
