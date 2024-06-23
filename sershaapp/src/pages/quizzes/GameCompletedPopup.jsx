// GameCompletedPopup.jsx
import React from 'react';
import './gameCompletedPopup.css'; // Add your CSS styles here

const GameCompletedPopup = ({ correctAnswers, mistakes, onRestart, onClaimPrize }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Quizz Completed</h2>
        <p>Every time you get better and better</p>
        <div className="results">
          <span className="correct">{correctAnswers} correct</span>
          <span className="mistakes" style={{ marginLeft: '.5rem' }}>{mistakes} mistake{mistakes !== 1 && 's'}</span>
        </div>
        <div className="buttons">
          <button onClick={onRestart}>Restart</button>
          <button onClick={onClaimPrize}>Claim Prize</button>
        </div>
      </div>
    </div>
  );
};

export default GameCompletedPopup;
