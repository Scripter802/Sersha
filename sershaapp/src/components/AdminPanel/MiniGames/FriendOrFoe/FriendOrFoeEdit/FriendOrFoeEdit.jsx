import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../../../../context/context';
import closeButton from '../../../../../assets/images/adminPanel/closeButton.png';
import './friendOrFoeEdit.css';

import Dropzone from 'react-dropzone';

const FriendOrFoeEdit = () => {
  const { baseUrl, baseUrlImage, editingFriendOrFoe, setEditingFriendOrFoe, setIsFriendOrFoeEdit, allFriendOrFoeAssignments, setAllFriendOrFoeAssignments } = useGlobalContext();
  const [friendOrFoeImage, setFriendOrFoeImage] = useState(editingFriendOrFoe?.questions[0].imagePath);
  const [editFriendOrFoe, setEditFriendOrFoe] = useState({
    difficulty: '',
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

  useEffect(() => {
    if (editingFriendOrFoe) {
      setEditFriendOrFoe(editingFriendOrFoe);
    }
  }, [editingFriendOrFoe]);

  const handleSubmit = async () => {
    const updatedPostingChallengeFormData = new FormData();
    updatedPostingChallengeFormData.append('id', editingFriendOrFoe.id);
    updatedPostingChallengeFormData.append('difficulty', editingFriendOrFoe.difficulty);
    updatedPostingChallengeFormData.append("questions[0][text]", editingFriendOrFoe.questions[0].text);
    updatedPostingChallengeFormData.append("questions[0][content]", editingFriendOrFoe.questions[0].content);
    updatedPostingChallengeFormData.append(`questions[0][type]`, editingFriendOrFoe.questions[0].type);
    updatedPostingChallengeFormData.append("questions[0][imageFile]", snapImage);
    updatedPostingChallengeFormData.append("questions[0][answers]", editingFriendOrFoe.questions[0].answers);


    await axios.put(`${baseUrl}/Quizzes/${editingFriendOrFoe.id}`, updatedPostingChallengeFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
    });

    setEditingFriendOrFoe(null);
    setIsFriendOrFoeEdit(false);
  };

  const handleImageDrop = (acceptedFiles) => {
    setFriendOrFoeImage(acceptedFiles[0])
  };

  const handleAnswerChange = (questionIndex, answerIndex, field, value) => {
    const updatedQuestions = [...editFriendOrFoe.questions];
    const updatedAnswers = [...updatedQuestions[questionIndex].answers];
    updatedAnswers[answerIndex] = {
      ...updatedAnswers[answerIndex],
      [field]: value
    };
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      answers: updatedAnswers
    };
    setEditFriendOrFoe({ ...editFriendOrFoe, questions: updatedQuestions });
  };

  const handleInputChange = (field, value, questionIndex = null) => {
    if (questionIndex !== null) {
      const updatedQuestions = [...editFriendOrFoe.questions];
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        [field]: value,
      };
      setEditFriendOrFoe({ ...editFriendOrFoe, questions: updatedQuestions });
    } else {
      setEditFriendOrFoe({ ...editFriendOrFoe, [field]: value });
    }
  };

  const dif = editFriendOrFoe.difficulty === 'Easy' ? 0 : editFriendOrFoe.difficulty === 'Medium' ? 1 : 2;


  return (
    <div className="editFriendOrFoeContainer">
      <div className="close-btn" onClick={() => setIsFriendOrFoeEdit(false)}>
        <img src={closeButton} alt='close' />
      </div>
      <h3 className="p-3 text-center">Edit Friend Or Foe</h3>
      <div>
        <label className='fieldLabel'>Profile Name:</label>
        <input
          className='inputField'
          type="text"
          value={editFriendOrFoe.questions[0].text}
          placeholder='Profile Name'
          onChange={(e) => handleInputChange('text', e.target.value, 0)}
        />
      </div>
      <div>
        <label className='fieldLabel'>Gender:</label>
        <input
          className='inputField'
          type="text"
          // value={editFriendOrFoe.PostContent}
          placeholder='Gender'
        // onChange={(e) => setEditFriendOrFoe({ ...editFriendOrFoe, PostContent: e.target.value })}
        />
      </div>
      <div>
        <label className='fieldLabel'>Profile Description:</label>
        <input
          className='inputField'
          type="text"
          value={editFriendOrFoe.questions[0].content}
          placeholder='Profile Description'
          onChange={(e) => handleInputChange('content', e.target.value, 0)}
        />
      </div>
      <div>
        <label className='fieldLabel'>Upload Image:</label>
        <Dropzone onDrop={handleImageDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="dropzone">
              <input {...getInputProps()} />
              {friendOrFoeImage ? (
                <img src={typeof friendOrFoeImage === 'string' ? `${baseUrlImage}/${friendOrFoeImage}` : URL.createObjectURL(friendOrFoeImage)} alt="image" className="uploaded-image" />
              ) : (
                <p>Drag 'n' drop an image here, or click to select an image</p>
              )}
            </div>
          )}
        </Dropzone>
      </div>
      <div>
        {editFriendOrFoe.questions[0].answers.map((answer, index) => (
          <div key={index}>
            <input
              type="checkbox"
              checked={answer.isCorrect}
              onChange={(e) => handleAnswerChange(0, index, 'isCorrect', e.target.checked)}
            />
            <label>{answer.text}</label>
          </div>
        ))}
      </div>
      <div>
        <label>Stage</label>
        <select
          className='dropdown'
          value={editFriendOrFoe?.difficulty === 0 ? 'Easy' : editFriendOrFoe?.difficulty === 1 ? 'Medium' : 'Hard'}
          onChange={(e) => setEditFriendOrFoe({ ...editFriendOrFoe, difficulty: e.target.value === 'Easy' ? 0 : e.target.value === 'Medium' ? 1 : 2 })}
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

export default FriendOrFoeEdit;
