import React, { useState } from 'react';
import { useGlobalContext } from '../../../../../context/context';
import closeButton from '../../../../../assets/images/adminPanel/closeButton.png';
import './postingChallengeCreateNew.css';

const PostingChallengeCreateNew = () => {
  const { setPostingChallengeCreateNew, allPostingChallengeAssignments, setAllPostingChallengeAssignments } = useGlobalContext();
  const [newPostingChallenge, setNewPostingChallenge] = useState({
    Image: null,
    AuthorName: '',
    PostContent: '',
    CorrectAnswer: '',
    Stage: '',
  });

  const handleSubmit = () => {
    setAllPostingChallengeAssignments([...allPostingChallengeAssignments, newPostingChallenge]);
    setPostingChallengeCreateNew(false);
  };

  return (
    <div className="createNewPostingChallengeContainer">
      <div className="close-btn" onClick={() => setPostingChallengeCreateNew(false)}>
        <img src={closeButton} alt='close' />
      </div>
      <h3 className="p-3 text-center">Create New Posting Challenge</h3>
      <div>
        <label className='fieldLabel'>Author Name:</label>
        <input
          className='inputField'
          type="text"
          value={newPostingChallenge.AuthorName}
          placeholder='Author Name'
          onChange={(e) => setNewPostingChallenge({ ...newPostingChallenge, AuthorName: e.target.value })}
        />
      </div>
      <div>
        <label className='fieldLabel'>Post Content:</label>
        <input
          className='inputField'
          type="text"
          value={newPostingChallenge.PostContent}
          placeholder='Post Content'
          onChange={(e) => setNewPostingChallenge({ ...newPostingChallenge, PostContent: e.target.value })}
        />
      </div>
      <div>
        <label className='fieldLabel'>Correct Answer:</label>
        <input
          className='inputField'
          type="text"
          value={newPostingChallenge.CorrectAnswer}
          placeholder='Correct Answer'
          onChange={(e) => setNewPostingChallenge({ ...newPostingChallenge, CorrectAnswer: e.target.value })}
        />
      </div>
      <div>
        <label>Stage</label>
        <select
          className='dropdown'
          value={newPostingChallenge.Stage}
          onChange={(e) => setNewPostingChallenge({ ...newPostingChallenge, Stage: e.target.value })}
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

export default PostingChallengeCreateNew;
