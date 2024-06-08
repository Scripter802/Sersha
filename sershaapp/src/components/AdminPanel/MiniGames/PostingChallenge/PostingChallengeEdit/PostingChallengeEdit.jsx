import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../../../../context/context';
import closeButton from '../../../../../assets/images/adminPanel/closeButton.png';
import './postingChallengeEdit.css';

const PostingChallengeEdit = () => {
  const { editingPostingChallenge, setEditingPostingChallenge, setIsPostingChallengeEdit, allPostingChallengeAssignments, setAllPostingChallengeAssignments } = useGlobalContext();
  const [editPostingChallenge, setEditPostingChallenge] = useState({
    Image: null,
    AuthorName: '',
    PostContent: '',
    CorrectAnswer: '',
    Stage: '',
  });

  useEffect(() => {
    if (editingPostingChallenge) {
      setEditPostingChallenge(editingPostingChallenge);
    }
  }, [editingPostingChallenge]);

  const handleSubmit = () => {
    const updatedAssignments = allPostingChallengeAssignments.map(assignment =>
      assignment.id === editPostingChallenge.id ? editPostingChallenge : assignment
    );
    setAllPostingChallengeAssignments(updatedAssignments);

    setEditingPostingChallenge(null);
    setIsPostingChallengeEdit(false);
  };

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
          value={editPostingChallenge.AuthorName}
          placeholder='Author Name'
          onChange={(e) => setEditPostingChallenge({ ...editPostingChallenge, AuthorName: e.target.value })}
        />
      </div>
      <div>
        <label className='fieldLabel'>Post Content:</label>
        <input
          className='inputField'
          type="text"
          value={editPostingChallenge.PostContent}
          placeholder='Post Content'
          onChange={(e) => setEditPostingChallenge({ ...editPostingChallenge, PostContent: e.target.value })}
        />
      </div>
      <div>
        <label className='fieldLabel'>Correct Answer:</label>
        <input
          className='inputField'
          type="text"
          value={editPostingChallenge.CorrectAnswer}
          placeholder='Correct Answer'
          onChange={(e) => setEditPostingChallenge({ ...editPostingChallenge, CorrectAnswer: e.target.value })}
        />
      </div>
      <div>
        <label>Stage</label>
        <select
          className='dropdown'
          value={editPostingChallenge.Stage}
          onChange={(e) => setEditPostingChallenge({ ...editPostingChallenge, Stage: e.target.value })}
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

export default PostingChallengeEdit;
