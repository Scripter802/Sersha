import { heart } from '../../assets/images/customization/items/index'
import avatar from '../../assets/images/navbar/userpick.png'
import { useState } from 'react'
import close from '../../assets/images/quiz/close.png'
import inventory from '../../assets/images/quiz/inventory.png'
import { CiHeart } from 'react-icons/ci'
import { FaHeart } from "react-icons/fa";
import sershafox from '../../assets/images/quiz/sershafox.png'
import evilfox from '../../assets/images/attact/evilfox.png'
import tictac from '../../assets/images/quiz/saybubble.png'

import './rightanswerquiz.css'
import HealthBar from '../../components/HealthBar'

const RightAnswerQuiz = () => {
  const [heartsNum, setHeartsNum] = useState(2)

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
  const [answer, setAnswer] = useState()
  console.log(answer)

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
            {messages[0].message}
          </div>
          {answer ? '' : <h5>Answer options</h5>}

          <div>
            {messages.map(msg => (
              message === msg.name && !answer ? msg.answer?.map(ans => (
                <div className='rightAnswerOfferedWrapper' onClick={() => setAnswer(`${ans}`)}>
                  <p className='rightAnswerOfferedAnswers'>{ans}</p>
                </div>
              )) : ``
            ))}
            {answer ?
              <div className='rightAnswerSelectedWrapper'>
                <div className='rightAnswerSelected'>
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

export default RightAnswerQuiz