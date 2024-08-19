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
    incorrectAnsweredMiniGames, setIncorrectAnsweredMiniGames, corInc, setCorInc, roughFoxComments, roughFoxDamaged, setRoughFoxDamaged, handleFoxDamaged, inventoryItems, setInventoryItems, handleCorrectAnswerMiniGames, setRogueClickCounter, currentVocal, setCurrentVocal, handleCurrentRogueVocal, rogueClickCounter
  } = useGlobalContext();

  const [seconds, setSeconds] = useState(25);
  const totalAnswered = correctAnsweredMiniGames + incorrectAnsweredMiniGames;
  const [allEmoji, setAllEmoji] = useState([]);
  const [currentEmoji, setCurrentEmoji] = useState([]);
  const [emojiNumber, setEmojiNumber] = useState(0);
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const navigate = useNavigate();
  const gameFail = new Audio('/music/SFX/FightRogueFox/gameFail.mp3');
  const gameSucceed = new Audio('/music/SFX/FightRogueFox/Anotherwin.mp3');

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
  }, [currentEmoji]);

  useEffect(() => {
    if (seconds === 0) {
      clearInterval(intervalIdRef.current);
      gameFail.play();
      setIsGameCompleted(true);
    }
  }, [seconds]);

  const handleAnswerClick = (selectedAnswer) => {
    const correctAnswer = currentEmoji[emojiNumber]?.answers.find(ans => ans.isCorrect).text;

    const correctSound = new Audio('/music/SFX/FightRogueFox/rightanswer.mp3');
    const incorrectSound = new Audio('/music/SFX/FightRogueFox/IncorrectAnswer.mp3');

    if (selectedAnswer === correctAnswer) {
      handleCorrectAnswerMiniGames();
      setCorInc(prevCorInc => prevCorInc.map((item, index) => index === emojiNumber ? true : item));
      handleFoxDamaged();
      correctSound.play();
    } else {
      setIncorrectAnsweredMiniGames(incorrectAnsweredMiniGames + 1);
      setCorInc(prevCorInc => prevCorInc.map((item, index) => index === emojiNumber ? false : item));
      incorrectSound.play();
    }

    if (emojiNumber < currentEmoji.length - 1) {
      setEmojiNumber(emojiNumber + 1);
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
    setEmojiNumber(0);
    setIsGameCompleted(false);
    setSeconds(25);
    const randomSnaps = getRandomItems(allEmoji, 10);
    setCurrentEmoji(randomSnaps);
    setCorInc([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    setRoughFoxDamaged('');
  };

  const handleClose = () => {
    setCorrectAnsweredMiniGames(0);
    setIncorrectAnsweredMiniGames(0);
    setEmojiNumber(0);
    setSeconds(25);
    setRoughFoxDamaged('');
    setCorInc([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    navigate('/minigames');
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

    console.log('Prize claimed');
    setIsGameCompleted(false);
    navigate('/');
  };

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
    <div className='emojiEmotionsWrapper'>
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
      <div className='emojiEmotionsTitleWrapper'>

        <div className='emojiEmotionsTitle'>
          <img src={close} alt="closeBtn" onClick={handleClose} />
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
            {corInc?.map((c, i) => (
              <div key={i}>{typeof c === 'number' ? c : c === true ? <img src={correctAnswer} alt="correct" /> : <img src={incorrectAnswer} alt="incorrect" />}</div>
            ))}
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
              <div className='emojiWrap' >
                {emojiNumber < 2 ? <img src={questionMark} alt='hidden emoji' /> : <img src={`${baseUrlImage}${currentEmoji && currentEmoji[emojiNumber - 2].imagePath}`} alt='emojis' />}
              </div>
              <div className='emojiWrap ' >
                {emojiNumber === 0 ? <img src={questionMark} alt='hidden emoji' /> : emojiNumber === 1 ? <img src={`${baseUrlImage}${currentEmoji[emojiNumber - 1].imagePath}`} alt='emojis' /> : <img src={`${baseUrlImage}${currentEmoji[emojiNumber - 1].imagePath}`} alt='emojis' />}
              </div>
              <div className='emojiWrap' id="emojiMiddle">
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
            <div className='emojifoxWrap'>
              {roughFoxDamaged && <>
                <p className='emojifoxTextTought'>
                  {roughFoxDamaged}
                </p>
                <img className='emojifoxTought' src={window.innerWidth < 1000 ? foxToughtRes : foxTought} alt="foxtought" /></>}
              <img className='foxUserPick' src={foxuserpick} alt="foxuserpick" /></div>
            <div className='emojiGameTimerWrapper'>
              <div className='emojiGameTimeCirkle'></div>
              <p className='emojiGamePad'>{seconds}</p>
            </div>
          </div>

        </div>
      </div>

      <div className='footer' id='emojiEmotionsFooter'>
        <small>© 2024 Kaza Swap LLC. All rights reserved.</small>
        <small className='madeWith'>Made with <img src={heart} alt="heart" /></small>
      </div>
      {/* <audio loop autoPlay>
        <source src="/music/Music/RogueFoxFight310520241104.mp3" type="audio/mpeg" />
      </audio> */}
    </div>
  )
}

export default EmojiEmotions