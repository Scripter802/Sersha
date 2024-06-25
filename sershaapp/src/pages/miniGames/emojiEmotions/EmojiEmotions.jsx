import { useEffect, useRef, useState } from 'react';
import { heart } from '../../../assets/images/customization/items/index'
import close from '../../../assets/images/quiz/close.png'
import correctAnswer from '../../../assets/images/miniGames/correctAnswer.png'
import incorrectAnswer from '../../../assets/images/miniGames/incorrectAnswer.png'
import foxuserpick from '../../../assets/images/miniGames/foxuserpick.png'
import foxToughtRes from '../../../assets/images/miniGames/emojiEmotions/foxToughtRes.png'
import foxTought from '../../../assets/images/miniGames/emojiEmotions/foxTought.png'
import emojiOne from '../../../assets/images/miniGames/emojiEmotions/smajliOne.png'
import emojiTwo from '../../../assets/images/miniGames/emojiEmotions/smajliTwo.png'
import emojiThree from '../../../assets/images/miniGames/emojiEmotions/smajliThree.png'
import questionMark from '../../../assets/images/miniGames/emojiEmotions/questionmark.png'

import './emojiEmotions.css'
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../../context/context';
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


const EmojiEmotions = () => {
  const {
    baseUrl, baseUrlImage, correctAnsweredMiniGames, setCorrectAnsweredMiniGames,
    incorrectAnsweredMiniGames, setIncorrectAnsweredMiniGames,
  } = useGlobalContext();

  const [seconds, setSeconds] = useState(25);
  const totalAnswered = correctAnsweredMiniGames + incorrectAnsweredMiniGames;
  const [allEmoji, setAllEmoji] = useState([]);
  const [currentEmoji, setCurrentEmoji] = useState([]);
  const [emojiNumber, setEmojiNumber] = useState(0);
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmoji = async () => {
      try {
        const response = await axios.get(`${baseUrl}/Quizzes/ListMinigameQuestionsByTypeAndDifficulty/0/5`);
        setAllEmoji(response.data);
      } catch (error) {
        console.error('Error fetching Emoji games:', error);
      }
    };

    fetchEmoji();
  }, [baseUrl]);

  useEffect(() => {
    if (allEmoji.length > 0) {
      const randomSnaps = getRandomItems(allEmoji, 10);
      setCurrentEmoji(randomSnaps);
    }
  }, [allEmoji]);

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
    const correctAnswer = currentEmoji[emojiNumber]?.answers.find(ans => ans.isCorrect).text;

    if (selectedAnswer === correctAnswer) {
      setCorrectAnsweredMiniGames(correctAnsweredMiniGames + 1);
    } else {
      setIncorrectAnsweredMiniGames(incorrectAnsweredMiniGames + 1);
    }

    if (emojiNumber < currentEmoji.length - 1) {
      setEmojiNumber(emojiNumber + 1);
      setSeconds(25); // Reset the timer for the next question
    } else {
      setIsGameCompleted(true); // Show the popup when the game is completed
    }
  };

  const handleRestart = () => {
    setCorrectAnsweredMiniGames(0);
    setIncorrectAnsweredMiniGames(0);
    setEmojiNumber(0);
    setIsGameCompleted(false);
    setSeconds(25);
    const randomSnaps = getRandomItems(allEmoji, 10);
    setCurrentEmoji(randomSnaps);
  };

  const handleClaimPrize = () => {
    console.log('Prize claimed');
    setIsGameCompleted(false);
    navigate('/');
  };

  console.log(currentEmoji)

  return (
    <div className='emojiEmotionsWrapper'>
      {isGameCompleted && (
        <GameCompletedPopup
          correctAnswers={correctAnsweredMiniGames}
          mistakes={incorrectAnsweredMiniGames}
          onRestart={handleRestart}
          onClaimPrize={handleClaimPrize}
          title={`Game`}
        />
      )}
      <div className='emojiEmotionsTitleWrapper'>

        <div className='emojiEmotionsTitle'>
          <img src={close} alt="closeBtn" onClick={() => navigate('/minigames')} />
          <h1>Emoji Emotions</h1>
        </div>
      </div>

      <div className='emojiGameInfo'>
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
          <div className='emojiEmotionsAnswersNumber'>
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
        )
        }

      </div>

      <div className='emojiEmotionsGameWrapper'>
        <div className='emojiEmotionsGameContainer'>

          <div className='emojiEmotionsLeftSideContent'>
            <div className='gameResult'>
              <div className='correctAnswered'><img src={correctAnswer} alt="correctAnswer" />{`${correctAnsweredMiniGames} correct`} </div>
              <div className='incorrectAnswered'><img src={incorrectAnswer} alt="incorrectAnswer" />{`${incorrectAnsweredMiniGames} mistake`}</div>
            </div>
            <div className='gameDescription'>Which emojis match the correct emotions or situations.</div>
          </div>

          <div className='emojiEmotionsMiddleContent'>
            <div className='emojiGameCard'>
              {/* Display emojis in positions 3, 4, and 5 */}
              <div className='emojiWrap'>
                {emojiNumber < 2 ? <img src={questionMark} alt='hidden emoji' /> : <img src={`${baseUrlImage}${currentEmoji && currentEmoji[emojiNumber - 2].imagePath}`} alt='emojis' />}
              </div>
              <div className='emojiWrap'>
                {emojiNumber === 0 ? <img src={questionMark} alt='hidden emoji' /> : emojiNumber === 1 ? <img src={`${baseUrlImage}${currentEmoji[emojiNumber].imagePath}`} alt='emojis' /> : <img src={`${baseUrlImage}${currentEmoji[emojiNumber - 1].imagePath}`} alt='emojis' />}
              </div>
              <div className='emojiWrap'>
                {<img src={`${baseUrlImage}${currentEmoji[emojiNumber]?.imagePath}`} />}
                {/* {emojiNumber === 2 && <img src={`${baseUrlImage}${currentEmoji[emojiNumber - 1]?.imagePath}`} alt='emojis' />}
                {emojiNumber === 1 && <img src={`${baseUrlImage}${currentEmoji[emojiNumber]?.imagePath}`} alt='emojis' />}
                {emojiNumber > 2 && totalAnswered === 0 ? <img src={`${baseUrlImage}${currentEmoji[emojiNumber]?.imagePath}`} alt='emojis' /> : emojiNumber > 2 && totalAnswered === 1 ? <img src={`${baseUrlImage}${currentEmoji[emojiNumber - 1]?.imagePath}`} alt='emojis' /> : emojiNumber.length > 2 && <img src={`${baseUrlImage}${currentEmoji[emojiNumber - 2]?.imagePath}`} alt='emojis' />} */}
              </div>

              {/* Show a question mark for positions 1 and 2 */}
              <div className='emojiHidden'>
                <img src={questionMark} alt='hidden emoji' />
              </div>
              <div className='emojiHidden'>
                <img src={questionMark} alt='hidden emoji' />
              </div>
            </div>

            <div className='emojiEmotionsOptionAnswers'>
              {currentEmoji[emojiNumber]?.answers.map((ans, index) => (
                <div onClick={() => handleAnswerClick(ans.text)} style={{ cursor: 'pointer' }}>{ans.text}</div>
              ))}
            </div>
          </div>

          {window.innerWidth <= 1000 && (
            <div className='emojiGameDescRes'>
              <p>Which emojis match the correct emotions or situations.</p>
            </div>
          )}

          <div className='emojiEmotionsRightSideContent'>
            <div className='emojifoxWrap'><p className='emojifoxTextTought'>Multi kill! Awesome!</p><img className='emojifoxTought' src={window.innerWidth < 1000 ? foxToughtRes : foxTought} alt="foxtought" /><img className='foxUserPick' src={foxuserpick} alt="foxuserpick" /></div>
            <div className='emojiGameTimerWrapper'>
              <div className='emojiGameTimeCirkle'></div>
              <p className='emojiGamePad'>{seconds}</p>
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
  )
}

export default EmojiEmotions