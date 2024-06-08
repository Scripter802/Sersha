import React, { useState } from 'react';
import { useGlobalContext } from '../../../../../context/context';
import closeButton from '../../../../../assets/images/adminPanel/closeButton.png';
import './emojiEmotionsCreateNew.css';

const EmojiEmotionsCreateNew = () => {
  const { setEmojiEmotionsCreateNew, allEmojiEmotionsAssignments, setAllEmojiEmotionsAssignments } = useGlobalContext();
  const [newEmojiEmotion, setNewEmojiEmotion] = useState({
    Image: null,
    AuthorName: '',
    PostContent: '',
    CorrectAnswer: '',
    Stage: '',
  });

  const handleSubmit = () => {
    setAllEmojiEmotionsAssignments([...allEmojiEmotionsAssignments, newEmojiEmotion]);
    setEmojiEmotionsCreateNew(false);
  };

  return (
    <div className="createNewEmojiEmotionContainer">
      <div className="close-btn" onClick={() => setEmojiEmotionsCreateNew(false)}>
        <img src={closeButton} alt='close' />
      </div>
      <h3 className="p-3 text-center titleMini">Create New Emoji Emotion</h3>
      <div>
        <label className='fieldLabel'>Author Name:</label>
        <input
          className='inputField'
          type="text"
          value={newEmojiEmotion.AuthorName}
          placeholder='Author Name'
          onChange={(e) => setNewEmojiEmotion({ ...newEmojiEmotion, AuthorName: e.target.value })}
        />
      </div>
      <div>
        <label className='fieldLabel'>Post Content:</label>
        <input
          className='inputField'
          type="text"
          value={newEmojiEmotion.PostContent}
          placeholder='Post Content'
          onChange={(e) => setNewEmojiEmotion({ ...newEmojiEmotion, PostContent: e.target.value })}
        />
      </div>
      <div>
        <label className='fieldLabel'>Correct Answer:</label>
        <input
          className='inputField'
          type="text"
          value={newEmojiEmotion.CorrectAnswer}
          placeholder='Correct Answer'
          onChange={(e) => setNewEmojiEmotion({ ...newEmojiEmotion, CorrectAnswer: e.target.value })}
        />
      </div>
      <div>
        <label>Stage</label>
        <select
          className='dropdown'
          value={newEmojiEmotion.Stage}
          onChange={(e) => setNewEmojiEmotion({ ...newEmojiEmotion, Stage: e.target.value })}
        >
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
