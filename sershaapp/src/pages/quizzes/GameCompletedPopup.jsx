import React, { useEffect, useState } from 'react';
import restartIcon from '../../assets/images/miniGames/gameCompletedPopup/restartIcon.png';
import claimPrizeIcon from '../../assets/images/miniGames/gameCompletedPopup/claimPrizeIcon.png';
import done from '../../assets/images/miniGames/correctAnswer.png';
import incorrect from '../../assets/images/miniGames/incorrectAnswer.png';
import { useGlobalContext } from '../../context/context';


import './gameCompletedPopup.css';

const GameCompletedPopup = ({ correctAnswers, mistakes, onRestart, onClaimPrize, onPlayGame, title, heartsNum, isQuizz, currentQuizz }) => {
  const { rewardItems, renderRewardImage } = useGlobalContext();
  const [currentPrize, setCurrentPrize] = useState([]);

  const getRandomPrize = () => {
    let randomIndex = Math.floor(Math.random() * rewardItems.length);
    return rewardItems[randomIndex];
  };

  console.log(currentQuizz)

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



  return (
    <div className={`popup ${!isQuizz && 'popMiniGames'}`}>
      <div className={`${isQuizz ? 'popup-content' : 'popup-content-miniGames'}`}>
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
        <div className='allQuestions'>
          {isQuizz && currentQuizz?.questions?.map((item, index) => {
            if (item.type === 0) {
              return (
                <div key={index}>

                  <p className='questionNum'>Question {index + 1}:</p>
                  <p id='questionText'> {item.text}</p>
                  Correct Answer:
                  {item.answers.map((ans, i) => (
                    ans.isCorrect && <p id='correctAnswerQuizzPopup' key={i}> {ans.text}</p>
                  ))}
                  <hr
                    style={{ borderTop: "1px dotted lightgrey", marginBlock: '1rem' }}
                  ></hr>
                </div>
              );
            } else if (item.type === 1) {
              return (
                <div key={index}>

                  <p className='questionNum'>Question {index + 1}:</p>
                  <p id='questionText'>{item.text}</p>
                  Correct Answer:
                  <p id='correctAnswerQuizzPopup'> {item.isCorrect ? "True" : "False"}</p>
                  <hr
                    style={{ borderTop: "1px dotted lightgrey", marginBlock: '1rem' }}
                  ></hr>
                </div>
              );
            } else if (item.type === 2) {
              return (
                <div key={index}>
                  <p className='questionNum'>Question {index + 1}:</p>
                  <p id='questionText'>{item.statement1} ____ {item.statement2}</p>
                  Correct Answer:
                  {item.answers.map((ans, i) => (
                    ans.isCorrect && <p id='correctAnswerQuizzPopup' key={i}> {ans.text}</p>
                  ))}
                  <hr
                    style={{ borderTop: "1px dotted lightgrey", marginBlock: '1rem' }}
                  ></hr>
                </div>
              );
            } else if (item.type === 3) {
              return (
                <div key={index}>
                  <p className='questionNum'>Question {index + 1}:</p>
                  {item.groups.map((group, ig) => (
                    <div key={ig}>
                      <p id='questionText'> {group.name}:</p>
                      Correct Answer:
                      {group.groupingItems.map((groupItem, i) => (
                        <p id='correctAnswerQuizzPopup' key={i}> {groupItem.item}</p>
                      ))}

                      <hr
                        style={{ borderTop: "1px dotted lightgrey", marginBlock: '1rem' }}
                      ></hr>
                    </div>
                  ))}
                </div>
              );
            } else {
              return null;
            }
          })}
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
            <button onClick={(e) => onClaimPrize(currentPrize)}><img src={claimPrizeIcon} alt="Claim Prize" />Claim Prize</button>
          )}
        </div>
      </div>
    </div >
  );
};

export default GameCompletedPopup;
