import React, { useState } from 'react';
import { useGlobalContext } from '../../../../../context/context';
import closeButton from '../../../../../assets/images/adminPanel/closeButton.png';
import './friendOrFoeCreateNew.css';
import axios from 'axios';

const FriendOrFoeCreateNew = () => {
  const { baseUrl, setFriendOrFoeCreateNew, allFriendOrFoeAssignments, setAllFriendOrFoeAssignments } = useGlobalContext();
  const [newFriendOrFoe, setNewFriendOrFoe] = useState({
    stage: '',
    questions: [
      {
        type: '',
        text: '',
        content: '',
        imageFile: null,
        answers: [
          { text: 'Decline', isCorrect: false },
          { text: "Accept", isCorrect: false }
        ],
      }
    ]
  });

  let dif = newFriendOrFoe.stage === 'Easy' ? 0 : newFriendOrFoe.stage === 'Medium' ? 1 : 2;

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...newFriendOrFoe.questions];
    updatedQuestions[index][field] = value;
    setNewFriendOrFoe({ ...newFriendOrFoe, questions: updatedQuestions });
  };

  const handleAnswerChange = (questionIndex, answerIndex, value) => {
    const updatedQuestions = [...newFriendOrFoe.questions];
    updatedQuestions[questionIndex].answers[answerIndex].isCorrect = value;
    setNewFriendOrFoe({ ...newFriendOrFoe, questions: updatedQuestions });
  };

  const handleImageChange = (index, file) => {
    const updatedQuestions = [...newFriendOrFoe.questions];
    updatedQuestions[index].imageFile = file;
    setNewFriendOrFoe({ ...newFriendOrFoe, questions: updatedQuestions });
  };


  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append('difficulty', dif);
    newFriendOrFoe.questions.forEach((question, qIndex) => {
      formData.append(`questions[${qIndex}][type]`, 6);
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
      setFriendOrFoeCreateNew(false);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    setFriendOrFoeCreateNew(false);
  };

  return (
    <div className="adminPanelCreateNewWrapper">
      <div className="close-btn" onClick={() => setFriendOrFoeCreateNew(false)}>
        <img src={closeButton} alt='close' />
      </div>
      <h3 className="p-3 text-center">Create New Friend Or Foe</h3>
      <div>
        <label className='fieldLabel'>Profile Name:</label>
        <input
          className='inputField'
          type="text"
          value={newFriendOrFoe.questions[0].text}
          placeholder='Profile Name'
          onChange={(e) => handleQuestionChange(0, 'text', e.target.value)}
        />
      </div>
      <div>
        <label className='fieldLabel'>Gender:</label>
        <input
          className='inputField'
          type="text"
          // value={newFriendOrFoe.PostContent}
          placeholder='Gender'
        // onChange={(e) => setNewFriendOrFoe({ ...newFriendOrFoe, PostContent: e.target.value })}
        />
      </div>
      <div>
        <label className='fieldLabel'>Profile Description:</label>
        <input
          className='inputField'
          type="text"
          value={newFriendOrFoe.questions[0].content}
          placeholder='Profile Description'
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
        {newFriendOrFoe.questions[0].answers.map((answer, index) => (
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
      <div>
        <label>Stage</label>
        <select
          className='dropdown'
          value={newFriendOrFoe.stage}
          onChange={(e) => setNewFriendOrFoe({ ...newFriendOrFoe, stage: e.target.value })}
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

export default FriendOrFoeCreateNew;
