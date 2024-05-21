import { useGlobalContext } from '../../../../../context/context'
import AdminCorrectIncorrectCreateNew from './CorrectIncorrectCreateNew/AdminCorrectIncorrectCreateNew'
import './adminCorrectIncorrectPreview.css'

const AdminCorrectIncorrectPreview = () => {
  const { correctIncorrectCreateNew,
    setCorrectIncorrectCreateNew,
    allCorrectIncorrect,
    setAllCorrectIncorrectCreateNew, } = useGlobalContext();

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
  ]
  return (
    <>
      {correctIncorrectCreateNew === true ? (
        <AdminCorrectIncorrectCreateNew />) : (
        <div className='correctIncorrectWrapperList'>
          <div className='createNewCorrectIncorrectBtnWrapper'>
            <h3 className="quizTitle">Correct/Incorrect</h3>
            <button className="createNewCorrectIncorrectQuestionBtn" onClick={() => (setCorrectIncorrectCreateNew(true))}>Create New Question</button>
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
              {statement && statement.map((state, index) =>
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{state.Statement}</td>
                  <td>{state.isTrue === true ? "True" : 'False'}</td>
                  <td>{state.Stage}</td>

                  <td className='settingsData'>
                    <button className="edit-btn" onClick={() => handleEdit(index)}>Edit</button>

                    <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )
      }
    </>
  )
}

export default AdminCorrectIncorrectPreview
