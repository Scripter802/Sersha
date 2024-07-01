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
import done from '../../assets/images/quiz/done.png'
import incorrect from '../../assets/images/quiz/incorrect.png'

import './correctanswerquiz.css'
import HealthBar from '../../components/HealthBar'
import { useGlobalContext } from '../../context/context'

const CorrectAnswerQuiz = ({ currentQ }) => {
  const { setShowPopup, currentQuestion, currentQuizz, setCurrentQuestion, heartsNum, setHeartsNum, correctAnswers, setCorrectAnswers, wrongAnswers, setWrongAnswers } = useGlobalContext();

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
  const [answer, setAnswer] = useState(null);

  if (heartsNum == 0 || answer && currentQuizz.questions.length - 1 == currentQuestion) {
    setShowPopup(true)
  }

  useEffect(() => {
    console.log(`curQ ${currentQuestion}, ${currentQuizz.questions.length}`)
    if (answer !== null) {
      if (currentQ.isCorrect.toString() === answer) {
        setCorrectAnswers(prev => prev + 1);
        setAnswer(null);
      } else {
        setWrongAnswers(prev => prev + 1)
        setHeartsNum(prev => prev - 1);
        setAnswer(null);
      }

      if (currentQuizz.questions.length - 1 === currentQuestion) {
        setShowPopup(true);
      } else {

        setCurrentQuestion(currentQuestion + 1);
      }
    }
  }, [answer]);

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

      <div className='correctQuizzWrapper'>
        <div className='evilFoxWrapper'>
          <div className='health'>
            <HealthBar />
          </div>
          <div className='evilFox'>
            <img src={evilfox} alt="" />

            {/* <div className='tictac'>
              <img src={tictac} alt="" />
            </div> */}
          </div>
        </div>
        <div>

        </div>

        <div className='correctAnswerWrapper'>
          <h5>Statement</h5>
          <div className='correctAnswerAssignment'>
            {currentQ.text}
          </div>
          {answer ? '' : <h5>Answer options</h5>}

          <div className='correctAnswerAnsWrapper'>
            {messages.map(msg => (
              message === msg.name && !answer ? msg.answer?.map(ans => (
                <div className='correctOfferedAnswersWrapper' onClick={() => setAnswer(`${ans == 'True' ? true : false}`)}>
                  <p className='correctOfferedAnswers' style={{ backgroundColor: `${ans === "True" ? "#B2F0B6" : "#FFB6B6"}` }}>{ans === "True" ? <><img src={done} alt='done' />{ans}</> : <><img src={incorrect} alt='done' />{ans}</>}</p>
                </div>
              )) : ``
            ))}
            {answer ?
              <div className='correctAnswerSelectedWrapper'>
                <div className='correctAnswerSelected'>
                  <img src={messages[0].avatar} alt="" />
                  {answer ? `${answer}` : ''}
                </div>
              </div> : ''
            }
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

export default CorrectAnswerQuiz