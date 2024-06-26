import { heart } from '../../assets/images/customization/items/index';
import avatar from '../../assets/images/navbar/userpick.png';
import { useState, useEffect } from 'react';
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

const CorrectAnswerQuiz = ({ currentQ }) => {
  const { setShowPopup, currentQuestion, currentQuizz, setCurrentQuestion, heartsNum, setHeartsNum, correctAnswers, setCorrectAnswers } = useGlobalContext();

  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    if (answer !== null) {
      if (currentQ.isCorrect === answer) {
        setCorrectAnswers(prev => prev + 1);
      }
      if (currentQuizz.questions.length - 1 === currentQuestion) {
        setShowPopup(true);
      } else {
        setCurrentQuestion(prev => prev + 1);
      }
    }
  }, [answer, currentQ.isCorrect, currentQuestion, currentQuizz.questions.length, setCorrectAnswers, setCurrentQuestion, setShowPopup]);

  return (
    <div className='correctAnswerQuizWrapper'>
      <div className='correctAnswerTitleWrapper'>
        <div className='correctAnswerTitle'>
          <div>
            <img src={close} alt="" />
            <h1>The battle has begun</h1>
          </div>
          <div className='healthResponsive'>
            <HealthBar />
          </div>
        </div>
        <div className='rightObenWrapper'>
          <div className='inventory'>
            <img src={inventory} alt="" />
          </div>
          <div className='hearts'>
            <div className='heartWrapper'>{heartsNum >= 1 ? <FaHeart className='heartFull' /> : <CiHeart className='heart' />}</div>
            <div className='heartWrapper'>{heartsNum >= 2 ? <FaHeart className='heartFull' /> : <CiHeart className='heart' />}</div>
            <div className='heartWrapper'>{heartsNum >= 3 ? <FaHeart className='heartFull' /> : <CiHeart className='heart' />}</div>
          </div>
          <div className='sershaLogo'>
            <p>Sersha</p>
            <img src={sershafox} alt="" />
          </div>
        </div>
      </div>
      <div className='correctQuizzWrapper'>
        <div className='evilFoxWrapper'>
          <div className='health'>
            <HealthBar />
          </div>
          <div className='evilFox'>
            <img src={evilfox} alt="" />
          </div>
        </div>
        <div className='correctAnswerWrapper'>
          <h5>Statement</h5>
          <div className='correctAnswerAssignment'>
            {currentQ.text}
          </div>
          {!answer && <h5>Answer options</h5>}
          <div className='correctAnswerAnsWrapper'>
            {!answer && currentQ.answers.map((ans, index) => (
              <div
                key={index}
                className='correctOfferedAnswersWrapper'
                onClick={() => setAnswer(ans.isCorrect)}
              >
                <p className='correctOfferedAnswers' style={{ backgroundColor: ans.isCorrect ? "#B2F0B6" : "#FFB6B6" }}>
                  <img src={ans.isCorrect ? done : incorrect} alt={ans.isCorrect ? 'done' : 'incorrect'} />
                  {ans.text}
                </p>
              </div>
            ))}
            {answer !== null && (
              <div className='correctAnswerSelectedWrapper'>
                <div className='correctAnswerSelected'>
                  <img src={avatar} alt="" />
                  {answer ? "Correct" : "Incorrect"}
                </div>
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
};

export default CorrectAnswerQuiz;
