import React, { useState } from 'react'
import { useGlobalContext } from '../../../../../../context/context';
import closeButton from '../../../../../../assets/images/adminPanel/closeButton.png'

import './fillInTheBlankCreateNewStatement.css'

const FillInTheBlankCreateNewStatement = () => {
  const { fillInTheBlankCreateNew,
    setFillInTheBlankCreateNew,
    allFillInTheBlankStatements,
    setAllFillInTheBlankStatements } = useGlobalContext();
  const [fillInTheBlankNewStatement, setFillInTheBlankNewStatement] = useState({
    statementFirst: "",
    statementSecond: "",
    options: ['', '', ''],
    correctAnswer: '',
  });

  const handleSubmit = () => {
    // Construct the new question object
    const newStatement = {
      statementFirst: fillInTheBlankNewStatement.statementFirst,
      statementSecond: fillInTheBlankNewStatement.statementSecond,
      option: fillInTheBlankNewStatement.option,
      correctAnswer: fillInTheBlankNewStatement.correctAnswer
    };

    // Update the list of questions
    setAllFillInTheBlankStatements([...allFillInTheBlankStatements, newStatement]);

    // Reset form fields
    setFillInTheBlankNewStatement({
      statementFirst: "",
      statementSecond: "",
      options: ['', ''],
      correctAnswer: '',
    });

    // Close the create new statement form
    setFillInTheBlankCreateNew(false);
  };

  // Function to update the option value in state
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...fillInTheBlankNewStatement.options];
    updatedOptions[index].option = value;
    setFillInTheBlankNewStatement({ ...fillInTheBlankNewStatement, options: updatedOptions });
  };


  const handleAddOption = () => {
    setFillInTheBlankNewStatement({
      ...fillInTheBlankNewStatement,
      options: [
        ...fillInTheBlankNewStatement.options,
        ''
      ]
    });
    console.log(fillInTheBlankNewStatement.options)
  };

  return (
    <div className="newFillInTheBlankContainer">
      <div className="close-btn" onClick={() => setFillInTheBlankCreateNew(false)}><img src={closeButton} alt='close' /></div>
      <h3 className="p-3 text-center">Create New Statement</h3>
      <div>
        <label className='fillInTheBlankStatementOneFieldLabel'>Statement 1 part</label>
        <input className='newFillInTheBlankInput' type="text" value={fillInTheBlankNewStatement.statementFirst} placeholder='' onChange={(e) => setFillInTheBlankNewStatement({ ...fillInTheBlankNewStatement, statementFirst: e.target.value })} />
      </div>
      <div>
        <label className='fillInTheBlankCorrectFieldLabel'>Correct answer</label>
        <input className='newFillInTheBlankInput' type="text" value={fillInTheBlankNewStatement.correctAnswer} placeholder='' onChange={(e) => setFillInTheBlankNewStatement({ ...fillInTheBlankNewStatement, correctAnswer: e.target.value })} />
      </div>
      <div>
        <label className='fillInTheBlankStatementTwoFieldLabel'>Statement 2 part</label>
        <input className='newFillInTheBlankInput' type="text" value={fillInTheBlankNewStatement.statementSecond} placeholder='' onChange={(e) => setFillInTheBlankNewStatement({ ...fillInTheBlankNewStatement, statementSecond: e.target.value })} />
      </div>

      <div className='newFillInTheBlankOptions'>
        <label className='fillInTheBlankOptionsFieldLabel'>Options</label>
        {fillInTheBlankNewStatement.options.map((option, index) => (
          <React.Fragment key={index}>
            {console.log(option)}
            <div className='fillInTheBlankOptionBox' key={index}>
              <label>
                <input
                  className='postProfileName'
                  type="text"
                  value={option}
                  placeholder={`Option ${index + 1}`}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
              </label>
            </div>
            <div className='fillInTheBlankNewOptionFieldAdd'>
              {index === fillInTheBlankNewStatement.options.length - 1 && (
                <button className='fillInTheBlankAddNewOptionFieldBtn' onClick={handleAddOption}>
                  <div className='fillInTheBlankIncrementCharacter'>
                    +
                  </div>
                </button>
              )}
            </div>
          </React.Fragment>
        ))}

      </div>


      <button className='fillInTheBlankOptionBoxSubmitBtn' onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default FillInTheBlankCreateNewStatement