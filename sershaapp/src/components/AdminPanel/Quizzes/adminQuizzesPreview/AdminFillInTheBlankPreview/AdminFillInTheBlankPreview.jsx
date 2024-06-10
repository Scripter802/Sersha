import { useEffect } from 'react';
import { useGlobalContext } from '../../../../../context/context'
import FillInTheBlankCreateNewStatement from './FillInTheBlankCreateNewStatement/FillInTheBlankCreateNewStatement'
import FillInTheBlankEditStatement from './FillInTheBlankEditStatement/FillInTheBlankEditStatement';
import './adminFillInTheBlankPreview.css'
import axios from 'axios';

const AdminFillInTheBlankPreview = () => {
  const { fillInTheBlankAPI,
    fillInTheBlankCreateNew,
    setFillInTheBlankCreateNew,
    allFillInTheBlankStatements,
    setAllFillInTheBlankStatements,
    editingFillInTheBlank,
    setEditingFillInTheBlank,
    isFillInTheBlankEdit,
    setIsFillInTheBlankEdit,
  } = useGlobalContext();

  const statements = [
    {
      StatementFirst: "Water freezes at",
      StatementSecond: "degrees Celsius.",
      Options: ['25', '0', '-15', '-35'],
      CorrectAnswer: '0',
      stage: 'Easy',
    },
    {
      StatementFirst: "Water freezes at",
      StatementSecond: "degrees Celsius.",
      Options: ['25', '0', '-15', '-35'],
      CorrectAnswer: '0',
      stage: 'Easy',
    },
    {
      StatementFirst: "Water freezes at",
      StatementSecond: "degrees Celsius.",
      Options: ['25', '0', '-15', '-35'],
      CorrectAnswer: '0',
      stage: 'Easy',
    },
  ];

  useEffect(() => {
    const fetchRightAnswerQuestions = async () => {
      try {
        const response = await axios.get(fillInTheBlankAPI);
        setAllFillInTheBlankStatements(response.data);

        console.log(allFillInTheBlankStatements)
      } catch (error) {
        console.error('Error fetching right answer questions:', error);
      }
    };

    fetchRightAnswerQuestions();
  }, [setAllFillInTheBlankStatements]);

  const handleEditFillInTheBlank = (index) => {
    setEditingFillInTheBlank(statements[index]);
    setIsFillInTheBlankEdit(true);
  };

  const handleDeleteFillInTheBlank = (index) => {
    // Add your delete logic here
  };


  return (
    <>
      {fillInTheBlankCreateNew ? (
        <FillInTheBlankCreateNewStatement />
      ) : isFillInTheBlankEdit ? (
        <FillInTheBlankEditStatement />
      ) : (
        <div className='fillInTheBlankWrapperList'>
          <div className='createNewStatementBtnWrapper'>
            <h3 className="quizTitle">Fill In The Blank</h3>
            <button className="createNewStatementBtn" onClick={() => setFillInTheBlankCreateNew(true)}>Create New Statement</button>
          </div>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>No.</th>
                <th>Statement 1</th>
                <th>Correct answer</th>
                <th>Statement 2</th>
                <th>Options</th>
                <th>Stage</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {statements && statements.map((statement, index) =>
                <tr key={index}>
                  <td data-label="No.">{index + 1}</td>
                  <td data-label="Statement 1">{statement.StatementFirst}</td>
                  <td data-label="Correct answer">{statement.CorrectAnswer}</td>
                  <td data-label="Statement 2">{statement.StatementSecond}</td>
                  <td data-label="Options">{statement.Options.map(option => (
                    <p key={option}>{option}</p>
                  ))}</td>

                  <td data-label="Statement 2">{statement.stage}</td>


                  <td data-label="Edit/Delete" className='settingsData'>
                    <button className="edit-btn" onClick={() => handleEditFillInTheBlank(index)}>Edit</button>

                    <button className="delete-btn" onClick={() => handleDeleteFillInTheBlank(index)}>Delete</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

        </div>
      )}
    </>
  )
}

export default AdminFillInTheBlankPreview
