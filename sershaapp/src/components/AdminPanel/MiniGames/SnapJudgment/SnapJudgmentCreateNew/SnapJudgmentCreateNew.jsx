import React, { useState } from 'react';
import { useGlobalContext } from '../../../../../context/context';
import closeButton from '../../../../../assets/images/adminPanel/closeButton.png';
import './snapJudgmentCreateNew.css';

const SnapJudgmentCreateNew = () => {
  const { setSnapJudgmentCreateNew, allSnapJudgmentAssignments, setAllSnapJudgmentAssignments } = useGlobalContext();
  const [newSnapJudgment, setNewSnapJudgment] = useState({
    Image: null,
    AuthorName: '',
    PostContent: '',
    CorrectAnswer: '',
    Stage: '',
  });

  const handleSubmit = () => {
    setAllSnapJudgmentAssignments([...allSnapJudgmentAssignments, newSnapJudgment]);
    setSnapJudgmentCreateNew(false);
  };

  return (
    <div className="createNewSnapJudgmentContainer">
      <div className="close-btn" onClick={() => setSnapJudgmentCreateNew(false)}>
        <img src={closeButton} alt='close' />
      </div>
      <h3 className="p-3 text-center titleMini">Create New Snap Judgment</h3>
      <div>
        <label className='fieldLabel'>Author Name:</label>
        <input
          className='inputField'
          type="text"
          value={newSnapJudgment.AuthorName}
          placeholder='Author Name'
          onChange={(e) => setNewSnapJudgment({ ...newSnapJudgment, AuthorName: e.target.value })}
        />
      </div>
      <div>
        <label className='fieldLabel'>Post Content:</label>
        <input
          className='inputField'
          type="text"
          value={newSnapJudgment.PostContent}
          placeholder='Post Content'
          onChange={(e) => setNewSnapJudgment({ ...newSnapJudgment, PostContent: e.target.value })}
        />
      </div>
      <div>
        <label className='fieldLabel'>Correct Answer:</label>
        <input
          className='inputField'
          type="text"
          value={newSnapJudgment.CorrectAnswer}
          placeholder='Correct Answer'
          onChange={(e) => setNewSnapJudgment({ ...newSnapJudgment, CorrectAnswer: e.target.value })}
        />
      </div>
      <div>
        <label>Stage</label>
        <select
          className='dropdown'
          value={newSnapJudgment.Stage}
          onChange={(e) => setNewSnapJudgment({ ...newSnapJudgment, Stage: e.target.value })}
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

export default SnapJudgmentCreateNew;
