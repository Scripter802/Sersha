import { useEffect, useRef, useState } from 'react';
import { heart } from '../../../assets/images/customization/items/index'
import close from '../../../assets/images/quiz/close.png'
import correctAnswer from '../../../assets/images/miniGames/correctAnswer.png'
import incorrectAnswer from '../../../assets/images/miniGames/incorrectAnswer.png'
import foxuserpick from '../../../assets/images/miniGames/foxuserpick.png'
import foxTought from '../../../assets/images/miniGames/foxTought.png'
import accept from '../../../assets/images/miniGames/friendOrFoe/accept.png'
import decline from '../../../assets/images/miniGames/friendOrFoe/decline.png'
import avatar from '../../../assets/images/miniGames/friendOrFoe/userpick.png'
import gamePhoto from '../../../assets/images/miniGames/friendOrFoe/photo.png'

import './friendOrFoe.css'
import { useGlobalContext } from '../../../context/context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GameCompletedPopup from '../../quizzes/GameCompletedPopup';

const getRandomItems = (array, numItems) => {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, numItems);
};

const FriendOrFoe = () => {
  const {
    baseUrl, baseUrlImage, correctAnsweredMiniGames, setCorrectAnsweredMiniGames,
    incorrectAnsweredMiniGames, setIncorrectAnsweredMiniGames, corInc, setCorInc
  } = useGlobalContext();
  const [seconds, setSeconds] = useState(25);
  const totalAnswered = correctAnsweredMiniGames + incorrectAnsweredMiniGames;
  const [allFriendOrFoe, setAllFriendOrFoe] = useState([]);
  const [currentFriendOrFoe, setCurrentFriendOrFoe] = useState([]);
  const [friendOrFoeNumber, setFriendOrFoeNumber] = useState(0);
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosting = async () => {
      try {
        const response = await axios.get(`${baseUrl}/Quizzes/ListMinigameQuestionsByTypeAndDifficulty/0/6`);
        setAllFriendOrFoe(response.data);
      } catch (error) {
        console.error('Error fetching right answer questions:', error);
      }
    };

    fetchPosting();
  }, [baseUrl]);

  useEffect(() => {
    if (allFriendOrFoe.length > 0) {
      const randomSnaps = getRandomItems(allFriendOrFoe, 10);
      setCurrentFriendOrFoe(randomSnaps);
    }
  }, [allFriendOrFoe]);

  const intervalIdRef = useRef(null);

  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(intervalIdRef.current);
  }, [currentFriendOrFoe]);

  useEffect(() => {
    if (seconds === 0) {
      clearInterval(intervalIdRef.current);
      setIsGameCompleted(true);
    }
  }, [seconds]);

  const handleAnswerClick = (selectedAnswer) => {
    const currentQuestion = currentFriendOrFoe[friendOrFoeNumber];
    if (!currentQuestion) {
      console.error('No current question found.');
      return;
    }

    const correctAnswer = currentQuestion.answers.find(ans => ans.isCorrect)?.text;

    console.log('Selected Answer:', selectedAnswer);
    console.log('Correct Answer:', correctAnswer);

    console.log(`${selectedAnswer}` === correctAnswer)
    if (`${selectedAnswer}` == correctAnswer) {
      setCorrectAnsweredMiniGames(correctAnsweredMiniGames + 1);
      setCorInc(prevCorInc => prevCorInc.map((item, index) => index === friendOrFoeNumber ? true : item));

    } else {
      setIncorrectAnsweredMiniGames(incorrectAnsweredMiniGames + 1);
      setCorInc(prevCorInc => prevCorInc.map((item, index) => index === friendOrFoeNumber ? false : item));

    }

    if (friendOrFoeNumber < currentFriendOrFoe.length - 1) {
      setFriendOrFoeNumber(friendOrFoeNumber + 1);
      setSeconds(25); // Reset the timer for the next question
    } else {
      setIsGameCompleted(true); // Show the popup when the game is completed
    }
  };


  const handleRestart = () => {
    setCorrectAnsweredMiniGames(0);
    setIncorrectAnsweredMiniGames(0);
    setFriendOrFoeNumber(0);
    setIsGameCompleted(false);
    setSeconds(25);
    const randomSnaps = getRandomItems(allFriendOrFoe, 10);
    setCurrentFriendOrFoe(randomSnaps);
    setCorInc([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

  };

  const handleClaimPrize = () => {
    console.log('Prize claimed');
    setIsGameCompleted(false);
    navigate('/');
  };

  return (
    <div className='friendOrFoeWrapper'>
      {isGameCompleted && (
        <GameCompletedPopup
          correctAnswers={correctAnsweredMiniGames}
          mistakes={incorrectAnsweredMiniGames}
          onRestart={handleRestart}
          onClaimPrize={handleClaimPrize}
          title={`Game`}
        />
      )}
      <div className='friendOrFoeTitleWrapper'>

        <div className='friendOrFoeTitle'>
          <img src={close} alt="" onClick={() => navigate('/minigames')} />
          <h1>Friend or Foe</h1>
        </div>

      </div>

      <div className='friendOrFoeGameInfo'>
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
          <div className='friendOrFoeAnswersNumber'>
            {corInc?.map((c, i) => (
              <div key={i}>{typeof c === 'number' ? c : c === true ? <img src={correctAnswer} alt="correct" /> : <img src={incorrectAnswer} alt="incorrect" />}</div>
            ))}
          </div>
        )
        }
      </div>

      <div className='friendOrFoeGameWrapper'>
        <div className='friendOrFoeGameContainer'>

          <div className='friendOrFoeLeftSideContent'>
            <div className='gameResult'>
              <div className='correctAnswered'><img src={correctAnswer} alt="correctAnswer" />{`${correctAnsweredMiniGames} correct`} </div>
              <div className='incorrectAnswered'><img src={incorrectAnswer} alt="incorrectAnswer" />{`${incorrectAnsweredMiniGames} mistake`}</div>
            </div>
            <div className='gameDescription'>You have to decide whether to add as friends or not.</div>
          </div>

          <div className='friendOrFoeMiddleContent'>
            <div className='friendOrFoeGameCard'>
              <div className='messageGameCard'>
                <img src={avatar} alt="userpic" />
                <div className='middleInfoUser'>
                  <p className='messageName'>{currentFriendOrFoe[friendOrFoeNumber]?.text}</p>
                  <p className='messageText'>{currentFriendOrFoe[friendOrFoeNumber]?.content}</p>
                </div>
              </div>
              <img className='middleGamePhoto' src={`${baseUrlImage}${currentFriendOrFoe[friendOrFoeNumber]?.imagePath}`} alt='gamephoto' />
            </div>

            <div className='friendOrFoeOptionAnswers'>
              <button className='friendOrFoeDeclineButton' onClick={() => handleAnswerClick(`Decline`)} ><img src={decline} alt="declineButton" /> Decline</button>
              <button className='friendOrFoeAcceptButton' onClick={() => handleAnswerClick(`Accept`)}><img src={accept} alt="acceptButton" /> Accept</button>
            </div>
          </div>

          {window.innerWidth <= 1000 && (
            <div className='friendOrFoeGameDescRes'>
              <p>Which emojis match the correct emotions or situations.</p>
            </div>
          )}

          <div className='friendOrFoeRightSideContent'>
            <div className='friendOrFoeFoxWrap'><p className='friendOrFoeFoxTextTought'>Multi kill! Awesome!</p><img className='friendOrFoeFoxTought' src={foxTought} alt="foxtought" /><img className='foxUserPick' src={foxuserpick} alt="foxuserpick" /></div>
            <div className='friendOrFoeGameTimerWrapper'>
              <div className='friendOrFoeGameTimeCirkle'></div>
              <p className='friendOrFoeGamePad'>{seconds}</p>
            </div>
          </div>

        </div>
      </div>

      <div className='footer'>
        <small>© 2024 Kaza Swap LLC. All rights reserved.</small>
        <small className='madeWith'>Made with <img src={heart} alt="heart" /></small>
      </div>
      <audio loop autoPlay>
        <source src="/music/Music/RogueFoxFight310520241104.mp3" type="audio/mpeg" />
      </audio>
    </div>
  )
}

export default FriendOrFoe