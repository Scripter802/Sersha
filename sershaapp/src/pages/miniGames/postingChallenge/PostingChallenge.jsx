import { useEffect, useRef, useState } from 'react';
import { heart } from '../../../assets/images/customization/items/index';
import close from '../../../assets/images/quiz/close.png';
import correctAnswer from '../../../assets/images/miniGames/correctAnswer.png';
import incorrectAnswer from '../../../assets/images/miniGames/incorrectAnswer.png';
import foxuserpick from '../../../assets/images/miniGames/foxuserpick.png';
import foxTought from '../../../assets/images/miniGames/foxTought.png';
import accept from '../../../assets/images/miniGames/friendOrFoe/accept.png';
import decline from '../../../assets/images/miniGames/friendOrFoe/decline.png';
import avatar from '../../../assets/images/miniGames/friendOrFoe/userpick.png';
import gamePhoto from '../../../assets/images/miniGames/postingChallenge/photo.png';

import { useNavigate } from 'react-router-dom';
import './postingChallenge.css';
import axios from 'axios';
import GameCompletedPopup from '../../quizzes/GameCompletedPopup';
import { useGlobalContext } from '../../../context/context';

const getRandomItems = (array, numItems) => {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, numItems);
};

const PostingChallenge = () => {
  const {
    baseUrl, baseUrlImage, correctAnsweredMiniGames, setCorrectAnsweredMiniGames,
    incorrectAnsweredMiniGames, setIncorrectAnsweredMiniGames,
  } = useGlobalContext();
  const [seconds, setSeconds] = useState(25);
  const totalAnswered = correctAnsweredMiniGames + incorrectAnsweredMiniGames;
  const [allPosting, setAllPosting] = useState([]);
  const [currentPosting, setCurrentPosting] = useState([]);
  const [postingNumber, setPostingNumber] = useState(0);
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosting = async () => {
      try {
        const response = await axios.get(`${baseUrl}/Quizzes/ListMinigameQuestionsByTypeAndDifficulty/0/7`);
        setAllPosting(response.data);
      } catch (error) {
        console.error('Error fetching right answer questions:', error);
      }
    };

    fetchPosting();
  }, [baseUrl]);

  useEffect(() => {
    if (allPosting.length > 0) {
      const randomSnaps = getRandomItems(allPosting, 10);
      setCurrentPosting(randomSnaps);
    }
  }, [allPosting]);

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

  const handleAnswerClick = (selectedAnswer) => {
    const correctAnswer = currentPosting[postingNumber]?.answers.find(ans => ans.isCorrect).text;

    if (selectedAnswer === correctAnswer) {
      setCorrectAnsweredMiniGames(correctAnsweredMiniGames + 1);
    } else {
      setIncorrectAnsweredMiniGames(incorrectAnsweredMiniGames + 1);
    }

    if (postingNumber < currentPosting.length - 1) {
      setPostingNumber(postingNumber + 1);
      setSeconds(25); // Reset the timer for the next question
    } else {
      setIsGameCompleted(true); // Show the popup when the game is completed
    }
  };

  const handleRestart = () => {
    setCorrectAnsweredMiniGames(0);
    setIncorrectAnsweredMiniGames(0);
    setPostingNumber(0);
    setIsGameCompleted(false);
    setSeconds(25);
    const randomSnaps = getRandomItems(allPosting, 10);
    setCurrentPosting(randomSnaps);
  };

  const handleClaimPrize = () => {
    console.log('Prize claimed');
    setIsGameCompleted(false);
    navigate('/');
  };

  return (
    <div className='postingChallengeWrapper'>
      {isGameCompleted && (
        <GameCompletedPopup
          correctAnswers={correctAnsweredMiniGames}
          mistakes={incorrectAnsweredMiniGames}
          onRestart={handleRestart}
          onClaimPrize={handleClaimPrize}
        />
      )}
      <div className='postingChallengeTitleWrapper'>

        <div className='postingChallengeTitle'>
          <img src={close} alt="" onClick={() => navigate('/minigames')} />
          <h1>Posting Challenge</h1>
        </div>
      </div>

      <div className='postingGameInfo'>
        {window.innerWidth < 1000 ? (
          <div>
            <div className='restAssignment'>
              <p>{totalAnswered <= 10 ? totalAnswered + 1 : totalAnswered} of 10</p>
            </div>

            <div className='postingGameResultRes'>
              <div className='correctAnswered'><img src={correctAnswer} alt="correctAnswer" />{`${correctAnsweredMiniGames}`} <span>correct</span> </div>
              <div className='incorrectAnswered'><img src={incorrectAnswer} alt="incorrectAnswer" />{`${incorrectAnsweredMiniGames}`} <span>mistake</span></div>
            </div>
          </div>
        ) : (
          <div className='postingChallengeAnswersNumber'>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
            <div>10</div>
          </div>
        )}
      </div>

      <div className='postingChallengeGameWrapper'>
        <div className='postingChallengeGameContainer'>

          <div className='postingChallengeLeftSideContent'>
            <div className='gameResult'>
              <div className='correctAnswered'><img src={correctAnswer} alt="correctAnswer" />{`${correctAnsweredMiniGames} correct`} </div>
              <div className='incorrectAnswered'><img src={incorrectAnswer} alt="incorrectAnswer" />{`${incorrectAnsweredMiniGames} mistake`}</div>
            </div>
            <div className='gameDescription'>Decide what kind of content you need to post.</div>
          </div>

          <div className='postingChallengeMiddleContent'>
            <div className='postingGameCard'>
              <img className='postingProfilePhoto' src={`${baseUrlImage}${currentSnap[snapNumber]?.imagePath}`} alt="snapProfilePhoto" />
              <div className='postingProfileInfo'>
                <p className='postingProfileName'></p>
                <p className='postingPostText'>{currentPosting[postingNumber]?.content}</p>
              </div>
            </div>

            <div className='postingChallengeOptionAnswers'>
              <button className='postingChallengeDeclineButton' onClick={() => handleAnswerClick(`Don't post`)}><img src={decline} alt="declineButton" /> Don’t post</button>
              <button className='postingChallengeAcceptButton' onClick={() => handleAnswerClick('Post')}><img src={accept} alt="acceptButton" /> Post</button>
            </div>
          </div>

          {window.innerWidth <= 1000 && (
            <div className='postingGameDescRes'>
              <p>Decide what kind of content you need to post.</p>
            </div>
          )}

          <div className='postingChallengeRightSideContent'>
            <div className='postingFoxWrap'><p className='postingFoxTextTought'>Multi kill! Awesome!</p><img className='postingFoxTought' src={foxTought} alt="foxtought" /><img className='foxUserPick' src={foxuserpick} alt="foxuserpick" /></div>
            <div className='postingGameTimerWrapper'>
              <div className='postingGameTimeCirkle'></div>
              <p className='postingGamePad'>{seconds}</p>
            </div>
          </div>

        </div>
      </div>

      <div className='footer'>
        <small>© 2024 Kaza Swap LLC. All rights reserved.</small>
        <small className='madeWith'>Made with <img src={heart} alt="heart" /></small>
      </div>
      <audio loop autoPlay>
        <source src="public/music/Music/SershaThemesongMediumoptimal310520241122.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default PostingChallenge;
