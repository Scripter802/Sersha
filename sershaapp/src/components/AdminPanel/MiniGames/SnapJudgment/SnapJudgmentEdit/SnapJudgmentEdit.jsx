import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../../../../context/context';
import closeButton from '../../../../../assets/images/adminPanel/closeButton.png';
import './snapJudgmentEdit.css';
import Dropzone from 'react-dropzone';
import axios from 'axios';

const SnapJudgmentEdit = () => {
  const { baseUrl, baseUrlImage, editingSnapJudgment, setEditingSnapJudgment, setIsSnapJudgmentEdit, allSnapJudgmentAssignments, setAllSnapJudgmentAssignments } = useGlobalContext();
  const [snapImage, setSnapImage] = useState(editingSnapJudgment?.questions[0].imagePath);
  const [editSnapJudgment, setEditSnapJudgment] = useState({
    difficulty: '',
    questions: [
      {
        type: '',
        text: '',
        answers: [
          { text: 'Unlike', isCorrect: false },
          { text: 'Neutral', isCorrect: false },
          { text: 'Like', isCorrect: false }
        ],
        content: '',
      }
    ]
  });


  useEffect(() => {
    if (editingSnapJudgment) {
      setEditSnapJudgment(editingSnapJudgment);
    }
  }, []);

  console.log(editingSnapJudgment, editSnapJudgment);

  const handleSubmit = async () => {
    const updatedSnapJudgmentFormData = new FormData();
    updatedSnapJudgmentFormData.append('difficulty', editSnapJudgment.difficulty);
    updatedSnapJudgmentFormData.append("questions[0][text]", editSnapJudgment.questions[0].text);
    updatedSnapJudgmentFormData.append("questions[0][content]", editingSnapJudgment.questions[0].content);
    updatedSnapJudgmentFormData.append(`questions[0][type]`, editSnapJudgment.questions[0].type);
    updatedSnapJudgmentFormData.append("questions[0][imageFile]", snapImage);
    updatedSnapJudgmentFormData.append("questions[0][answers]", editSnapJudgment.questions[0].answers);


    await axios.put(`${baseUrl}/Quizzes/${editSnapJudgment.id}}`, updatedSnapJudgmentFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
    });

    setEditingSnapJudgment(null);
    setIsSnapJudgmentEdit(false);
  };

  const handleImageDrop = (acceptedFiles) => {
    setSnapImage(acceptedFiles[0]);
  };

  const handleCheckboxChange = (index, isChecked) => {
    const updatedQuestions = [...editSnapJudgment.questions];
    const updatedAnswers = [...updatedQuestions[0].answers];
    updatedAnswers[index].isCorrect = isChecked;
    updatedQuestions[0] = {
      ...updatedQuestions[0],
      answers: updatedAnswers
    };
    setEditSnapJudgment({ ...editSnapJudgment, questions: updatedQuestions });
  };

  const handleInputChange = (field, value, questionIndex = null) => {
    if (questionIndex !== null) {
      const updatedQuestions = [...editSnapJudgment.questions];
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        [field]: value,
      };
      setEditSnapJudgment({ ...editSnapJudgment, questions: updatedQuestions });
    } else {
      setEditSnapJudgment({ ...editSnapJudgment, [field]: value });
    }
  };


  return (
    <div className="editSnapJudgmentContainer">
      <div className="close-btn" onClick={() => setIsSnapJudgmentEdit(false)}>
        <img src={closeButton} alt='close' />
      </div>
      <h3 className="p-3 text-center titleMini">Edit Snap Judgment</h3>
      <div>
        <label className='fieldLabel'>Author Name:</label>
        <input
          className='inputField'
          type="text"
          value={editSnapJudgment?.questions[0]?.text}
          placeholder='Author Name'
          onChange={(e) => handleInputChange('text', e.target.value, 0)}
        />
      </div>
      <div>
        <label className='fieldLabel'>Post Content:</label>
        <input
          className='inputField'
          type="text"
          value={editSnapJudgment?.questions[0]?.content}
          placeholder='Post Content'
          onChange={(e) => handleInputChange('content', e.target.value, 0)}
        />
      </div>
      <div>
        <label className='fieldLabel'>Upload Image:</label>
        <Dropzone onDrop={handleImageDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="dropzone">
              <input {...getInputProps()} />
              {snapImage ? (
                <img src={typeof snapImage === 'string' ? `${baseUrlImage}/${snapImage}` : URL.createObjectURL(snapImage)} alt="image" className="uploaded-image" />
              ) : (
                <p>Drag 'n' drop an image here, or click to select an image</p>
              )}
            </div>
          )}
        </Dropzone>
      </div>
      <div>
        <label className='fieldLabel'>Correct Answer:</label>
        <div>
          {editSnapJudgment?.questions[0]?.answers?.map((answer, index) => (
            <div key={index}>
              <input
                type="checkbox"
                checked={answer?.isCorrect}
                onChange={(e) => handleCheckboxChange(index, e.target.checked)}
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
          value={editSnapJudgment?.difficulty === 0 ? 'Easy' : editSnapJudgment?.difficulty === 1 ? 'Medium' : 'Hard'}
          onChange={(e) => handleInputChange('difficulty', e.target.value === 'Easy' ? 0 : e.target.value === 'Medium' ? 1 : 2)}
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

export default SnapJudgmentEdit;
