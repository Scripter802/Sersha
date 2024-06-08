import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../../../../context/context';
import closeButton from '../../../../../assets/images/adminPanel/closeButton.png';
import './friendOrFoeEdit.css';

const FriendOrFoeEdit = () => {
  const { editingFriendOrFoe, setEditingFriendOrFoe, setIsFriendOrFoeEdit, allFriendOrFoeAssignments, setAllFriendOrFoeAssignments } = useGlobalContext();
  const [editFriendOrFoe, setEditFriendOrFoe] = useState({
    Image: null,
    AuthorName: '',
    PostContent: '',
    CorrectAnswer: '',
    Status: '',
    Stage: '',
  });

  useEffect(() => {
    if (editingFriendOrFoe) {
      setEditFriendOrFoe(editingFriendOrFoe);
    }
  }, [editingFriendOrFoe]);

  const handleSubmit = () => {
    const updatedAssignments = allFriendOrFoeAssignments.map(assignment =>
      assignment.id === editFriendOrFoe.id ? editFriendOrFoe : assignment
    );
    setAllFriendOrFoeAssignments(updatedAssignments);

    setEditingFriendOrFoe(null);
    setIsFriendOrFoeEdit(false);
  };

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
          value={editFriendOrFoe.AuthorName}
          placeholder='Profile Name'
          onChange={(e) => setEditFriendOrFoe({ ...editFriendOrFoe, AuthorName: e.target.value })}
        />
      </div>
      <div>
        <label className='fieldLabel'>Gender:</label>
        <input
          className='inputField'
          type="text"
          value={editFriendOrFoe.PostContent}
          placeholder='Gender'
          onChange={(e) => setEditFriendOrFoe({ ...editFriendOrFoe, PostContent: e.target.value })}
        />
      </div>
      <div>
        <label className='fieldLabel'>Profile Description:</label>
        <input
          className='inputField'
          type="text"
          value={editFriendOrFoe.CorrectAnswer}
          placeholder='Profile Description'
          onChange={(e) => setEditFriendOrFoe({ ...editFriendOrFoe, CorrectAnswer: e.target.value })}
        />
      </div>
      <div>
        <label className='fieldLabel'>Status:</label>
        <input
          className='inputField'
          type="text"
          value={editFriendOrFoe.Status}
          placeholder='Status'
          onChange={(e) => setEditFriendOrFoe({ ...editFriendOrFoe, Status: e.target.value })}
        />
      </div>
      <div>
        <label>Stage</label>
        <select
          className='dropdown'
          value={editFriendOrFoe.Stage}
          onChange={(e) => setEditFriendOrFoe({ ...editFriendOrFoe, Stage: e.target.value })}
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

export default FriendOrFoeEdit;
