import React, { useEffect, useState } from 'react';
import restartIcon from '../../assets/images/miniGames/gameCompletedPopup/restartIcon.png';
import claimPrizeIcon from '../../assets/images/miniGames/gameCompletedPopup/claimPrizeIcon.png';
import done from '../../assets/images/miniGames/correctAnswer.png';
import incorrect from '../../assets/images/miniGames/incorrectAnswer.png';
import { useGlobalContext } from '../../context/context';
import coinMultiplier from '../../assets/images/inventory/coinMultiplier.png';
import correctAnswer from '../../assets/images/inventory/correctAnswer.png';
import dealDamage from '../../assets/images/inventory/dealDamage.png';
import healingPotion from '../../assets/images/inventory/healingPotion.png';
import shield from '../../assets/images/inventory/shield.png';

import './gameCompletedPopup.css';

const GameCompletedPopup = ({ correctAnswers, mistakes, onRestart, onClaimPrize, onPlayGame, title, heartsNum, isQuizz, currentQuizz }) => {
  const { rewardItems } = useGlobalContext();
  const [currentPrize, setCurrentPrize] = useState([]);

  const getRandomPrize = () => {
    let randomIndex = Math.floor(Math.random() * rewardItems.length);
    return rewardItems[randomIndex];
  };

  useEffect(() => {
    let prizeCount = 0;
    if (correctAnswers === 10) prizeCount = 4;
    else if (correctAnswers === 9) prizeCount = 3;
    else if (correctAnswers === 8) prizeCount = 2;

    const newPrizes = [];
    for (let i = 0; i < prizeCount; i++) {
      newPrizes.push(getRandomPrize());
    }

    // Group prizes and count duplicates
    const prizeMap = newPrizes.reduce((acc, prize) => {
      acc[prize] = (acc[prize] || 0) + 1;
      return acc;
    }, {});

    const groupedPrizes = Object.entries(prizeMap).map(([item, count]) => ({ item, count }));

    setCurrentPrize(groupedPrizes);
  }, [correctAnswers, rewardItems]);

  const renderRewardImage = (item) => {
    switch (item) {
      case 'Coin Multiplier':
        return <img src={coinMultiplier} alt="Coin Multiplier" />;
      case 'Correct Answer':
        return <img src={correctAnswer} alt="Correct Answer" />;
      case 'Deal Damage':
        return <img src={dealDamage} alt="Deal Damage" />;
      case 'Healing Potion':
        return <img src={healingPotion} alt="Healing Potion" />;
      case 'Shield':
        return <img src={shield} alt="Shield" />;
      default:
        return null;
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>{title} Completed</h2>
        <p>Every time you get better and better</p>
        <div className='rewardsWrapper'>
          {currentPrize && currentPrize.map(({ item, count }, i) => (
            <div className='singleRewardItem' key={i}>
              {renderRewardImage(item)}
              <div className='itemCount'>{count}</div>
            </div>
          ))}
        </div>
        <div className="results">
          <span className="correct"><img src={done} alt="Correct" />{correctAnswers} correct</span>
          <span className="mistakes" style={{ marginLeft: '.5rem' }}><img src={incorrect} alt="Incorrect" />{mistakes} mistake{mistakes !== 1 && 's'}</span>
        </div>
        <div className="buttons">
          <button onClick={onRestart}><img src={restartIcon} alt="Restart" />Restart</button>
          {isQuizz && (
            <button onClick={onPlayGame}>Play Mini-Games</button>
          )}
          {heartsNum !== 0 && correctAnswers >= 8 && (
            <button onClick={onClaimPrize}><img src={claimPrizeIcon} alt="Claim Prize" />Claim Prize</button>
          )}
        </div>
      </div>
    </div >
  );
};

export default GameCompletedPopup;
