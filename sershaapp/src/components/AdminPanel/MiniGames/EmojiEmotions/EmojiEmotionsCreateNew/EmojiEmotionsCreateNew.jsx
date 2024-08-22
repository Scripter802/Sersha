import React, { useState } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../../../../../context/context';
import closeButton from '../../../../../assets/images/adminPanel/closeButton.png';

const EmojiEmotionsCreateNew = () => {
  const { setEmojiEmotionsCreateNew, allEmojiEmotionsAssignments, setAllEmojiEmotionsAssignments, baseUrl } = useGlobalContext();
  const [newEmojiEmotion, setNewEmojiEmotion] = useState({
    stage: '',
    questions: [
      {
        type: '',
        imageFile: null,
        answers: [
          { text: '', isCorrect: false },
          { text: '', isCorrect: false },
          { text: '', isCorrect: false }
        ],
      }
    ]
  });

  const dif = newEmojiEmotion.stage === 'Easy' ? 0 : newEmojiEmotion.stage === 'Medium' ? 1 : 2;

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append('difficulty', dif);
    formData.append(`questions[0][type]`, 5);
    formData.append(`questions[0][text]`, 'asd');
    formData.append(`questions[0].imageFile`, newEmojiEmotion?.questions[0]?.imageFile);
    newEmojiEmotion?.questions[0]?.answers.forEach((answer, aIndex) => {
      formData.append(`questions[0][answers][${aIndex}][text]`, answer.text);
      formData.append(`questions[0][answers][${aIndex}][isCorrect]`, answer.isCorrect);
    });

    console.log(`formdata: ${formData}`);

    try {
      const response = await axios.post(`${baseUrl}/Quizzes/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setNewEmojiEmotion({
        stage: '',
        questions: [
          {
            type: '',
            imageFile: null,
            answers: [
              { text: '', isCorrect: false },
              { text: '', isCorrect: false },
              { text: '', isCorrect: false }
            ],
          }
        ]
      });
      console.log(response.data);
      setEmojiEmotionsCreateNew(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddAnswer = (qIndex) => {
    const updatedQuestions = [...newEmojiEmotion.questions];
    updatedQuestions[qIndex].answers.push({ text: '', isCorrect: false });
    setNewEmojiEmotion({ ...newEmojiEmotion, questions: updatedQuestions });
  };

  const handleAnswerChange = (qIndex, aIndex, field, value) => {
    const updatedQuestions = [...newEmojiEmotion.questions];
    updatedQuestions[qIndex].answers[aIndex][field] = value;
    setNewEmojiEmotion({ ...newEmojiEmotion, questions: updatedQuestions });
  };

  const handleImageChange = (index, file) => {
    const updatedQuestions = [...newEmojiEmotion.questions];
    updatedQuestions[index].imageFile = file;
    setNewEmojiEmotion({ ...newEmojiEmotion, questions: updatedQuestions });
  };

  return (
    <div className="adminPanelCreateNewWrapper">
      <div className="close-btn" onClick={() => setEmojiEmotionsCreateNew(false)}>
        <img src={closeButton} alt='close' />
      </div>
      <h3 className="p-3 text-center titleMini" style={{ padding: '.5rem' }}>Create New Emoji Emotion</h3>
      <div>
        <label className='fieldLabel'>Upload Emoji:</label>
        <input
          className='inputField'
          type="file"
          onChange={(e) => handleImageChange(0, e.target.files[0])}
        />
      </div>
      <div className='optionsForm'>
        <label className='fieldLabel'>Options (check correct answer)</label>
        {newEmojiEmotion?.questions[0]?.answers.map((ans, aIndex) => (
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
          value={newEmojiEmotion.stage}
          onChange={(e) => setNewEmojiEmotion({ ...newEmojiEmotion, stage: e.target.value })}
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

export default EmojiEmotionsCreateNew;
