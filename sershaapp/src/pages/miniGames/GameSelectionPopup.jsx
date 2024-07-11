import React from 'react';
import snapJudgment from '../../assets/images/miniGames/snapJudgment.png';
import emojiEmotions from '../../assets/images/miniGames/emojiEmotions.png';
import friendOrFoe from '../../assets/images/miniGames/friendOrFoe.png';
import postingChallenge from '../../assets/images/miniGames/postingChallenge.png';
import closeButton from '../../assets/images/adminPanel/closeButton.png'

const GameSelectionPopup = ({ onClose, navigate }) => {
  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Select a Game</h2>
        <div className="game-options">
          <div className="game-option" onClick={() => navigate('/minigames/snapjudgment')}>
            <img src={snapJudgment} alt="snapJudgment" />
            <p>Snap Judgment</p>
          </div>
          <div className="game-option" onClick={() => navigate('/minigames/emojiemotions')}>
            <img src={emojiEmotions} alt="emojiEmotions" />
            <p>Emoji Emotions</p>
          </div>
          <div className="game-option" onClick={() => navigate('/minigames/postingchallenge')}>
            <img src={postingChallenge} alt="postingChallenge" />
            <p>Posting Challenge</p>
          </div>
          <div className="game-option" onClick={() => navigate('/minigames/friendorfoe')}>
            <img src={friendOrFoe} alt="friendOrFoe" />
            <p>Friend or Foe</p>
          </div>
        </div>
        <button className="close-popup-button" onClick={onClose}>Close</button>
      </div>
      <div className="close-btn" onClick={onClose}>
        <img src={closeButton} alt='close' />
      </div>
    </div>
  );
};

export default GameSelectionPopup;
