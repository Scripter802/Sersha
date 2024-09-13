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
    health, setHealth,
    isShield, setIsShield,
    isCorrectAnswer, setIsCorrectAnswer,
    isCoinMultiplier, setIsCoinMultiplier,
  } = useGlobalContext();
  const navigate = useNavigate();
  const { toggleMusic, currentPlaying, setCurrentPlaying, changeMusic, isPlaying } = useContext(MusicContext);
  const music = '/music/Music/RogueFoxFight310520241104.mp3'
  const [isInventoryQuiz, setIsInventoryQuiz] = useState(false);


  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('userData')));

  }, []);

  useEffect(() => {
    if (currentPlaying != music) {
      changeMusic('/music/Music/RogueFoxFight310520241104.mp3');
    }
  }, [changeMusic, music]);


  const fetchCurrentQuizz = async (dif) => {
    try {
      const response = await axios.get(`${baseUrl}/Quizzes/randomByDifficulty/${dif}`);
      setCurrentQuizz(response.data);
    } catch (error) {
      console.error('Error fetching Current Quizz:', error);
    }
  };


  useEffect(() => {

    const fetchQuiz = async () => {
      if (user?.level <= 13) {
        fetchCurrentQuizz('0');
      } else if (user?.level > 13 && user?.level <= 26) {
        fetchCurrentQuizz('1');
      } else {
        fetchCurrentQuizz('2');
      }
    };

    if (user) {
      fetchQuiz();
    }
  }, [user?.level, baseUrl]);


  // useEffect(() => {
  //   if (currentQuizz && currentQuestion === currentQuizz.questions.length - 1) {
  //     setShowPopup(true);
  //   }
  // }, [currentQuestion, currentQuizz]);
  if (heartsNum == 0 || health == 0) {
    setShowPopup(true);
  }

  const handleRestart = () => {
    setHealth(100);
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

    let newCoinBalance = user.coinBalance;

    if (correctPercent > 50 && correctPercent < 70) {
      newCoinBalance += 50;
    } else if (correctPercent >= 70 && correctPercent < 80) {
      newCoinBalance += 100;
    } else if (correctPercent >= 80 && correctPercent < 90) {
      newCoinBalance += 150;
    } else if (correctPercent >= 90 && correctPercent <= 100) {
      newCoinBalance += 300;
    }

    if (isCoinMultiplier) {
      newCoinBalance *= 2;
    }

    let newStage = user.stage + 1;

    console.log('New coin balance:', newCoinBalance);


    setUser({ ...user, coinBalance: newCoinBalance, stage: newStage });
    localStorage.setItem('showedSlideshow', false);

    try {
      await axios.put(`${baseUrl}/User/${user.email}`, { coinBalance: newCoinBalance, stage: newStage });
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
    setCurrentQuestion(0);
    setCurrentQuizz();
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
