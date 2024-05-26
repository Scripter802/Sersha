import { useGlobalContext } from '../../../../../context/context'
import FillInTheBlankCreateNewStatement from './FillInTheBlankCreateNewStatement/FillInTheBlankCreateNewStatement'
import './adminFillInTheBlankPreview.css'

const AdminFillInTheBlankPreview = () => {
  const { fillInTheBlankCreateNew,
    setFillInTheBlankCreateNew,
    allFillInTheBlankStatements,
    setAllFillInTheBlankStatements } = useGlobalContext();

  const statements = [
    {
      StatementFirst: "Water freezes at",
      StatementSecond: "degrees Celsius.",
      Options: ['25', '0', '-15', '-35'],
      CorrectAnswer: '0',
    },
    {
      StatementFirst: "Water freezes at",
      StatementSecond: "degrees Celsius.",
      Options: ['25', '0', '-15', '-35'],
      CorrectAnswer: '0',
    },
    {
      StatementFirst: "Water freezes at",
      StatementSecond: "degrees Celsius.",
      Options: ['25', '0', '-15', '-35'],
      CorrectAnswer: '0',
    },

  ]


  return (
    <>
      {fillInTheBlankCreateNew === true ? (
        <FillInTheBlankCreateNewStatement />) : (
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
                    <p>{option}</p>
                  ))}</td>


                  <td data-label="Edit/Delete" className='settingsData'>
                    <button className="edit-btn" onClick={() => handleEdit(index)}>Edit</button>

                    <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
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
