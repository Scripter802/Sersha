import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../../../../context/context';
import closeButton from '../../../../../assets/images/adminPanel/closeButton.png';
import './snapJudgmentEdit.css';

const SnapJudgmentEdit = () => {
  const { editingSnapJudgment, setEditingSnapJudgment, setIsSnapJudgmentEdit, allSnapJudgmentAssignments, setAllSnapJudgmentAssignments } = useGlobalContext();
  const [editSnapJudgment, setEditSnapJudgment] = useState({
    Image: null,
    AuthorName: '',
    PostContent: '',
    CorrectAnswer: '',
    Stage: '',
  });

  useEffect(() => {
    if (editingSnapJudgment) {
      setEditSnapJudgment(editingSnapJudgment);
    }
  }, [editingSnapJudgment]);

  const handleSubmit = () => {
    const updatedAssignments = allSnapJudgmentAssignments.map(assignment =>
      assignment.id === editSnapJudgment.id ? editSnapJudgment : assignment
    );
    setAllSnapJudgmentAssignments(updatedAssignments);

    setEditingSnapJudgment(null);
    setIsSnapJudgmentEdit(false);
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
          value={editSnapJudgment.AuthorName}
          placeholder='Author Name'
          onChange={(e) => setEditSnapJudgment({ ...editSnapJudgment, AuthorName: e.target.value })}
        />
      </div>
      <div>
        <label className='fieldLabel'>Post Content:</label>
        <input
          className='inputField'
          type="text"
          value={editSnapJudgment.PostContent}
          placeholder='Post Content'
          onChange={(e) => setEditSnapJudgment({ ...editSnapJudgment, PostContent: e.target.value })}
        />
      </div>
      <div>
        <label className='fieldLabel'>Correct Answer:</label>
        <input
          className='inputField'
          type="text"
          value={editSnapJudgment.CorrectAnswer}
          placeholder='Correct Answer'
          onChange={(e) => setEditSnapJudgment({ ...editSnapJudgment, CorrectAnswer: e.target.value })}
        />
      </div>
      <div>
        <label>Stage</label>
        <select
          className='dropdown'
          value={editSnapJudgment.Stage}
          onChange={(e) => setEditSnapJudgment({ ...editSnapJudgment, Stage: e.target.value })}
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

export default SnapJudgmentEdit;
