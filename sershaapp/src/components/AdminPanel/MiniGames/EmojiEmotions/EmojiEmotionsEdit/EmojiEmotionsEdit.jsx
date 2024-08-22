import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../../../../context/context';
import closeButton from '../../../../../assets/images/adminPanel/closeButton.png';
import './emojiEmotionsEdit.css';
import Dropzone from 'react-dropzone';
import axios from 'axios';

const EmojiEmotionsEdit = () => {
  const { baseUrl, baseUrlImage, editingEmojiEmotions, setEditingEmojiEmotions, setIsEmojiEmotionsEdit, allEmojiEmotionsAssignments, setAllEmojiEmotionsAssignments } = useGlobalContext();
  const [emojiImage, setEmojiImage] = useState(editingEmojiEmotions?.questions[0]?.imagePath);
  const [editEmojiEmotion, setEditEmojiEmotion] = useState({
    difficulty: '',
    questions: [
      {
        type: '',
        imagePath: '',
        answers: [
          { text: '', isCorrect: false },
          { text: '', isCorrect: false },
          { text: '', isCorrect: false }
        ],
      }
    ]
  });

  useEffect(() => {
    if (editingEmojiEmotions) {
      setEditEmojiEmotion(editingEmojiEmotions);
    }
  }, [editingEmojiEmotions]);

  const handleSubmit = async () => {
    const updatedEmojiEmotionFormData = new FormData();
    updatedEmojiEmotionFormData.append('difficulty', editEmojiEmotion.difficulty);
    updatedEmojiEmotionFormData.append("questions[0][id]", editEmojiEmotion.questions[0].id);
    updatedEmojiEmotionFormData.append("questions[0][text]", editEmojiEmotion.questions[0].text);
    updatedEmojiEmotionFormData.append(`questions[0][type]`, editEmojiEmotion.questions[0].type);
    updatedEmojiEmotionFormData.append("questions[0].ImageFile", emojiImage);
    updatedEmojiEmotionFormData.append("questions[0][answers]", editEmojiEmotion.questions[0].answers);


    await axios.put(`${baseUrl}/Quizzes/${editEmojiEmotion.id}`, updatedEmojiEmotionFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
    });

    setEditingEmojiEmotions(null);
    setIsEmojiEmotionsEdit(false);
  };

  const handleImageDrop = (acceptedFiles) => {
    setEmojiImage(acceptedFiles[0])
  };

  const handleAnswerChange = (questionIndex, answerIndex, field, value) => {
    const updatedQuestions = [...editEmojiEmotion.questions];
    const updatedAnswers = [...updatedQuestions[questionIndex].answers];
    updatedAnswers[answerIndex] = {
      ...updatedAnswers[answerIndex],
      [field]: value
    };
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      answers: updatedAnswers
    };
    setEditEmojiEmotion({ ...editEmojiEmotion, questions: updatedQuestions });
  };

  const handleAddAnswer = (questionIndex) => {
    const updatedQuestions = [...editEmojiEmotion.questions];
    const updatedAnswers = [...updatedQuestions[questionIndex].answers, { text: '', isCorrect: false }];
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      answers: updatedAnswers
    };
    setEditEmojiEmotion({ ...editEmojiEmotion, questions: updatedQuestions });
  };

  const dif = editEmojiEmotion.difficulty === 'Easy' ? 0 : editEmojiEmotion.difficulty === 'Medium' ? 1 : 2;
  return (
    <div className="editEmojiEmotionContainer">
      <div className="close-btn" onClick={() => setIsEmojiEmotionsEdit(false)}>
        <img src={closeButton} alt='close' />
      </div>
      <h3 className="p-3 text-center titleMini">Edit Emoji Emotion</h3>
      <div>
        <label className='fieldLabel'>Upload Emoji:</label>
        <Dropzone onDrop={handleImageDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="dropzone">
              <input {...getInputProps()} />
              {emojiImage ? (
                <img src={typeof emojiImage === 'string' ? `${baseUrlImage}/${emojiImage}` : URL.createObjectURL(emojiImage)} alt="image" className="uploaded-image" />
              ) : (
                <p>Drag 'n' drop an image here, or click to select an image</p>
              )}
            </div>
          )}
        </Dropzone>
      </div>
      <div className='optionsForm'>
        <label className='fieldLabel'>Options</label>
        {editEmojiEmotion?.questions[0]?.answers.map((ans, aIndex) => (
          <div className='optionBox' key={aIndex} style={{ marginBlock: ".5rem" }}>
            <input
              className='inputField'
              type="text"
              value={ans.text}
              placeholder={`Option ${aIndex + 1}`}
              onChange={(e) => handleAnswerChange(0, aIndex, 'text', e.target.value)}
            />
            <input
              className='inputField'
              type="checkbox"
              checked={ans.isCorrect}
              onChange={(e) => handleAnswerChange(0, aIndex, 'isCorrect', e.target.checked)}
            />
          </div>
        ))}
        <button className='addNewOptionFieldBtn' onClick={() => handleAddAnswer(0)}>
          <div className='incrementCharacter'>+</div>
        </button>
      </div>
      <div>
        <label>Stage</label>
        <select
          className='dropdown'
          value={editEmojiEmotion?.difficulty === 0 ? 'Easy' : editEmojiEmotion?.difficulty === 1 ? 'Medium' : 'Hard'}
          onChange={(e) => setEditEmojiEmotion({ ...editEmojiEmotion, difficulty: e.target.value === 'Easy' ? 0 : e.target.value === 'Medium' ? 1 : 2 })}
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

export default EmojiEmotionsEdit;
