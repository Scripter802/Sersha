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
    baseUrl, baseUrlImage, correctAnsweredMiniGames, setCorrectAnsweredMiniGames,
    incorrectAnsweredMiniGames, setIncorrectAnsweredMiniGames,
  } = useGlobalContext();
  const [seconds, setSeconds] = useState(25);
  let totalAnswered = correctAnsweredMiniGames + incorrectAnsweredMiniGames;
  const [allSnap, setAllSnap] = useState([]);
  const [currentSnap, setCurrentSnap] = useState([]);
  const [snapNumber, setSnapNumber] = useState(0);
  const [isGameCompleted, setIsGameCompleted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSnap = async () => {
      try {
        const response = await axios.get(`${baseUrl}/Quizzes/ListMinigameQuestionsByTypeAndDifficulty/0/4`);
        setAllSnap(response.data);
      } catch (error) {
        console.error('Error fetching right answer questions:', error);
      }
    };

    fetchSnap();
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
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      clearInterval(intervalIdRef.current);
    }
  }, [seconds]);

  let corInc = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleAnswerClick = (selectedAnswer) => {
    const correctAnswerr = currentSnap[snapNumber].answers.find(ans => ans.isCorrect).text;
    console.log(correctAnswerr, selectedAnswer)
    if (selectedAnswer == correctAnswerr) {
      setCorrectAnsweredMiniGames(correctAnsweredMiniGames + 1);
      corInc[snapNumber] = 'true';
    } else {
      setIncorrectAnsweredMiniGames(incorrectAnsweredMiniGames + 1);
      corInc[snapNumber] = 'false';
    }

    if (snapNumber < currentSnap.length - 1) {
      setSnapNumber(snapNumber + 1);
      setSeconds(25); // Reset the timer for the next question
    } else {
      setIsGameCompleted(true); // Show the popup when the game is completed
    }
  };
  console.log(corInc[snapNumber], corInc)
  const handleRestart = () => {
    setCorrectAnsweredMiniGames(0);
    setIncorrectAnsweredMiniGames(0);
    setSnapNumber(0);
    setIsGameCompleted(false);
    setSeconds(25);
    const randomSnaps = getRandomItems(allSnap, 10);
    setCurrentSnap(randomSnaps);

  };

  const handleClaimPrize = () => {
    console.log('Prize claimed');
    setIsGameCompleted(false);
    navigate('/');
  };

  return (
    <div className='snapJudgmentGameWrapper'>
      {isGameCompleted && (
        <GameCompletedPopup
          correctAnswers={correctAnsweredMiniGames}
          mistakes={incorrectAnsweredMiniGames}
          onRestart={handleRestart}
          onClaimPrize={handleClaimPrize}
        />
      )}

      <div className='snapJudgmentTitleWrapper'>
        <div className='snapJudgmentTitle'>
          <img src={close} alt="" onClick={() => navigate('/minigames')} />
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
            {corInc.map((c, i) => (
              <div>{typeof c == 'number' ? c : c == true ? <img src={correctAnswer} /> : <img src={incorrectAnswer} />}</div>
            ))}
          </div>
        )
        }
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
              <img src={unlike} alt="unlike" onClick={() => handleAnswerClick('Unlike')} />
              <img className='neutralAnswer' src={neutral} alt="Neutral" onClick={() => handleAnswerClick('neutral')} />
              <img src={like} alt="like" onClick={() => handleAnswerClick('Like')} />
            </div>
          </div>

          {window.innerWidth <= 1000 && (
            <div className='gameDescRes'>
              <p>Decide whether this post is positive, negative, or neutral</p>
            </div>
          )}

          <div className='snapRightSideContent'>
            <div className='foxWrap'><p className='foxTextTought'>You’re awesome!</p><img className='foxTought' src={foxTought} alt="foxtought" /><img className='foxUserPick' src={foxuserpick} alt="foxuserpick" /></div>
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

    </div>
  );
}

export default SnapJudgment;
