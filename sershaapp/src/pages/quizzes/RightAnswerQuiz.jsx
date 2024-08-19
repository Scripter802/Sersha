import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/context';
import HealthBar from '../../components/HealthBar';
import './rightanswerquiz.css';
import { FaHeart } from "react-icons/fa";
import { CiHeart } from 'react-icons/ci';
import avatar from '../../assets/images/navbar/userpick.png';
import close from '../../assets/images/quiz/close.png';
import inventory from '../../assets/images/quiz/inventory.png';
import sershafox from '../../assets/images/quiz/sershafox.png';
import evilfox from '../../assets/images/attact/evilfox.png';
import tictac from '../../assets/images/quiz/saybubble.png';
import { heart } from '../../assets/images/customization/items/index';

const RightAnswerQuiz = ({ currentQ, isInventoryQuiz, setIsInventoryQuiz }) => {
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
  } = useGlobalContext();

  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [corAns, setCorAns] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const correctAnswers = currentQ.answers.filter(q => q.isCorrect).map(q => q.text);
    setCorAns(correctAnswers);
  }, [currentQ]);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswers(prev => {
      if (prev.includes(answer)) {
        return prev.filter(ans => ans !== answer);
      }
      return [...prev, answer];
    });
  };

  const handleCheck = () => {
    const isCorrect = corAns.every(answer => selectedAnswers.includes(answer)) && corAns.length === selectedAnswers.length;

    const correctSound = new Audio('/music/SFX/FightRogueFox/rightanswer.mp3');
    const incorrectSound = new Audio('/music/SFX/FightRogueFox/IncorrectAnswer.mp3');

    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      setFeedback({ type: 'correct', message: 'Correct Answer!' });
      correctSound.play();
    } else {
      setWrongAnswers(prev => prev + 1);
      if (!isShield) {
        setHeartsNum((prev) => prev - 1);
      }
      setFeedback({ type: 'wrong', message: 'Wrong Answer!' });
      incorrectSound.play();
    }

    setShowNextButton(true);
    setChecked(true);

  };

  const handleNext = () => {
    if (currentQuizz.questions.length - 1 === currentQuestion) {
      setShowPopup(true);
      setIsCorrectAnswer(false);
      setIsShield(false);
    } else {
      setSelectedAnswers([]);
      setCurrentQuestion(prev => prev + 1);
      setFeedback(null);
      setIsCorrectAnswer(false);
      setIsShield(false);
      setShowNextButton(false);
      setChecked(false);
    }
  }

  return (
    <div className='rightAnswerQuizWrapper'>
      <div className='rightAnswerTitleWrapper'>
        <div className='rightAnswerTitle'>
          <div>
            <img src={close} alt="Close" />
            <h1>The battle has begun</h1>
          </div>
          <div className='healthResponsive'>
            <HealthBar />
          </div>
        </div>
        <div className='rightObenWrapper'>
          <div className='inventoryQuizz'>
            <img src={inventory} alt='inventory' onClick={() => setIsInventoryQuiz(true)} />
          </div>
          <div className='hearts'>
            <div className='heartWrapper'>
              {heartsNum >= 1 ? <FaHeart className='heartFull' /> : <CiHeart className='heart' />}
            </div>
            <div className='heartWrapper'>
              {heartsNum >= 2 ? <FaHeart className='heartFull' /> : <CiHeart className='heart' />}
            </div>
            <div className='heartWrapper'>
              {heartsNum >= 3 ? <FaHeart className='heartFull' /> : <CiHeart className='heart' />}
            </div>
          </div>
          <div className='sershaLogo'>
            <p>Sersha</p>
            <img src={sershafox} alt="Sersha" />
          </div>
        </div>
      </div>
      <div className='rightAnswerquizWrapper'>
        <div className='evilFoxWrapper'>
          <div className='health'>
            <HealthBar />
          </div>
          <div className='evilFox'>
            <img src={evilfox} alt="Evil Fox" />
            <div className='tictac'>
              <img src={tictac} alt="Tictac" />
            </div>
          </div>
        </div>
        <div className='rightAnswerWrapper'>
          <h5>Question</h5>
          <div className='rightAnswerAssignment'>
            {currentQ.text}
          </div>
          {!selectedAnswers.length && <h5>Answer options</h5>}
          <div>
            {currentQ.answers.map((msg, index) => (
              <div
                key={index}
                className={`rightAnswerOfferedWrapper ${selectedAnswers.includes(msg.text) ? 'selected' : ''} `}
                onClick={() => handleAnswerSelection(msg.text)}
              >
                <p className={`rightAnswerOfferedAnswers`} id={`${checked && corAns.includes(msg.text) || isCorrectAnswer && corAns.includes(msg.text) ? 'correct-answer' : ''}`}>{msg.text}</p>
              </div>
            ))}
            {selectedAnswers.length > 0 && (
              <div className='doneButtonWrapper'>
                {showNextButton ? <button onClick={handleNext}>Next</button> : <button onClick={handleCheck}>Check</button>}
              </div>
            )}
            {feedback && (
              <div className={`feedback ${feedback.type}`}>
                <p>{feedback.message}</p>
              </div>
            )}
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

export default RightAnswerQuiz;
