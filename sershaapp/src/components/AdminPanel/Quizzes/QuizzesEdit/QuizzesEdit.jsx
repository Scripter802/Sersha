import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../../../context/context';
import closeButton from '../../../../assets/images/adminPanel/closeButton.png';
import './quizzesEdit.css';

const QuizzesEdit = () => {
  const { editingQuestion, setEditingQuestion, setIsQuizzEdit, allRightAnswerQuestions, setAllRightAnswerQuestions } = useGlobalContext();
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
    setIsQuizzEdit(false);
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
    <div className="quiz-edit-container">
      <div className="quiz-edit-close-btn" onClick={() => setIsQuizzEdit(false)}>
        <img src={closeButton} alt='close' />
      </div>
      <h3 className="quiz-edit-title">Edit Question</h3>
      <div>
        <label className='quiz-edit-question-label'>Question:</label>
        <input
          className='quiz-edit-question-input'
          type="text"
          value={rightAnswerEditQuestion.Question}
          placeholder='Question'
          onChange={(e) => setRightAnswerEditQuestion({ ...rightAnswerEditQuestion, Question: e.target.value })}
        />
      </div>

      <div className='quiz-edit-options'>
        <label className='quiz-edit-options-label'>Options (check correct answer)</label>
        {rightAnswerEditQuestion.Options.map((option, index) => (
          <div className='quiz-edit-option-box' key={index}>
            <label>
              <input
                className='quiz-edit-option-input'
                type="text"
                value={option.option}
                placeholder={`Option ${index + 1}`}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            </label>
            <div className='quiz-edit-checkbox'>
              <input
                className='quiz-edit-checkbox-input'
                type="checkbox"
                checked={option.isCorrect}
                onChange={(e) => handleCheckboxChange(index, e.target.checked)}
              />
            </div>
          </div>
        ))}
        <div className='quiz-edit-add-option'>
          <button className='quiz-edit-add-option-btn' onClick={handleAddOption}>
            <div className='quiz-edit-add-option-btn-content'>+</div>
          </button>
        </div>
      </div>
      <div>
        <label className='quiz-edit-bundle-label'>Bundle</label>
        <select
          className='quiz-edit-bundle-select'
          value={rightAnswerEditQuestion.stage}
          placeholder='Choose a bundle'
          onChange={(e) => setRightAnswerEditQuestion({ ...rightAnswerEditQuestion, stage: e.target.value })}
        >
          <option value="Easy">Easy Bundle</option>
          <option value="Medium">Medium Bundle</option>
          <option value="Hard">Hard Bundle</option>
        </select>
      </div>
      <button className='quiz-edit-submit-btn' onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default QuizzesEdit;
