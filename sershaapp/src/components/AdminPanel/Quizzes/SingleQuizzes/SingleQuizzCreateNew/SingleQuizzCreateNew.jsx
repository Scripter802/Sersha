import React, { useState } from 'react';
import './singleQuizzCreateNew.css';

const SingleQuizzCreateNew = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ text: '', answers: [{ text: '', isCorrect: false }] }]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { text: '', answers: [{ text: '', isCorrect: false }] }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleAddOption = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers.push({ text: '', isCorrect: false });
    setQuestions(newQuestions);
  };

  const handleSave = () => {
    onSave({ title, questions });
  };

  return (
    <div className="singleQuizzCreateNewContainer">
      <h3>Create New Quiz</h3>
      <div className="formGroup">
        <label>Quiz Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      {questions.map((question, index) => (
        <div key={index} className="formGroup">
          <label>Question {index + 1}</label>
          <input
            type="text"
            value={question.text}
            onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
          />
          <label>Options</label>
          {question.answers.map((answer, answerIndex) => (
            <input
              key={answerIndex}
              type="text"
              value={answer.text}
              onChange={(e) =>
                handleQuestionChange(index, `answers[${answerIndex}].text`, e.target.value)
              }
            />
          ))}
          <button className="addOption-btn" onClick={() => handleAddOption(index)}>
            Add Option
          </button>
        </div>
      ))}
      <div className="buttonGroup">
        <button className="save-btn" onClick={handleSave}>
          Save
        </button>
        <button className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
      <button className="addQuestion-btn" onClick={handleAddQuestion}>
        Add Question
      </button>
    </div>
  );
};

export default SingleQuizzCreateNew;
