import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../../../context/context';
import closeButton from '../../../../assets/images/adminPanel/closeButton.png';
import './quizzesEdit.css';

const QuizzesEdit = () => {
  const { editingQuestion, setEditingQuestion, setIsQuestionEdit, allRightAnswerQuestions, setAllRightAnswerQuestions } = useGlobalContext();
  const [rightAnswerEditQuestion, setRightAnswerEditQuestion] = useState({
    Question: '',
    Options: [
      { option: '', isCorrect: false },
      { option: '', isCorrect: false },
      { option: '', isCorrect: false }
    ],
    stage: ''
  });

  useEffect(() => {
    if (editingQuestion) {
      setRightAnswerEditQuestion(editingQuestion);
    }
  }, [editingQuestion]);

  const handleSubmit = () => {
    const updatedQuestions = allRightAnswerQuestions.map(question =>
      question.id === rightAnswerEditQuestion.id ? rightAnswerEditQuestion : question
    );
    setAllRightAnswerQuestions(updatedQuestions);

    // Reset the edit state
    setEditingQuestion(null);
    setIsQuestionEdit(false);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...rightAnswerEditQuestion.Options];
    updatedOptions[index].option = value;
    setRightAnswerEditQuestion({ ...rightAnswerEditQuestion, options: updatedOptions });
  };

  const handleCheckboxChange = (index, isChecked) => {
    const updatedOptions = [...rightAnswerEditQuestion.Options];
    updatedOptions[index].isCorrect = isChecked;
    setRightAnswerEditQuestion({ ...rightAnswerEditQuestion, Options: updatedOptions });
  };

  const handleAddOption = () => {
    setRightAnswerEditQuestion({
      ...rightAnswerEditQuestion,
      Options: [...rightAnswerEditQuestion.Options, { option: '', isCorrect: false }]
    });
  };

  return (
    <div className="editRightAnswerQuestionContainer">
      <div className="close-btn" onClick={() => setIsQuestionEdit(false)}>
        <img src={closeButton} alt='close' />
      </div>
      <h3 className="p-3 text-center">Edit Question</h3>
      <div>
        <label className='questionFieldLabel'>Question:</label>
        <input
          className='editRightAnswerQuestionInput'
          type="text"
          value={rightAnswerEditQuestion.Question}
          placeholder='Question'
          onChange={(e) => setRightAnswerEditQuestion({ ...rightAnswerEditQuestion, Question: e.target.value })}
        />
      </div>

      <div className='editRightAnswerOptions'>
        <label className='optionsFieldLabel'>Options (check correct answer)</label>
        {rightAnswerEditQuestion.Options.map((option, index) => (
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
        ))}
        <div className='newOptionFieldAdd'>
          <button className='addNewOptionFieldBtn' onClick={handleAddOption}>
            <div className='incrementCharacter'>+</div>
          </button>
        </div>
      </div>
      <div>
        <label>Bundle</label>
        <select
          className='postBundles'
          type="dropdown"
          value={rightAnswerEditQuestion.stage}
          placeholder='Choose a bundle'
          onChange={(e) => setRightAnswerEditQuestion({ ...rightAnswerEditQuestion, Stage: e.target.value })}
        >
          <option value="Easy">Easy Bundle</option>
          <option value="Medium">Medium Bundle</option>
          <option value="Hard">Hard Bundle</option>
        </select>
      </div>
      <button className='editPostBtn' onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default QuizzesEdit;
