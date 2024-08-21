import React, { useState } from 'react';
import { useGlobalContext } from '../../../../../context/context';
import closeButton from '../../../../../assets/images/adminPanel/closeButton.png';
import axios from 'axios';

const SnapJudgmentCreateNew = () => {
  const { baseUrl, setSnapJudgmentCreateNew, allSnapJudgmentAssignments, setAllSnapJudgmentAssignments } = useGlobalContext();
  const [newSnapJudgment, setNewSnapJudgment] = useState({
    stage: '',
    questions: [
      {
        type: '',
        text: '',
        answers: [
          { text: 'Unlike', isCorrect: false },
          { text: 'Neutral', isCorrect: false },
          { text: 'Like', isCorrect: false }
        ],
        imageFile: null,
        content: '',
      }
    ]
  });

  let dif = newSnapJudgment.stage === 'Easy' ? 0 : newSnapJudgment.stage === 'Medium' ? 1 : 2;

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...newSnapJudgment.questions];
    updatedQuestions[index][field] = value;
    setNewSnapJudgment({ ...newSnapJudgment, questions: updatedQuestions });
  };

  const handleAnswerChange = (questionIndex, answerIndex, value) => {
    const updatedQuestions = [...newSnapJudgment.questions];
    updatedQuestions[questionIndex].answers[answerIndex].isCorrect = value;
    setNewSnapJudgment({ ...newSnapJudgment, questions: updatedQuestions });
  };

  const handleImageChange = (index, file) => {
    const updatedQuestions = [...newSnapJudgment.questions];
    updatedQuestions[index].imageFile = file;
    setNewSnapJudgment({ ...newSnapJudgment, questions: updatedQuestions });
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append('difficulty', dif);
    newSnapJudgment.questions.forEach((question, qIndex) => {
      formData.append(`questions[${qIndex}][type]`, 4);
      formData.append(`questions[${qIndex}][text]`, question.text);
      formData.append(`questions[${qIndex}][content]`, question.content);
      formData.append(`questions[${qIndex}].imageFile`, question.imageFile);
      question.answers.forEach((answer, aIndex) => {
        formData.append(`questions[${qIndex}][answers][${aIndex}][text]`, answer.text);
        formData.append(`questions[${qIndex}][answers][${aIndex}][isCorrect]`, answer.isCorrect);
      });
    });

    try {
      const response = await axios.post(`${baseUrl}/Quizzes/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSnapJudgmentCreateNew(false);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    setSnapJudgmentCreateNew(false);
  };

  console.log(newSnapJudgment);

  return (
    <div className="adminPanelCreateNewWrapper">
      <div className="close-btn" onClick={() => setSnapJudgmentCreateNew(false)}>
        <img src={closeButton} alt='close' />
      </div>
      <h3 className="p-3 text-center titleMini">Create New Snap Judgment</h3>
      <div>
        <label className='fieldLabel'>Author Name:</label>
        <input
          className='inputField'
          type="text"
          value={newSnapJudgment.questions[0].text}
          placeholder='Author Name'
          onChange={(e) => handleQuestionChange(0, 'text', e.target.value)}
        />
      </div>
      <div>
        <label className='fieldLabel'>Post Content:</label>
        <input
          className='inputField'
          type="text"
          value={newSnapJudgment.questions[0].content}
          placeholder='Post Content'
          onChange={(e) => handleQuestionChange(0, 'content', e.target.value)}
        />
      </div>
      <div>
        <label className='fieldLabel'>Upload Image:</label>
        <input
          className='inputField'
          type="file"
          onChange={(e) => handleImageChange(0, e.target.files[0])}
        />
      </div>
      <div>
        <label className='fieldLabel'>Correct Answer:</label>
        <div>
          {newSnapJudgment.questions[0].answers.map((answer, index) => (
            <div key={index}>
              <input
                type="checkbox"
                checked={answer.isCorrect}
                onChange={(e) => handleAnswerChange(0, index, e.target.checked)}
              />
              <label>{answer.text}</label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <label>Stage</label>
        <select
          className='dropdown'
          value={newSnapJudgment.stage}
          onChange={(e) => setNewSnapJudgment({ ...newSnapJudgment, stage: e.target.value })}
        >
          <option value="" disabled>Select Bundle</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <button className='submitBtn' onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default SnapJudgmentCreateNew;
