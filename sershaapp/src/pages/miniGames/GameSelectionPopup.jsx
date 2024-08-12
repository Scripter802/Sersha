import React, { useState } from 'react';
import snapJudgment from '../../assets/images/miniGames/snapJudgment.png';
import emojiEmotions from '../../assets/images/miniGames/emojiEmotions.png';
import friendOrFoe from '../../assets/images/miniGames/friendOrFoe.png';
import postingChallenge from '../../assets/images/miniGames/postingChallenge.png';
import closeButton from '../../assets/images/adminPanel/closeButton.png'
import SingleGamePopup from './SingleGamePopup';

const GameSelectionPopup = ({ onClose, navigate }) => {
  const [selectedGame, setSelectedGame] = useState(null);

  const gameOptions = [
    { id: 'snapjudgment', title: 'Snap Judgment', subtitle: 'Welcome to Snap Judgment!', description: "In this mini-game, you'll see different posts with pictures and messages. Your job is to decide if each post is positive, negative, or neutral. Just look at the post and click the happy face if it's positive, the sad face if it's negative, or the circle if it's neutral.", conclusion: 'Have fun!', image: snapJudgment },
    { id: 'emojiemotions', title: 'Emoji Emotions', subtitle: 'Welcome to Emoji Emotions', description: 'In this mini-game, you will see different emojis that describe feelings. Your task is to match the right emoji with the correct emotion or situation. Just look at the emoji and pick the word that best describes it.', conclusion: 'Have fun!', image: emojiEmotions },
    { id: 'postingchallenge', title: 'Posting Challenge', subtitle: 'Welcome to Posting Challenge', description: `In this mini-game, you'll see different posts and decide if they should be shared or not. Look at the picture and read the message, then chosse whether to "Post" it or "Don't post" it.`, conclusion: 'Have fun!', image: postingChallenge },
    { id: 'friendorfoe', title: 'Friend or Foe', subtitle: 'Welcome to Friend or Foe', description: `In this mini-game, you'll see profiles of different people. Your task is to decide whether to add them as friends or not. Look at their picture and read about them, then choose "Accept" if you think they should be your friend or "Decline" if you don't.`, conclusion: 'Have fun!', image: friendOrFoe }
  ];

  const handleGameClick = (game) => {
    setSelectedGame(game);
  };

  const handleCloseSingleGamePopup = () => {
    setSelectedGame(null);
  };

  return (
    <div className="miniGames-popup">
      <div className="popup-inner">
        <h2>Select a Game</h2>
        <div className="game-options">
          {gameOptions.map((game) => (
            <div
              key={game.id}
              className="game-option"
              onClick={() => handleGameClick(game)}
            >
              <img src={game.image} alt={game.title} />
              <p>{game.title}</p>
            </div>
          ))}
        </div>
        <button className="close-popup-button" onClick={onClose}>Close</button>
      </div>
      <div className="close-btn" onClick={onClose}>
        <img src={closeButton} alt='close' />
      </div>
      {selectedGame && (
        <SingleGamePopup
          title={selectedGame.title}
          subtitle={selectedGame.subtitle}
          description={selectedGame.description}
          conclusion={selectedGame.conclusion}
          navigate={navigate}
          url={`/minigames/${selectedGame.id}`}
          onClose={handleCloseSingleGamePopup}
        />
      )}
    </div>
  );
};

export default GameSelectionPopup;
