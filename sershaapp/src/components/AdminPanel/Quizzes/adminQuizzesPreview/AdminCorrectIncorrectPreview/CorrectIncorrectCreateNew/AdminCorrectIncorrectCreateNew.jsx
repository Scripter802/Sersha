import React, { useState } from 'react'
import { useGlobalContext } from '../../../../../../context/context';
import closeButton from '../../../../../../assets/images/adminPanel/closeButton.png'

import './adminCorrectIncorrectCreateNew.css'

const AdminCorrectIncorrectCreateNew = () => {
  const { correctIncorrectCreateNew,
    setCorrectIncorrectCreateNew,
    allCorrectIncorrect,
    setAllCorrectIncorrect } = useGlobalContext();
  const [correctIncorrectNewStatement, setCorrectIncorrectNewStatement] = useState({
    Statement: '',
    isTrue: null,
  });

  const handleSubmit = () => {
    // Construct the new question object
    const newStatement = {
      Statement: correctIncorrectNewStatement.Statement,
      isTrue: correctIncorrectNewStatement.isTrue,
      Stage: correctIncorrectNewStatement.Stage
    }

    // Update the list of questions
    setAllCorrectIncorrect([...allCorrectIncorrect, newStatement]);

    // Reset form fields
    setCorrectIncorrectNewStatement({
      Statement: '',
      isTrue: null,
      Stage: '',
    });


    // Close the create new question form
    setCorrectIncorrectCreateNew(false);
  };

  const handleCheckboxChange = (index, isChecked) => {
    const updatedOptions = [...correctIncorrectNewStatement.isTrue];
    updatedOptions[index].isTrue = isChecked;
    setCorrectIncorrectNewStatement({ ...correctIncorrectNewStatement, isTrue: updatedOptions });
    console.log(rightAnswerNewQuestion)
  };


  return (
    <div className="newCorrectIncorrectContainer">
      <div className="close-btn" onClick={() => setCorrectIncorrectCreateNew(false)}><img src={closeButton} alt='close' /></div>
      <h3 className="p-3 text-center">Create New Statement</h3>
      <div>
        <label className='correctIncorrectStatementFieldLabel'>Statement</label>
        <input className='newCorrectIncorrectStatementInput' style={{ marginBottom: '1rem' }} type="text" value={correctIncorrectNewStatement.Statement} placeholder='Statement' onChange={(e) => setCorrectIncorrectNewStatement({ ...correctIncorrectNewStatement, Statement: e.target.value })} />
      </div>

      <div className='newCorrectIncorrectOptions'>

        <div className='checkBoxOptions'>

          <label className='correctIncorrectOptionsFieldLabel'>If the statement is true - check the box</label>
          <input
            className='correctIncorrectTrueCheckbox'
            type="checkbox"
            checked={correctIncorrectNewStatement.isTrue}
            onChange={(e) => handleCheckboxChange(index, e.target.checked)}
          />
        </div>


      </div>

      <div style={{ marginTop: '1rem' }}>
        <label>Bundle</label>
        <select className='postBundles' type="dropdown" value={correctIncorrectNewStatement.Stage} placeholder='Choose a bundle' onChange={(e) => setCorrectIncorrectNewStatement({ ...correctIncorrectNewStatement, Stage: e.target.value })} >
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