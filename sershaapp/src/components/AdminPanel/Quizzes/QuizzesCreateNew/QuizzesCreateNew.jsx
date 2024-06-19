import React, { useState } from 'react'
import { useGlobalContext } from '../../../../context/context';
import closeButton from '../../../../assets/images/adminPanel/closeButton.png'

import './quizzesCreateNew.css'
import axios from 'axios';

const QuizzesCreateNew = () => {
  const { baseUrl, allRightAnswerQuestions, setAllRightAnswerQuestions, rightAnswerCreateNew, setRightAnswerCreateNew } = useGlobalContext();
  const [rightAnswerNewQuestion, setRightAnswerNewQuestion] = useState({
    questionText: '',
    answers: [
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false }
    ],
    stage: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault()

    let dif = rightAnswerNewQuestion.stage === 'Easy' ? 0 : rightAnswerNewQuestion.stage === 'Medium' ? 1 : 2;
    // Construct the new question object
    const newQuestion = {
      type: 0,
      difficulty: dif,
      questions: [
        {
          questionText: rightAnswerNewQuestion.questionText,
          answers: rightAnswerNewQuestion.answers.map(ans => ({
            text: ans.text,
            isCorrect: ans.isCorrect
          })),
        }
      ]
    };


    // Reset form fields
    setRightAnswerNewQuestion({
      type: 0,
      questionText: '',
      answers: [
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false }
      ],
      stage: ''
    });

    try {
      const response = await axios.post(`${baseUrl}/Quizzes/create`, newQuestion);
      console.log(`newQUESTION: ${newQuestion}`)
      // Close the create new question form
      setRightAnswerCreateNew(false);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }

  };

  // Function to update the option value in state
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...rightAnswerNewQuestion.answers];
    updatedOptions[index].text = value;
    setRightAnswerNewQuestion({ ...rightAnswerNewQuestion, answers: updatedOptions });
  };

  // Function to update the checkbox value in state
  const handleCheckboxChange = (index, isChecked) => {
    const updatedOptions = [...rightAnswerNewQuestion.answers];
    updatedOptions[index].isCorrect = isChecked;
    setRightAnswerNewQuestion({ ...rightAnswerNewQuestion, answers: updatedOptions });
    console.log(rightAnswerNewQuestion)
  };

  const handleAddOption = () => {
    setRightAnswerNewQuestion({
      ...rightAnswerNewQuestion,
      answers: [
        ...rightAnswerNewQuestion.answers,
        { text: '', isCorrect: false }
      ]
    });
  };

  return (
    <div className="newRightAnswerQuestionContainer">
      <div className="close-btn" onClick={() => setRightAnswerCreateNew(false)}><img src={closeButton} alt='close' /></div>
      <h3 className="p-3 text-center">Create New Question</h3>
      <div>
        <label className='questionFieldLabel'>Question:</label>
        <input className='newRightAnswerQuestionInput' type="text" value={rightAnswerNewQuestion.questionText} placeholder='Question' onChange={(e) => setRightAnswerNewQuestion({ ...rightAnswerNewQuestion, questionText: e.target.value })} />
      </div>

      <div className='newRightAnswerOptions'>
        <label className='optionsFieldLabel'>Options(check correct answer)</label>
        {rightAnswerNewQuestion.answers.map((ans, index) => (
          <>
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
            <div className='newOptionFieldAdd'>
              {index === rightAnswerNewQuestion.answers.length - 1 && (
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
      <div>
        <label>Bundle</label>
        <select className='postBundles' type="dropdown" value={rightAnswerNewQuestion.stage} placeholder='Choose a bundle' onChange={(e) => setRightAnswerNewQuestion({ ...rightAnswerNewQuestion, stage: e.target.value })} >
          <option value="" disabled>Select Bundle</option>
          <option value="Easy">Easy Bundle</option>
          <option value="Medium">Medium Bundle</option>
          <option value="Hard">Hard Bundle</option>
        </select>
      </div>


      <button className='newPostBtn' onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default QuizzesCreateNew