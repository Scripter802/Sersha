import './dm.css'
import avatar from '../assets/images/navbar/userpick.png'
import { heart } from '../assets/images/customization/items/index.js'
import { useState } from 'react'
import Popup from '../components/Popup.jsx'


const Dm = () => {
  const messages = [
    {
      avatar: avatar,
      name: 'Jess',
      message: 'How was your day?',
      answer: ["Not too bad, thanks for asking", "Pretty good, can't complain", "It was alright, nothing too exiciting", "Decent, just another day"],
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
    <div className='customizationWrapper'>

      <div className='dmsWrapper'>
        <div className='newMsgWrapper'>
          {messages.map(msg => (
          <div className='msgWrapper' onClick={() => setMessage(`${msg.name}`)}>

            <div>
              <img src={msg.avatar} alt="" srcset="" />
            </div>
            <div>
              <h5>{msg.name}</h5>
              <p>{msg.message}</p>
            </div>
          </div>
          ))}
          </div>
        <div>
          
        </div>

        <div className='msgPreview'>
          <div className='receivedMsg'>
            <img src={messages[0].avatar} alt="" />
            {messages[0].message}
          </div>
          {!answer ? <h5>Answer options</h5> : '' }
          
          <div>
          {messages.map(msg => (
            message === msg.name && !answer ? msg.answer?.map(ans => (
              <div className='possibleAnsWrapper' onClick={() => setAnswer(`${ans}`)}>
                <p className='possibleAnswers'>{ans}</p>
              </div>
            )) : ``
            ))}
            {answer ?
            <div className='answerWrapper'>
              <div className='answer'>
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
      <Popup />
    </div>
  )
}

export default Dm