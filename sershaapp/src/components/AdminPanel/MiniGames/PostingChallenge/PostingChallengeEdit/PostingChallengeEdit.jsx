import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../../../../context/context';
import closeButton from '../../../../../assets/images/adminPanel/closeButton.png';
import './postingChallengeEdit.css';
import Dropzone from 'react-dropzone';
import axios from 'axios';

const PostingChallengeEdit = () => {
  const { baseUrl, baseUrlImage, editingPostingChallenge, setEditingPostingChallenge, setIsPostingChallengeEdit, allPostingChallengeAssignments, setAllPostingChallengeAssignments } = useGlobalContext();
  const [imagePosting, setImagePosting] = useState(editingPostingChallenge?.questions[0]?.imagePath);
  const [editPostingChallenge, setEditPostingChallenge] = useState({
    difficulty: '',
    questions: [
      {
        type: '',
        text: '',
        answers: [
          { text: 'Post', isCorrect: false },
          { text: "Don't post", isCorrect: false }
        ],
        imagePath: '',
        content: '',
      }
    ]
  });

  useEffect(() => {
    if (editingPostingChallenge) {
      setEditPostingChallenge(editingPostingChallenge);
    }
  }, [editingPostingChallenge]);

  const handleSubmit = async () => {
    const updatedPostingChallengeFormData = new FormData();
    updatedPostingChallengeFormData.append('id', editPostingChallenge.id);
    updatedPostingChallengeFormData.append('difficulty', editPostingChallenge.difficulty);
    updatedPostingChallengeFormData.append("questions[0][id]", editPostingChallenge.questions[0].id);
    updatedPostingChallengeFormData.append("questions[0][text]", editPostingChallenge.questions[0].text);
    updatedPostingChallengeFormData.append("questions[0][content]", editPostingChallenge.questions[0].content);
    updatedPostingChallengeFormData.append(`questions[0][type]`, editPostingChallenge.questions[0].type);
    updatedPostingChallengeFormData.append("questions[0].imageFile", imagePosting);

    editPostingChallenge.questions[0].answers.forEach((answer, index) => {
      updatedPostingChallengeFormData.append(`questions[0][answers][${index}][text]`, answer.text);
      updatedPostingChallengeFormData.append(`questions[0][answers][${index}][isCorrect]`, answer.isCorrect);
    });


    await axios.put(`${baseUrl}/Quizzes/${editPostingChallenge.id}`, updatedPostingChallengeFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
    });

    setAllPostingChallengeAssignments(prevAssignments => prevAssignments.map(assignment => assignment.id === editPostingChallenge.id ? editPostingChallenge : assignment));


    setEditingPostingChallenge(null);
    setIsPostingChallengeEdit(false);
  };

  const handleImageDrop = (acceptedFiles) => {
    setImagePosting(acceptedFiles[0]);
  };

  const handleCheckboxChange = (index, isChecked) => {
    const updatedQuestions = [...editPostingChallenge.questions];
    const updatedAnswers = [...updatedQuestions[0].answers];
    updatedAnswers[index].isCorrect = isChecked;
    updatedQuestions[0] = {
      ...updatedQuestions[0],
      answers: updatedAnswers
    };
    setEditPostingChallenge({ ...editPostingChallenge, questions: updatedQuestions });
  };

  const handleInputChange = (field, value, questionIndex = null) => {
    if (questionIndex !== null) {
      const updatedQuestions = [...editPostingChallenge?.questions];
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        [field]: value,
      };
      setEditPostingChallenge({ ...editPostingChallenge, questions: updatedQuestions });
    } else {
      setEditPostingChallenge({ ...editPostingChallenge, [field]: value });
    }
  };


  const dif = editPostingChallenge.difficulty === 'Easy' ? 0 : editPostingChallenge.difficulty === 'Medium' ? 1 : 2;

  return (
    <div className="editPostingChallengeContainer">
      <div className="close-btn" onClick={() => setIsPostingChallengeEdit(false)}>
        <img src={closeButton} alt='close' />
      </div>
      <h3 className="p-3 text-center">Edit Posting Challenge</h3>
      <div>
        <label className='fieldLabel'>Author Name:</label>
        <input
          className='inputField'
          type="text"
          value={editPostingChallenge.questions[0].text}
          placeholder='Author Name'
          onChange={(e) => handleInputChange('text', e.target.value, 0)} />
      </div>
      <div>
        <label className='fieldLabel'>Post Content:</label>
        <input
          className='inputField'
          type="text"
          value={editPostingChallenge.questions[0].content}
          placeholder='Post Content'
          onChange={(e) => handleInputChange('content', e.target.value, 0)} />
      </div>
      <div>
        <label className='fieldLabel'>Upload Image:</label>
        <Dropzone onDrop={handleImageDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="dropzone">
              <input {...getInputProps()} />
              {imagePosting ? (
                <img src={typeof imagePosting === 'string' ? `${baseUrlImage}/${imagePosting}` : URL.createObjectURL(imagePosting)} alt="image" className="uploaded-image" />
              ) : (
                <p>Drag 'n' drop an image here, or click to select an image</p>
              )}
            </div>
          )}
        </Dropzone>
      </div>
      <div>
        {editPostingChallenge.questions[0].answers.map((answer, index) => (
          <div key={index}>
            <input
              type="checkbox"
              checked={answer.isCorrect}
              onChange={(e) => handleCheckboxChange(index, e.target.checked)}
            />
            <label>{answer.text}</label>
          </div>
        ))}
      </div>
      <div>
        <label>Stage</label>
        <select
          className='dropdown'
          value={editPostingChallenge?.difficulty === 0 ? 'Easy' : editPostingChallenge?.difficulty === 1 ? 'Medium' : 'Hard'}
          onChange={(e) => setEditPostingChallenge({ ...editPostingChallenge, difficulty: e.target.value === 'Easy' ? 0 : e.target.value === 'Medium' ? 1 : 2 })}
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

export default PostingChallengeEdit;
