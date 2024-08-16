import React, { useContext, useEffect, useState } from 'react';
import { useGlobalContext } from '../../../context/context';
import axios from 'axios';
import RightAnswerQuiz from '../RightAnswerQuiz';
import CorrectAnswerQuiz from '../CorrectAnswerQuiz';
import FillInTheBlank from '../FillInTheBlank';
import Grouping from '../Grouping';
import GameCompletedPopup from '../GameCompletedPopup'; // Import the new popup component
import { useNavigate } from 'react-router-dom';
import MusicContext from '../../../context/MusicContext';
import closeButton from '../../../assets/images/adminPanel/closeButton.png'


const QuizPage = () => {
  const {
    baseUrl,
    currentQuizz,
    setCurrentQuizz,
    currentQuestion,
    setCurrentQuestion,
    correctAnswers,
    setCorrectAnswers,
    heartsNum,
    setHeartsNum,
    showPopup,
    setShowPopup,
    wrongAnswers,
    setWrongAnswers,
    handleQuizCompletion,
    bundelsAndLevels, setBundlesAndLevels,
    user, setUser,
    setNewMessage,
    inventoryItems,
    renderRewardImageQuiz,
    isShield, setIsShield,
    isCorrectAnswer, setIsCorrectAnswer,
    isCoinMultiplier, setIsCoinMultiplier,
  } = useGlobalContext();
  const navigate = useNavigate();
  const { toggleMusic, currentPlaying, setCurrentPlaying, changeMusic, isPlaying } = useContext(MusicContext);
  const music = '/music/Music/RogueFoxFight310520241104.mp3'
  const [isInventoryQuiz, setIsInventoryQuiz] = useState(false);

  useEffect(() => {
    if (currentPlaying != music) {
      changeMusic('/music/Music/RogueFoxFight310520241104.mp3');
    }
  }, [changeMusic, music]);


  useEffect(() => {
    const fetchCurrentQuizz = async () => {
      try {
        const response = await axios.get(`${baseUrl}/Quizzes/randomByDifficulty/0`);
        setCurrentQuizz(response.data);
      } catch (error) {
        console.error('Error fetching Current Quizz:', error);
      }
    };

    fetchCurrentQuizz();
  }, []);

  // useEffect(() => {
  //   if (currentQuizz && currentQuestion === currentQuizz.questions.length - 1) {
  //     setShowPopup(true);
  //   }
  // }, [currentQuestion, currentQuizz]);
  if (heartsNum == 0) {
    setShowPopup(true);
  }

  const handleRestart = () => {
    setShowPopup(false);
    setCurrentQuestion(0);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setHeartsNum(3);
    setIsShield(false);
    setIsCorrectAnswer(false);
    setIsCoinMultiplier(false);
    setNewMessage(null);
  };

  console.log(heartsNum)

  const handleClaimPrize = () => {

    console.log('Prize claimed');
    setShowPopup(false);
    navigate('/')
  };

  const updateSteps = () => {
    const updatedBundlesAndLevels = bundelsAndLevels.map(bundle => ({
      ...bundle,
      levels: bundle.levels.map(level => {
        if (level.levelNo === user.level || level.levelNoDown === user.level) {
          return {
            ...level,
            step: level.step + 1,
          };
        }
        return level;
      }),
    }));
    setBundlesAndLevels(updatedBundlesAndLevels);
  };

  const userLevelUpdate = async (userNewLevel) => {
    try {
      const response = await axios.put(`${baseUrl}/User/${user.email}`, { "level": userNewLevel });
      console.log('User level updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating user level:', error);
    }
  };
  console.log(user)
  const handlePlayGame = async () => {
    const fullHealth = 100;

    let oneQuestionPercent = currentQuizz?.questions?.length + correctAnswers > 0 ? fullHealth / currentQuizz?.questions?.length : 0;
    let correctPercent = oneQuestionPercent * correctAnswers;
    if (correctPercent > 50 && correctPercent < 70) {
      let userCoin = user.coinBalance + 50;
      if (isCoinMultiplier) {
        userCoin = userCoin * 2
      }
      setUser({ ...user, coinBalance: userCoin })
    }
    if (correctPercent >= 70 && correctPercent < 80) {
      let userCoin = user.coinBalance + 100;
      if (isCoinMultiplier) {
        userCoin = userCoin * 2
      }
      setUser({ ...user, coinBalance: userCoin })
    }
    if (correctPercent >= 80 && correctPercent < 90) {
      let userCoin = user.coinBalance + 150;
      if (isCoinMultiplier) {
        userCoin = userCoin * 2
      }
      setUser({ ...user, coinBalance: userCoin })
    }
    if (correctPercent >= 90 && correctPercent <= 100) {
      let userCoin = user.coinBalance + 300;
      if (isCoinMultiplier) {
        userCoin = userCoin * 2
      }
      setUser({ ...user, coinBalance: userCoin })
    }


    let userCoinBalanceUpdate = { coinBalance: user.coinBalance };

    try {
      const response = await axios.put(`${baseUrl}/User/${user.email}`, userCoinBalanceUpdate);
    } catch (error) {
      console.log(error);
    }

    const levelStep = JSON.parse(localStorage.getItem("levelStep"));
    let newLevelStep = 0;
    if (levelStep < 2) {
      newLevelStep = levelStep + 1;
    } else {
      const userNewLevel = user?.level + 1
      setUser({ ...user, level: userNewLevel });
      userLevelUpdate(userNewLevel);
      localStorage.setItem('userData', JSON.stringify(user));
      newLevelStep = 0;
    }
    localStorage.setItem("levelStep", JSON.stringify(newLevelStep));
    localStorage.setItem('newMessage', 0);
    setNewMessage(0);
    updateSteps();

    console.log('Mini-games opened');
    handleQuizCompletion();
    setShowPopup(false);
    navigate('/minigames')
  };

  let currentQ = currentQuizz?.questions[currentQuestion];

  return (
    <>
      {showPopup && (
        <GameCompletedPopup
          correctAnswers={correctAnswers}
          mistakes={wrongAnswers}
          onRestart={handleRestart}
          onClaimPrize={handleClaimPrize}
          heartsNum={heartsNum}
          onPlayGame={handlePlayGame}
          title={`Quiz`}
          isQuizz={true}
          currentQuizz={currentQuizz}
        />
      )}

      {currentQ && (
        <>
          {currentQ.type === 0 && <RightAnswerQuiz currentQ={currentQ} setIsInventoryQuiz={setIsInventoryQuiz} isInventoryQuiz={isInventoryQuiz} />}
          {currentQ.type === 1 && <CorrectAnswerQuiz currentQ={currentQ} setIsInventoryQuiz={setIsInventoryQuiz} isInventoryQuiz={isInventoryQuiz} />}
          {currentQ.type === 2 && <FillInTheBlank currentQ={currentQ} setIsInventoryQuiz={setIsInventoryQuiz} isInventoryQuiz={isInventoryQuiz} />}
          {currentQ.type === 3 && <Grouping currentQ={currentQ} setIsInventoryQuiz={setIsInventoryQuiz} isInventoryQuiz={isInventoryQuiz} />}
          {/* <audio loop autoPlay>
            <source src="/music/Music/RogueFoxFight310520241104.mp3" type="audio/mpeg" />
          </audio> */}
        </>
      )}

      {isInventoryQuiz && (
        <div className={`inventoryQuizzPopup`}>
          <div className={`inventoryContent`}>
            <div className="close-btn" onClick={() => setIsInventoryQuiz(false)}>
              <img src={closeButton} alt='close' />
            </div>
            <h2>Inventory</h2>
            <div className='rewardsWrapper'>
              {inventoryItems ? (inventoryItems.map(({ item, count }, i) => (
                <div className='singleRewardItem' key={i}>
                  {renderRewardImageQuiz(item)}
                  <div className='itemCount'>{count}</div>
                </div>
              ))) : (
                <div className='noItemInventory'>
                  <p>You don't have any items.</p>
                  <p>Let's play mini games and win some!</p>
                  <div>
                    <button onClick={() => navigate('/minigames')} className="play-button-inventory">Let's Play!</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuizPage;
