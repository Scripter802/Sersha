import React, { useState } from 'react'
import { useGlobalContext } from '../../../../../../context/context';
import closeButton from '../../../../../../assets/images/adminPanel/closeButton.png'

import './rightAnswerCreateNewAnswer.css'

const RightAnswerCreateNewAnswer = () => {
  const { allRightAnswerQuestions, setAllRightAnswerQuestions, rightAnswerCreateNew, setRightAnswerCreateNew } = useGlobalContext();
  const [rightAnswerNewQuestion, setRightAnswerNewQuestion] = useState({
    question: '',
    options: [
      { option: '', isCorrect: false },
      { option: '', isCorrect: false },
      { option: '', isCorrect: false }
    ]
  });

  const handleSubmit = () => {
    // Construct the new question object
    const newQuestion = {
      question: rightAnswerNewQuestion.question,
      options: rightAnswerNewQuestion.options.map(option => ({
        option: option.option,
        isCorrect: option.isCorrect
      }))
    };

    // Update the list of questions
    setAllRightAnswerQuestions([...allRightAnswerQuestions, newQuestion]);

    // Reset form fields
    setRightAnswerNewQuestion({
      question: '',
      options: [
        { option: '', isCorrect: false },
        { option: '', isCorrect: false },
        { option: '', isCorrect: false }
      ]
    });


    // Close the create new question form
    setRightAnswerCreateNew(false);
  };

  // Function to update the option value in state
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...rightAnswerNewQuestion.options];
    updatedOptions[index].option = value;
    setRightAnswerNewQuestion({ ...rightAnswerNewQuestion, options: updatedOptions });
  };

  // Function to update the checkbox value in state
  const handleCheckboxChange = (index, isChecked) => {
    const updatedOptions = [...rightAnswerNewQuestion.options];
    updatedOptions[index].isCorrect = isChecked;
    setRightAnswerNewQuestion({ ...rightAnswerNewQuestion, options: updatedOptions });
    console.log(rightAnswerNewQuestion)
  };

  const handleAddOption = () => {
    setRightAnswerNewQuestion({
      ...rightAnswerNewQuestion,
      options: [
        ...rightAnswerNewQuestion.options,
        { option: '', isCorrect: false }
      ]
    });
  };

  return (
    <div className="newRightAnswerQuestionContainer">
      <div className="close-btn" onClick={() => setRightAnswerCreateNew(false)}><img src={closeButton} alt='close' /></div>
      <h3 className="p-3 text-center">Create New Question</h3>
      <div>
        <label className='questionFieldLabel'>Question:</label>
        <input className='newRightAnswerQuestionInput' type="text" value={rightAnswerNewQuestion.question} placeholder='Question' onChange={(e) => setRightAnswerNewQuestion({ ...rightAnswerNewQuestion, question: e.target.value })} />
      </div>

      <div className='newRightAnswerOptions'>
        <label className='optionsFieldLabel'>Options(check correct answer)</label>
        {rightAnswerNewQuestion.options.map((option, index) => (
          <>
            <div className='optionBox' key={index}>
              <label>
                <input
                  className='postProfileName'
                  type="text"
                  value={option.option}
                  placeholder={`Option ${index + 1}`}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
              </label>
              <div className='checkBoxOptions'>

                <input
                  className='postProfileName'
                  type="checkbox"
                  checked={option.isCorrect}
                  onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                />
              </div>
            </div>
            <div className='newOptionFieldAdd'>
              {index === rightAnswerNewQuestion.options.length - 1 && (
                <button className='addNewOptionFieldBtn' onClick={handleAddOption}>
                  <div className='incrementCharacter'>
                    +
                  </div>
                </button>
              )}
            </div>
          </>
        ))}

      </div>


      <button className='newPostBtn' onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default RightAnswerCreateNewAnswer