import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/context';
import HealthBar from '../../components/HealthBar';
import './fillintheblank.css';
import { FaHeart } from 'react-icons/fa';
import { CiHeart } from 'react-icons/ci';
import close from '../../assets/images/quiz/close.png';
import inventory from '../../assets/images/quiz/inventory.png';
import sershafox from '../../assets/images/quiz/sershafox.png';
import evilfox from '../../assets/images/attact/evilfox.png';
import dropPlace from '../../assets/images/quiz/dropPlace.png';
import done from '../../assets/images/quiz/done.png';
import tictac from '../../assets/images/quiz/saybubble.png';
import { heart } from '../../assets/images/customization/items/index';

const FillInTheBlank = ({ currentQ }) => {
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
    setWrongAnswers
  } = useGlobalContext();

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [dropped, setDropped] = useState(null);
  const [corAns, setCorAns] = useState('');
  const [answers, setAnswers] = useState([]);
  const [showCheckButton, setShowCheckButton] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const correctAnswer = currentQ.answers.find(q => q.isCorrect);
    if (correctAnswer) {
      setCorAns(correctAnswer.text);
    }
    setAnswers(currentQ.answers);
  }, [currentQ]);

  const handleSelectAnswer = (item) => {
    setSelectedAnswer(item);
  };

  const handleDrop = () => {
    if (selectedAnswer) {
      const oldAnswer = dropped;
      setDropped(selectedAnswer);
      setShowCheckButton(true);

      const newAnswers = answers.filter(answer => answer.text !== selectedAnswer);

      if (oldAnswer) {
        newAnswers.push({ text: oldAnswer, isCorrect: oldAnswer === corAns });
      }

      setAnswers(newAnswers);
      setSelectedAnswer(null);
    }
  };

  const handleRemoveAnswer = () => {
    if (dropped) {
      setAnswers(prevAnswers => {
        const existingAnswer = prevAnswers.find(answer => answer.text === dropped);
        if (!existingAnswer) {
          return [...prevAnswers, { text: dropped, isCorrect: dropped === corAns }];
        }
        return prevAnswers;
      });
      setDropped(null);
      setShowCheckButton(false);
    }
  };

  const handleCheckAnswer = () => {

    const correctSound = new Audio('/music/SFX/FightRogueFox/rightanswer.mp3');
    const incorrectSound = new Audio('/music/SFX/FightRogueFox/IncorrectAnswer.mp3');

    if (dropped === corAns) {
      setCorrectAnswers(prev => prev + 1);
      setFeedback({ type: 'correct', message: 'Correct Answer!' });
      correctSound.play();
    } else {
      setWrongAnswers(prev => prev + 1);
      setHeartsNum(prev => prev - 1);
      setFeedback({ type: 'wrong', message: 'Wrong Answer!' });
      incorrectSound.play();
    }
    setChecked(true)
    setShowNextButton(true);
    setShowCheckButton(false);
  };

  const handleNext = () => {
    if (currentQuizz.questions.length - 1 === currentQuestion) {
      setShowPopup(true);
      setChecked(false);
    } else {
      setSelectedAnswer(null);
      setDropped(null);
      setCurrentQuestion(prev => prev + 1);
      setFeedback(null);
      setChecked(false);
      setShowNextButton(false);
    }
  };

  return (
    <div className='fillBlankQuizWrapper'>
      <div className='fillBlankQuizTitleWrapper'>
        <div className='fillBlankQuizTitle'>
          <div>
            <img src={close} alt='' />
            <h1>The battle has begun</h1>
          </div>
          <div className='healthResponsive'>
            <HealthBar />
          </div>
        </div>
        <div className='rightObenWrapper'>
          {/* <div className='inventory'>
            <img src={inventory} alt='' />
          </div> */}
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
      <div className='fillInTheBlankquizWrapper'>
        <div className='evilFoxWrapper'>
          <div className='health'>
            <HealthBar />
          </div>
          <div className='evilFox'>
            <img src={evilfox} alt='' />
            <div className='tictac'>
              <img src={tictac} alt='Tictac' />
            </div>
          </div>
        </div>
        <div className='fillInBlankWrapper'>
          <h5>Fill in the Blank</h5>
          <div className='fillInAssignment'>
            {currentQ.statement1}
            <div
              className={`dropHereBox ${dropped ? 'droppedAnswer' : ''}`}
              onClick={handleDrop}
            >
              {dropped ? (
                <p onClick={handleRemoveAnswer}>{dropped}</p>
              ) : (
                <img src={dropPlace} alt='dropplace' />
              )}
            </div>
            {currentQ.statement2}
          </div>
          <h5>Answer options</h5>
          <div className='fillInBlankAnswerWrapper'>
            {answers.map((item, index) => (
              <div
                key={index}
                className={`fillBlankOfferedAnswersWrapper ${selectedAnswer === item.text ? 'selected' : ''}`}
                onClick={() => handleSelectAnswer(item.text)}
              >
                <p className='fillBlankOfferedAnswers' id={`${checked && corAns.includes(item.text) ? 'correct-answer-Fill' : ''}`} >{item.text}</p>
              </div>
            ))}
          </div>
          {showCheckButton && (
            <div className='groupingFinished' onClick={handleCheckAnswer}>
              <img src={done} alt='done' />
              Check
            </div>
          )}
          {showNextButton && (
            <div className='groupingFinished' onClick={handleNext}>
              Next
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

export default FillInTheBlank;
