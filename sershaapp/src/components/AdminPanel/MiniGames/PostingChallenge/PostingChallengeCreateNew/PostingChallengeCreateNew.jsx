import React, { useState } from 'react';
import { useGlobalContext } from '../../../../../context/context';
import closeButton from '../../../../../assets/images/adminPanel/closeButton.png';
import './postingChallengeCreateNew.css';
import axios from 'axios';

const PostingChallengeCreateNew = () => {
  const { baseUrl, setPostingChallengeCreateNew, allPostingChallengeAssignments, setAllPostingChallengeAssignments } = useGlobalContext();
  const [newPostingChallenge, setNewPostingChallenge] = useState({
    stage: '',
    questions: [
      {
        type: '',
        text: '',
        answers: [
          { text: 'Post', isCorrect: false },
          { text: "Don't post", isCorrect: false }
        ],
        imageFile: null,
        content: '',
      }
    ]
  });

  let dif = newPostingChallenge.stage === 'Easy' ? 0 : newPostingChallenge.stage === 'Medium' ? 1 : 2;

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...newPostingChallenge.questions];
    updatedQuestions[index][field] = value;
    setNewPostingChallenge({ ...newPostingChallenge, questions: updatedQuestions });
  };

  const handleAnswerChange = (questionIndex, answerIndex, value) => {
    const updatedQuestions = [...newPostingChallenge.questions];
    updatedQuestions[questionIndex].answers[answerIndex].isCorrect = value;
    setNewPostingChallenge({ ...newPostingChallenge, questions: updatedQuestions });
  };

  const handleImageChange = (index, file) => {
    const updatedQuestions = [...newPostingChallenge.questions];
    updatedQuestions[index].imageFile = file;
    setNewPostingChallenge({ ...newPostingChallenge, questions: updatedQuestions });
  };


  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append('difficulty', dif);
    newPostingChallenge.questions.forEach((question, qIndex) => {
      formData.append(`questions[${qIndex}][type]`, 7);
      formData.append(`questions[${qIndex}][questionText]`, question.text);
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
      setPostingChallengeCreateNew(false);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    setPostingChallengeCreateNew(false);
  };

  return (
    <div className="adminPanelCreateNewWrapper">
      <div className="close-btn" onClick={() => setPostingChallengeCreateNew(false)}>
        <img src={closeButton} alt='close' />
      </div>
      <h3 className="p-3 text-center">Create New Posting Challenge</h3>
      <div>
        <label className='fieldLabel'>Author Name:</label>
        <input
          className='inputField'
          type="text"
          value={newPostingChallenge.questions[0].text}
          placeholder='Author Name'
          onChange={(e) => handleQuestionChange(0, 'text', e.target.value)} />
      </div>
      <div>
        <label className='fieldLabel'>Post Content:</label>
        <input
          className='inputField'
          type="text"
          value={newPostingChallenge.questions[0].content}
          placeholder='Post Content'
          onChange={(e) => handleQuestionChange(0, 'content', e.target.value)} />
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
        {newPostingChallenge.questions[0].answers.map((answer, index) => (
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
          value={newPostingChallenge.stage}
          onChange={(e) => setNewPostingChallenge({ ...newPostingChallenge, stage: e.target.value })}
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

export default PostingChallengeCreateNew;
