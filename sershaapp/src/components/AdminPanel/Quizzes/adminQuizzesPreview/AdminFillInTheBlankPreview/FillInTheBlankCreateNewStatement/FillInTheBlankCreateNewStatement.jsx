import React, { useState } from 'react';
import { useGlobalContext } from '../../../../../../context/context';
import closeButton from '../../../../../../assets/images/adminPanel/closeButton.png';
import './fillInTheBlankCreateNewStatement.css';
import axios from 'axios';

const FillInTheBlankCreateNewStatement = () => {
  const { baseUrl, setFillInTheBlankCreateNew, setAllFillInTheBlankStatements } = useGlobalContext();
  const [fillInTheBlankNewStatement, setFillInTheBlankNewStatement] = useState({
    statement1: "",
    statement2: "",
    answers: [
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
    ],
    stage: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const difficultyMap = {
      Easy: 0,
      Medium: 1,
      Hard: 2,
    };

    const newStatement = {
      type: 2,
      difficulty: difficultyMap[fillInTheBlankNewStatement.stage] || 0,
      questions: [
        {
          questionText: '',
          statement1: fillInTheBlankNewStatement.statement1,
          statement2: fillInTheBlankNewStatement.statement2,
          answers: fillInTheBlankNewStatement.answers.map(ans => ({
            text: ans.text,
            isCorrect: ans.isCorrect
          })),
        }
      ]
    };

    try {
      const response = await axios.post(`${baseUrl}/Quizzes/create`, newStatement);
      setAllFillInTheBlankStatements((prev) => [...prev, response.data]);

      // Reset form fields
      setFillInTheBlankNewStatement({
        statement1: "",
        statement2: "",
        answers: [
          { text: '', isCorrect: false },
          { text: '', isCorrect: false },
          { text: '', isCorrect: false }
        ],
        stage: '',
      });

      // Close the create new question form
      setFillInTheBlankCreateNew(false);
    } catch (error) {
      console.error('Error creating new statement:', error);
    }
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...fillInTheBlankNewStatement.answers];
    updatedOptions[index].text = value;
    setFillInTheBlankNewStatement({ ...fillInTheBlankNewStatement, answers: updatedOptions });
  };

  const handleCheckboxChange = (index, isChecked) => {
    const updatedOptions = [...fillInTheBlankNewStatement.answers];
    updatedOptions[index].isCorrect = isChecked;
    setFillInTheBlankNewStatement({ ...fillInTheBlankNewStatement, answers: updatedOptions });
  };

  const handleAddOption = () => {
    setFillInTheBlankNewStatement({
      ...fillInTheBlankNewStatement,
      answers: [
        ...fillInTheBlankNewStatement.answers,
        { text: '', isCorrect: false }
      ]
    });
  };

  return (
    <div className="newFillInTheBlankContainer">
      <div className="close-btn" onClick={() => setFillInTheBlankCreateNew(false)}>
        <img src={closeButton} alt='close' />
      </div>
      <h3 className="p-3 text-center">Create New Statement</h3>
      <div>
        <label className='fillInTheBlankStatementOneFieldLabel'>Statement 1 part</label>
        <input
          className='newFillInTheBlankInput'
          type="text"
          value={fillInTheBlankNewStatement.statement1}
          placeholder=''
          onChange={(e) => setFillInTheBlankNewStatement({ ...fillInTheBlankNewStatement, statement1: e.target.value })}
        />
      </div>
      <div>
        <label className='fillInTheBlankStatementTwoFieldLabel'>Statement 2 part</label>
        <input
          className='newFillInTheBlankInput'
          type="text"
          value={fillInTheBlankNewStatement.statement2}
          placeholder=''
          onChange={(e) => setFillInTheBlankNewStatement({ ...fillInTheBlankNewStatement, statement2: e.target.value })}
        />
      </div>
      <div className='newFillInTheBlankOptions'>
        <label className='fillInTheBlankOptionsFieldLabel'>Options</label>
        {fillInTheBlankNewStatement.answers.map((ans, index) => (
          <div className='optionBox' key={index}>
            <label>
              <input
                className='postProfileName'
                type="text"
                value={ans.text}
                placeholder={`Option ${index + 1}`}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            </label>
            <div className='checkBoxOptions'>
              <input
                className='postProfileName'
                type="checkbox"
                checked={ans.isCorrect}
                onChange={(e) => handleCheckboxChange(index, e.target.checked)}
              />
            </div>
          </div>
        ))}
        <div className='newOptionFieldAdd'>
          <button className='addNewOptionFieldBtn' onClick={handleAddOption}>
            <div className='incrementCharacter'>+</div>
          </button>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <label>Bundle</label>
          <select
            className='postBundles'
            value={fillInTheBlankNewStatement.stage}
            placeholder='Choose a bundle'
            onChange={(e) => setFillInTheBlankNewStatement({ ...fillInTheBlankNewStatement, stage: e.target.value })}
          >
            <option value="" disabled>Select Bundle</option>
            <option value="Easy">Easy Bundle</option>
            <option value="Medium">Medium Bundle</option>
            <option value="Hard">Hard Bundle</option>
          </select>
        </div>
      </div>
      <button className='fillInTheBlankOptionBoxSubmitBtn' onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default FillInTheBlankCreateNewStatement;
