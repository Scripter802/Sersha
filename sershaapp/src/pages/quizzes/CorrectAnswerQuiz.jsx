import { heart } from '../../assets/images/customization/items/index';
import avatar from '../../assets/images/navbar/userpick.png';
import { useEffect, useState } from 'react';
import close from '../../assets/images/quiz/close.png';
import inventory from '../../assets/images/quiz/inventory.png';
import { CiHeart } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa';
import sershafox from '../../assets/images/quiz/sershafox.png';
import evilfox from '../../assets/images/attact/evilfox.png';
import tictac from '../../assets/images/quiz/saybubble.png';
import done from '../../assets/images/quiz/done.png';
import incorrect from '../../assets/images/quiz/incorrect.png';

import './correctanswerquiz.css';
import HealthBar from '../../components/HealthBar';
import { useGlobalContext } from '../../context/context';

const CorrectAnswerQuiz = ({ currentQ, isInventoryQuiz, setIsInventoryQuiz }) => {
  const {
    setShowPopup,
    currentQuestion,
    currentQuizz,
    setCurrentQuestion,
    heartsNum,
    setHeartsNum,
    correctAnswers,
    setCorrectAnswers,
    wrongAnswers,
    setWrongAnswers,
    isShield, setIsShield,
    isCorrectAnswer, setIsCorrectAnswer,
    isCoinMultiplier, setIsCoinMultiplier,
    handleCorrectAnswerQuiz,
    currentVocal, setCurrentVocal, setRogueClickCounter,
  } = useGlobalContext();

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [checked, setChecked] = useState(false);
  const gameFail = new Audio('/music/SFX/FightRogueFox/gameFail.mp3');
  const gameSucceed = new Audio('/music/SFX/FightRogueFox/Advancetonextlevel.mp3');
  console.log(selectedAnswer, isCorrectAnswer)

  const messages = [
    {
      avatar: avatar,
      name: 'Jess',
      message: 'The Great Wall of China is visible from space.',
      answer: ['True', 'False'],
    },
    {
      avatar: avatar,
      name: 'John',
      message: 'What iconic bridge connects the boroughs …',
      answer: [
        "Not too bad",
        "Pretty good, can't complain",
        "It was alright, nothing too exiciting",
        "Decent, just another day",
      ],
    },
    {
      avatar: avatar,
      name: 'Nicky',
      message: 'What iconic bridge connects the boroughs …',
    },
    {
      avatar: avatar,
      name: 'Sam',
      message: 'What iconic bridge connects the boroughs …',
    },
  ];

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer === 'True' ? true : false);
  };

  const handleCheck = () => {
    const correctSound = new Audio('/music/SFX/FightRogueFox/rightanswer.mp3');
    const incorrectSound = new Audio('/music/SFX/FightRogueFox/IncorrectAnswer.mp3');

    if (selectedAnswer === currentQ.isCorrect) {
      handleCorrectAnswerQuiz();
      setFeedback({ type: 'correct', message: 'Correct Answer!' });
      correctSound.play();
    } else {
      setWrongAnswers((prev) => prev + 1);
      if (!isShield) {
        setHeartsNum((prev) => prev - 1);
      }
      setFeedback({ type: 'wrong', message: 'Wrong Answer!' });
      incorrectSound.play();
    }
    setChecked(true);
    setShowNextButton(true);
  };

  const handleNext = () => {
    if (currentQuizz.questions.length - 1 === currentQuestion) {
      setShowPopup(true);
      correctAnswers >= 7 ? gameSucceed.play() : gameFail.play();
      setIsCorrectAnswer(false);
      setIsShield(false);
      setSelectedAnswer(null);
      setChecked(false);
      setFeedback(null);
    } else {
      setSelectedAnswer(null);
      setChecked(false);
      setCurrentQuestion((prev) => prev + 1);
      setFeedback(null);
      setIsCorrectAnswer(false);
      setIsShield(false);
      setShowNextButton(false);

    }
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
    <div className='correctAnswerQuizWrapper'>
      <div className='correctAnswerTitleWrapper'>
        <div className='correctAnswerTitle'>
          <div>
            <img src={close} alt='' />
            <h1>The battle has begun</h1>
          </div>
          <div className='healthResponsive'>
            <HealthBar />
          </div>
        </div>
        <div className='rightObenWrapper'>
          <div className='inventoryQuizz' onClick={() => setIsInventoryQuiz(true)}>
            <img src={inventory} alt='' />
          </div>
          <div className='hearts'>
            {[...Array(3)].map((_, i) => (
              <div key={i} className='heartWrapper'>
                {heartsNum > i ? <FaHeart className='heartFull' /> : <CiHeart className='heart' />}
              </div>
            ))}
          </div>
          <div className='sershaLogo'>
            <p>Sersha</p>
            <img src={sershafox} alt='' />
          </div>
        </div>
      </div>
      <div className='correctQuizzWrapper'>
        <div className='evilFoxWrapper'>
          <div className='health'>
            <HealthBar />
          </div>
          <div className='evilFox'>
            <img src={evilfox} alt='' />
          </div>
        </div>
        <div className='correctAnswerWrapper'>
          <h5>Statement</h5>
          <div className='correctAnswerAssignment'>{currentQ.text}</div>
          {selectedAnswer === null && <h5>Answer options</h5>}
          <div className='correctAnswerAnsWrapper' style={selectedAnswer !== null ? { marginTop: "1rem" } : {}}>

            <div className={`${checked && currentQ?.isCorrect || isCorrectAnswer && currentQ?.isCorrect ? 'correctOfferedAnswersTrue' : 'correctOfferedAnswers'}`} style={selectedAnswer && !checked ? { background: "#FFB496" } : {}} onClick={() => handleAnswerSelection('True')}>
              <div className='offeredTrue'>
                <img src={done} alt='done' />
                True
              </div>
            </div>
            <div className={`${checked && !currentQ?.isCorrect || isCorrectAnswer && !currentQ?.isCorrect ? 'correctOfferedAnswersTrue' : 'correctOfferedAnswers'}`} style={selectedAnswer == false && !checked ? { background: "#FFB496" } : {}} onClick={() => handleAnswerSelection('False')}>

              <div className='offeredFalse'>
                <img src={incorrect} alt='done' />
                False
              </div>

            </div>
          </div>
          {selectedAnswer !== null && (
            <div className='doneButtonWrapper'>
              {showNextButton ? (
                <button onClick={handleNext}>Next</button>
              ) : (
                <button onClick={handleCheck}>Check</button>
              )}
            </div>
          )}
          {feedback && (
            <div className={`feedback ${feedback.type}`}>
              <p>{feedback.message}</p>
            </div>
          )}
        </div>
      </div>
      <div className='footer'>
        <small>© 2024 Kaza Swap LLC. All rights reserved.</small>
        <small className='madeWith'>
          Made with <img src={heart} alt='heart' />
        </small>
      </div>
    </div>
  );
};

export default CorrectAnswerQuiz;
