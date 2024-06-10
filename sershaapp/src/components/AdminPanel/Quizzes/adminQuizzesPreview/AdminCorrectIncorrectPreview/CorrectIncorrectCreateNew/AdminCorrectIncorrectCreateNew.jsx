import React, { useState } from 'react'
import { useGlobalContext } from '../../../../../../context/context';
import closeButton from '../../../../../../assets/images/adminPanel/closeButton.png'

import './adminCorrectIncorrectCreateNew.css'
import axios from 'axios';

const AdminCorrectIncorrectCreateNew = () => {
  const { baseUrl, correctIncorrectCreateNew,
    setCorrectIncorrectCreateNew,
    allCorrectIncorrect,
    setAllCorrectIncorrect } = useGlobalContext();
  const [correctIncorrectNewStatement, setCorrectIncorrectNewStatement] = useState({
    questionText: '',
    isCorrect: false,
    stage: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault()

    let dif = correctIncorrectNewStatement.stage === 'Easy' ? 0 : correctIncorrectNewStatement.stage === 'Medium' ? 1 : 2;

    // Construct the new question object
    const newStatement = {
      type: 1,
      difficulty: dif,
      questions: [
        {
          questionText: correctIncorrectNewStatement.questionText,
          isCorrect: correctIncorrectNewStatement.isCorrect,
        }
      ]
    }


    try {
      const response = await axios.post(`${baseUrl}/Quizzes/create`, newStatement);
      console.log(`newQUESTION: ${newQuestion}`)
      // Close the create new question form
      setRightAnswerCreateNew(false);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }

    // Reset form fields
    setCorrectIncorrectNewStatement({
      Statement: '',
      isTrue: null,
      Stage: '',
    });


    // Close the create new question form
    setCorrectIncorrectCreateNew(false);
  };

  const handleCheckboxChange = (e) => {
    setCorrectIncorrectNewStatement({ ...correctIncorrectNewStatement, isCorrect: e.target.checked });
  };

  return (
    <div className="newCorrectIncorrectContainer">
      <div className="close-btn" onClick={() => setCorrectIncorrectCreateNew(false)}><img src={closeButton} alt='close' /></div>
      <h3 className="p-3 text-center">Create New Statement</h3>
      <div>
        <label className='correctIncorrectStatementFieldLabel'>Statement</label>
        <input className='newCorrectIncorrectStatementInput' style={{ marginBottom: '1rem' }} type="text" value={correctIncorrectNewStatement.questionText} placeholder='Statement' onChange={(e) => setCorrectIncorrectNewStatement({ ...correctIncorrectNewStatement, questionText: e.target.value })} />
      </div>

      <div className='newCorrectIncorrectOptions'>
        <div className='checkBoxOptions'>
          <label className='correctIncorrectOptionsFieldLabel'>If the statement is true - check the box</label>
          <input
            className='correctIncorrectTrueCheckbox'
            type="checkbox"
            checked={correctIncorrectNewStatement.isCorrect}
            onChange={handleCheckboxChange}
          />
        </div>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <label>Bundle</label>
        <select className='postBundles' type="dropdown" value={correctIncorrectNewStatement.stage} placeholder='Choose a bundle' onChange={(e) => setCorrectIncorrectNewStatement({ ...correctIncorrectNewStatement, stage: e.target.value })} >
          <option value="" disabled>Select Bundle</option>
          <option value="Easy">Easy Bundle</option>
          <option value="Medium">Medium Bundle</option>
          <option value="Hard">Hard Bundle</option>
        </select>
      </div>


      <button className='newStatementCorrectIncorrectBtn' onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default AdminCorrectIncorrectCreateNew