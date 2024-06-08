import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../../../../context/context';
import closeButton from '../../../../../assets/images/adminPanel/closeButton.png';
import './emojiEmotionsEdit.css';

const EmojiEmotionsEdit = () => {
  const { editingEmojiEmotions, setEditingEmojiEmotions, setIsEmojiEmotionsEdit, allEmojiEmotionsAssignments, setAllEmojiEmotionsAssignments } = useGlobalContext();
  const [editEmojiEmotion, setEditEmojiEmotion] = useState({
    Image: null,
    AuthorName: '',
    PostContent: '',
    CorrectAnswer: '',
    Stage: '',
  });

  useEffect(() => {
    if (editingEmojiEmotions) {
      setEditEmojiEmotion(editingEmojiEmotions);
    }
  }, [editingEmojiEmotions]);

  const handleSubmit = () => {
    const updatedAssignments = allEmojiEmotionsAssignments.map(assignment =>
      assignment.id === editEmojiEmotion.id ? editEmojiEmotion : assignment
    );
    setAllEmojiEmotionsAssignments(updatedAssignments);

    setEditingEmojiEmotions(null);
    setIsEmojiEmotionsEdit(false);
  };

  return (
    <div className="editEmojiEmotionContainer">
      <div className="close-btn" onClick={() => setIsEmojiEmotionsEdit(false)}>
        <img src={closeButton} alt='close' />
      </div>
      <h3 className="p-3 text-center titleMini">Edit Emoji Emotion</h3>
      <div>
        <label className='fieldLabel'>Author Name:</label>
        <input
          className='inputField'
          type="text"
          value={editEmojiEmotion.AuthorName}
          placeholder='Author Name'
          onChange={(e) => setEditEmojiEmotion({ ...editEmojiEmotion, AuthorName: e.target.value })}
        />
      </div>
      <div>
        <label className='fieldLabel'>Post Content:</label>
        <input
          className='inputField'
          type="text"
          value={editEmojiEmotion.PostContent}
          placeholder='Post Content'
          onChange={(e) => setEditEmojiEmotion({ ...editEmojiEmotion, PostContent: e.target.value })}
        />
      </div>
      <div>
        <label className='fieldLabel'>Correct Answer:</label>
        <input
          className='inputField'
          type="text"
          value={editEmojiEmotion.CorrectAnswer}
          placeholder='Correct Answer'
          onChange={(e) => setEditEmojiEmotion({ ...editEmojiEmotion, CorrectAnswer: e.target.value })}
        />
      </div>
      <div>
        <label>Stage</label>
        <select
          className='dropdown'
          value={editEmojiEmotion.Stage}
          onChange={(e) => setEditEmojiEmotion({ ...editEmojiEmotion, Stage: e.target.value })}
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

export default EmojiEmotionsEdit;
