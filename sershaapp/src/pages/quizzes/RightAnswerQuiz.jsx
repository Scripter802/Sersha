import { heart } from '../../assets/images/customization/items/index'
import avatar from '../../assets/images/navbar/userpick.png'
import { useEffect, useState } from 'react'
import close from '../../assets/images/quiz/close.png'
import inventory from '../../assets/images/quiz/inventory.png'
import { CiHeart } from 'react-icons/ci'
import { FaHeart } from "react-icons/fa";
import sershafox from '../../assets/images/quiz/sershafox.png'
import evilfox from '../../assets/images/attact/evilfox.png'
import tictac from '../../assets/images/quiz/saybubble.png'

import './rightanswerquiz.css'
import HealthBar from '../../components/HealthBar'
import { useGlobalContext } from '../../context/context'

const RightAnswerQuiz = ({ currentQ }) => {
  const { setShowPopup, currentQuestion, currentQuizz, setCurrentQuestion, heartsNum, setHeartsNum, correctAnswers, setCorrectAnswers } = useGlobalContext();
  console.log(`cur: ${currentQ.text}`)
  const messages = [
    {
      avatar: avatar,
      name: 'Jess',
      message: 'Which ancient wonder is located in Egypt and known for its pyramid shape?',
      answer: ["The Parthenon", "The Colosseum", "The Great Pyramid of Giz"],
    },
    {
      avatar: avatar,
      name: 'John',
      message: 'What iconic bridge connects the boroughs …',
      answer: ["Not too bad", "Pretty good, can't complain", "It was alright, nothing too exiciting", "Decent, just another day"],
    },
    {
      avatar: avatar,
      name: 'Nicky',
      message: 'What iconic bridge connects the boroughs …'
    },
    {
      avatar: avatar,
      name: 'Sam',
      message: 'What iconic bridge connects the boroughs …'
    },
  ]

  const [message, setMessage] = useState(`${messages[0].name}`);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [corAns, setCorAns] = useState([]);

  useEffect(() => {
    const correctAnswers = currentQ.answers.filter(q => q.isCorrect).map(q => q.text);
    setCorAns(correctAnswers);
  }, [currentQ]);

  console.log(`CORRECT ANSWERS ${correctAnswers}`,)
  console.log(currentQuizz.questions.length, currentQuestion)


  const handleAnswerSelection = (answer) => {
    setSelectedAnswers(prev => {
      if (prev.includes(answer)) {
        return prev.filter(ans => ans !== answer);
      }
      return [...prev, answer];
    });
  };

  const handleSubmit = () => {
    const isCorrect = corAns.every(answer => selectedAnswers.includes(answer)) && corAns.length === selectedAnswers.length;

    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    }

    if (currentQuizz.questions.length - 1 === currentQuestion) {
      setShowPopup(true);
    } else {
      setSelectedAnswers([]);
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <div className='rightAnswerQuizWrapper'>

      <div className='rightAnswerTitleWrapper'>

        <div className='rightAnswerTitle'>
          <div>
            <img src={close} alt="" />
            <h1>The battle has begun</h1>
          </div>

          <div className='healthResponsive'>
            <HealthBar />
          </div>
        </div>

        <div className='rightObenWrapper' id='rightObenWrap'>

          <div className='inventory'>
            <img src={inventory} alt="" />
          </div>

          <div className='hearts'>
            <div className='heartWrapper'>{heartsNum === 1 || heartsNum === 2 || heartsNum === 3 ? <FaHeart className='heartFull' /> : <CiHeart className='heart' />} </div>
            <div className='heartWrapper'>{heartsNum === 2 || heartsNum === 3 ? <FaHeart className='heartFull' /> : <CiHeart className='heart' />} </div>
            <div className='heartWrapper'>{heartsNum === 3 ? <FaHeart className='heartFull' /> : <CiHeart className='heart' />} </div>
          </div>

          <div className='sershaLogo'>
            <p>Sersha</p>
            <img src={sershafox} alt="" />
          </div>

        </div>
      </div>


      <div className='rightAnswerquizWrapper'>
        <div className='evilFoxWrapper'>
          <div className='health'>
            <HealthBar />
          </div>
          <div className='evilFox'>
            <img src={evilfox} alt="" />

            <div className='tictac'>
              <img src={tictac} alt="" />
            </div>
          </div>
        </div>
        <div>

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
                className={`rightAnswerOfferedWrapper `}
                onClick={() => handleAnswerSelection(msg.text)}
              >
                <p className='rightAnswerOfferedAnswers'
                  id={`${selectedAnswers.includes(msg.text) ? 'selected' : ''}`}>{msg.text}</p>
              </div>
            ))}
            {selectedAnswers.length > 0 && (
              <div className='doneButtonWrapper'>
                <button onClick={handleSubmit}>I am Done</button>
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
  )
}

export default RightAnswerQuiz