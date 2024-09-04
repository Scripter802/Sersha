import { useEffect, useRef, useState } from 'react';
import { heart } from '../../../assets/images/customization/items/index';
import close from '../../../assets/images/quiz/close.png';
import correctAnswer from '../../../assets/images/miniGames/correctAnswer.png';
import incorrectAnswer from '../../../assets/images/miniGames/incorrectAnswer.png';
import snapjudgmentpostphoto from '../../../assets/images/miniGames/snapJudgment/snapjudgmentpostphoto.png';
import neutral from '../../../assets/images/miniGames/snapJudgment/neutral.png';
import unlike from '../../../assets/images/miniGames/snapJudgment/unlike.png';
import like from '../../../assets/images/miniGames/snapJudgment/like.png';
import foxuserpick from '../../../assets/images/miniGames/foxuserpick.png';
import foxTought from '../../../assets/images/miniGames/foxTought.png';
import GameCompletedPopup from '../../quizzes/GameCompletedPopup';
import './snapJudgment.css';
import { useGlobalContext } from '../../../context/context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const getRandomItems = (array, numItems) => {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, numItems);
};

const SnapJudgment = () => {
  const {
    baseUrl, baseUrlImage, user, setUser, correctAnsweredMiniGames, setCorrectAnsweredMiniGames,
    incorrectAnsweredMiniGames, setIncorrectAnsweredMiniGames, corInc, setCorInc, roughFoxComments, roughFoxDamaged, setRoughFoxDamaged, handleFoxDamaged, inventoryItems, setInventoryItems, handleCorrectAnswerMiniGames, setRogueClickCounter, currentVocal, setCurrentVocal, handleCurrentRogueVocal, rogueClickCounter
  } = useGlobalContext();
  const [seconds, setSeconds] = useState(25);
  let totalAnswered = correctAnsweredMiniGames + incorrectAnsweredMiniGames;
  const [allSnap, setAllSnap] = useState([]);
  const [currentSnap, setCurrentSnap] = useState([]);
  const [snapNumber, setSnapNumber] = useState(0);
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const navigate = useNavigate();
  const gameFail = new Audio('/music/SFX/FightRogueFox/gameFail.mp3');
  const gameSucceed = new Audio('/music/SFX/FightRogueFox/Anotherwin.mp3');

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('userData')));

  }, []);

  useEffect(() => {
    const fetchSnap = async (dif) => {
      try {
        const response = await axios.get(`${baseUrl}/Quizzes/ListMinigameQuestionsByTypeAndDifficulty/${dif}/4`);
        setAllSnap(response.data);
      } catch (error) {
        console.error('Error fetching right answer questions:', error);
      }
    };

    user?.level <= 13 ? fetchSnap('0') : user?.level > 13 && user?.level <= 26 ? fetchSnap('1') : fetchSnap('2');

  }, [baseUrl]);

  useEffect(() => {
    if (allSnap.length > 0) {
      const randomSnaps = getRandomItems(allSnap, 10);
      setCurrentSnap(randomSnaps);
    }
  }, [allSnap]);

  const intervalIdRef = useRef(null);

  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(intervalIdRef.current);
  }, [currentSnap]);

  useEffect(() => {
    if (seconds === 0) {
      clearInterval(intervalIdRef.current);
      gameFail.play();
      setIsGameCompleted(true);
    }
  }, [seconds]);

  const handleAnswerClick = (selectedAnswer) => {
    const correctAnswerr = currentSnap[snapNumber]?.answers.find(ans => ans.isCorrect).text;
    console.log(correctAnswerr, selectedAnswer)


    const correctSound = new Audio('/music/SFX/FightRogueFox/rightanswer.mp3');
    const incorrectSound = new Audio('/music/SFX/FightRogueFox/IncorrectAnswer.mp3');

    if (selectedAnswer === correctAnswerr) {
      handleCorrectAnswerMiniGames();
      setCorInc(prevCorInc => prevCorInc.map((item, index) => index === snapNumber ? true : item));
      handleFoxDamaged();
      correctSound.play();
    } else {
      setIncorrectAnsweredMiniGames(incorrectAnsweredMiniGames + 1);
      setCorInc(prevCorInc => prevCorInc.map((item, index) => index === snapNumber ? false : item));
      incorrectSound.play();
    }
    console.log(corInc, snapNumber)

    if (snapNumber < currentSnap.length - 1) {
      setSnapNumber(snapNumber + 1);
      setSeconds(25);
    } else {
      setIsGameCompleted(true);
      correctAnsweredMiniGames >= 7 ? gameSucceed.play() : gameFail.play();
      clearInterval(intervalIdRef.current);
    }
  };

  const handleRestart = () => {
    setCorrectAnsweredMiniGames(0);
    setIncorrectAnsweredMiniGames(0);
    setSnapNumber(0);
    setIsGameCompleted(false);
    setSeconds(25);
    const randomSnaps = getRandomItems(allSnap, 10);
    setCurrentSnap(randomSnaps);
    setCorInc([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    setRoughFoxDamaged('');
  };

  const handleClaimPrize = (currentPrize) => {
    const gameItems = JSON.parse(localStorage.getItem('gameItems')) || [];

    const updatedGameItems = [...gameItems];

    currentPrize.forEach((prize) => {
      const existingItemIndex = updatedGameItems.findIndex(item => item.item === prize.item);

      if (existingItemIndex !== -1) {
        updatedGameItems[existingItemIndex].count += prize.count;
      } else {
        updatedGameItems.push(prize);
      }
    });

    localStorage.setItem('gameItems', JSON.stringify(updatedGameItems));
    setInventoryItems(updatedGameItems);

    console.log(currentPrize);
    setIsGameCompleted(false);
    navigate('/');
  };

  const handleClose = () => {
    setCorrectAnsweredMiniGames(0);
    setIncorrectAnsweredMiniGames(0);
    setSnapNumber(0);
    setRoughFoxDamaged('');
    navigate('/minigames');
  }

  useEffect(() => {
    if (currentVocal) {
      let vocalAudio = new Audio(currentVocal);
      vocalAudio.play();

      setTimeout(() => {
        setCurrentVocal('');
        setRogueClickCounter(0);
      }, 1000);
    }
  }, [currentVocal]);

  return (
    <div className='snapJudgmentGameWrapper'>
      {isGameCompleted && (
        <GameCompletedPopup
          correctAnswers={correctAnsweredMiniGames}
          mistakes={incorrectAnsweredMiniGames}
          onRestart={handleRestart}
          onClaimPrize={handleClaimPrize}
          title={`Game`}
          isQuizz={false}
        />
      )}

      <div className='snapJudgmentTitleWrapper'>
        <div className='snapJudgmentTitle'>
          <img src={close} alt="" onClick={handleClose} />
          <h1>Snap Judgment</h1>
        </div>
      </div>

      <div className='snapGameInfo'>
        {window.innerWidth < 1000 ? (
          <div>
            <div className='restAssignment'>
              <p>{totalAnswered <= 10 ? totalAnswered + 1 : totalAnswered} of 10</p>
            </div>

            <div className='gameResultRes'>
              <div className='correctAnswered'><img src={correctAnswer} alt="correctAnswer" />{`${correctAnsweredMiniGames}`} <span>correct</span> </div>
              <div className='incorrectAnswered'><img src={incorrectAnswer} alt="incorrectAnswer" />{`${incorrectAnsweredMiniGames}`} <span>mistake</span></div>
            </div>
          </div>
        ) : (
          <div className='snapAnswersNumber'>
            {corInc?.map((c, i) => (
              <div key={i}>{typeof c === 'number' ? c : c === true ? <img src={correctAnswer} alt="correct" /> : <img src={incorrectAnswer} alt="incorrect" />}</div>
            ))}
          </div>
        )}
      </div>

      <div className='snapGameWrapper'>
        <div className='snapGameContainer'>
          <div className='snapLeftSideContent'>
            <div className='gameResult'>
              <div className='correctAnswered'><img src={correctAnswer} alt="correctAnswer" />{`${correctAnsweredMiniGames}`} <span>correct</span> </div>
              <div className='incorrectAnswered'><img src={incorrectAnswer} alt="incorrectAnswer" />{`${incorrectAnsweredMiniGames}`} <span>mistake</span></div>
            </div>
            <div className='gameDescription'>Decide whether this post is positive, negative, or neutral</div>
          </div>

          <div className='snapMiddleContent'>
            <div className='snapGameCard'>
              <img className='snapProfilePhoto' src={`${baseUrlImage}${currentSnap[snapNumber]?.imagePath}`} alt="snapProfilePhoto" />
              <p className='snapProfileName'></p>
              <p className='snapPostText'>{currentSnap[snapNumber]?.content}</p>
            </div>
            <div className='snapOptionAnswers'>
              <img className='unlike' src={unlike} alt="unlike" onClick={() => handleAnswerClick('Unlike')} />
              <img className='neutralAnswer' src={neutral} alt="Neutral" onClick={() => handleAnswerClick('Neutral')} />
              <img className='like' src={like} alt="like" onClick={() => handleAnswerClick('Like')} />
            </div>
          </div>

          {window.innerWidth <= 1000 && (
            <div className='gameDescRes'>
              <p>Decide whether this post is positive, negative, or neutral</p>
            </div>
          )}

          <div className='snapRightSideContent'>
            <div className='foxWrap'>
              {roughFoxDamaged && <> <p className='snapFoxTextTought'>
                {roughFoxDamaged}
              </p>
                <img className='snapFoxTought' src={foxTought} alt="foxtought" /></>}
              <img className='foxUserPick' src={foxuserpick} alt="foxuserpick" />
            </div>
            <div className='gameTimerWrapper'>
              <div className='gameTimeCirkle'></div>
              <p className='gamePad'>{seconds}</p>
            </div>
          </div>

        </div>
      </div>

      <div className='footer'>
        <small>© 2024 Kaza Swap LLC. All rights reserved.</small>
        <small className='madeWith'>Made with <img src={heart} alt="heart" /></small>
      </div>

      {/* <audio loop autoPlay>
        <source src="/music/Music/RogueFoxFight310520241104.mp3" type="audio/mpeg" />
      </audio> */}
    </div>
  );
}

export default SnapJudgment;
