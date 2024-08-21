import React, { useState } from 'react';
import './singleQuizzEdit.css';
import { useGlobalContext } from '../../../../../context/context';

const SingleQuizzEdit = ({ quizz, onSave, onCancel }) => {
  const { selectedQuestion, setQuestionEdit, setSelectedQuestion } = useGlobalContext();
  const [text, setText] = useState(selectedQuestion.text);
  const [answers, setAnswers] = useState(selectedQuestion.answers);

  const handleAnswerChange = (answerIndex, value) => {
    const newAnswers = [...answers];
    newAnswers[answerIndex].text = value;
    setAnswers(newAnswers);
  };

  const handleSave = () => {
    const updatedQuestion = { ...selectedQuestion, text: text, answers };
    const updatedQuestions = [...quizz.questions];
    updatedQuestions[selectedQuestion.index] = updatedQuestion;

    const updatedQuizz = { ...quizz, questions: updatedQuestions };
    onSave(updatedQuizz);
    setQuestionEdit(false);
    setSelectedQuestion(null);
  };

  return (
    <div className="singleQuizzEditContainer">
      <h3>Edit Quiz</h3>
      <div className="formGroup">
        <label>Question Text</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="formGroup">
        <label>Options</label>
        {answers.map((answer, answerIndex) => (
          <input
            key={answerIndex}
            type="text"
            value={answer.text}
            onChange={(e) => handleAnswerChange(answerIndex, e.target.value)}
          />
        ))}
      </div>
      <div className="buttonGroup">
        <button className="save-btn" onClick={handleSave}>
          Save
        </button>
        <button className="cancel-btn" onClick={() => {
          setQuestionEdit(false);
          setSelectedQuestion(null);
        }}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SingleQuizzEdit;
