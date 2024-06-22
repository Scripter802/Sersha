import React, { useState } from 'react';
import { useGlobalContext } from '../../../../../context/context';
import closeButton from '../../../../../assets/images/adminPanel/closeButton.png';
import './friendOrFoeCreateNew.css';

const FriendOrFoeCreateNew = () => {
  const { setFriendOrFoeCreateNew, allFriendOrFoeAssignments, setAllFriendOrFoeAssignments } = useGlobalContext();
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

  const handleSubmit = () => {
    setAllFriendOrFoeAssignments([...allFriendOrFoeAssignments, newFriendOrFoe]);
    setFriendOrFoeCreateNew(false);
  };

  return (
    <div className="createNewFriendOrFoeContainer">
      <div className="close-btn" onClick={() => setFriendOrFoeCreateNew(false)}>
        <img src={closeButton} alt='close' />
      </div>
      <h3 className="p-3 text-center">Create New Friend Or Foe</h3>
      <div>
        <label className='fieldLabel'>Profile Name:</label>
        <input
          className='inputField'
          type="text"
          value={newFriendOrFoe.AuthorName}
          placeholder='Profile Name'
          onChange={(e) => setNewFriendOrFoe({ ...newFriendOrFoe, AuthorName: e.target.value })}
        />
      </div>
      <div>
        <label className='fieldLabel'>Gender:</label>
        <input
          className='inputField'
          type="text"
          value={newFriendOrFoe.PostContent}
          placeholder='Gender'
          onChange={(e) => setNewFriendOrFoe({ ...newFriendOrFoe, PostContent: e.target.value })}
        />
      </div>
      <div>
        <label className='fieldLabel'>Profile Description:</label>
        <input
          className='inputField'
          type="text"
          value={newFriendOrFoe.CorrectAnswer}
          placeholder='Profile Description'
          onChange={(e) => setNewFriendOrFoe({ ...newFriendOrFoe, CorrectAnswer: e.target.value })}
        />
      </div>
      <div>
        <label className='fieldLabel'>Status:</label>
        <input
          className='inputField'
          type="text"
          value={newFriendOrFoe.Status}
          placeholder='Status'
          onChange={(e) => setNewFriendOrFoe({ ...newFriendOrFoe, Status: e.target.value })}
        />
      </div>
      <div>
        <label>Stage</label>
        <select
          className='dropdown'
          value={newFriendOrFoe.Stage}
          onChange={(e) => setNewFriendOrFoe({ ...newFriendOrFoe, Stage: e.target.value })}
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

export default FriendOrFoeCreateNew;
