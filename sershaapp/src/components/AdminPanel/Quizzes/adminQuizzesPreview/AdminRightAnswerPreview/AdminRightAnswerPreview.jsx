import { useGlobalContext } from '../../../../../context/context'
import RightAnswerCreateNewAnswer from './RightAnswerCreateNewAnswer/RightAnswerCreateNewAnswer'
import './adminRightAnswerPreview.css'

const AdminRightAnswerPreview = () => {
  const { rightAnswerCreateNew, setRightAnswerCreateNew } = useGlobalContext();

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
  ]

  return (
    <>
      {rightAnswerCreateNew === true ? (
        <RightAnswerCreateNewAnswer />) : (
        <div className='rightAnswerWrapperList'>
          <div className='createNewQuestionBtnWrapper'>
            <h3 className="quizTitle">Right Answer</h3>
            <button className="createNewQuestionBtn" onClick={() => (setRightAnswerCreateNew(true))}>Create New Question</button>
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
              {questions && questions.map((quest, index) =>
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{quest.Question}</td>
                  <td>{quest.Options.map(q => (
                    <p>{q.option}</p>
                  ))}</td>
                  <td>{quest.Options.map(q => q.isCorrect === true && <p>{q.option}</p>)}</td>
                  <td>{quest.Stage}</td>
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

export default AdminRightAnswerPreview