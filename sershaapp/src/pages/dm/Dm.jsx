import './dm.css'
import avatar from '../../assets/images/navbar/userpick.png'
import { heart } from '../../assets/images/customization/items/index.js'
import { useState } from 'react'
import Popup from '../../components/Popup.jsx'
import NewMessage from '../../components/Dm/NewMessage.jsx'
import AnswersMsg from '../../components/Dm/AnswersMsg.jsx'


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
    <div className='dmsWrapper'>

      <div className='dmsContainer'>
        <div className='newMsgWrapper'>
          <NewMessage messages={messages}/>
        </div>
        
        <div className='msgPreview'>
          <div className='receivedMsg'>
            <img src={messages[0].avatar} alt="" />
            {messages[0].message}
          </div>
          {!answer ? <h5>Answer options</h5> : '' }
          
          <div>
            <AnswersMsg messages={messages} message={message} answer={answer} setAnswer={setAnswer} />
          </div>
        </div>
      </div>

      <div className='footer'>
        <small>© 2024 Kaza Swap LLC. All rights reserved.</small>
        <small className='madeWith'>Made with <img src={heart} alt="heart" /></small>
      </div>
      {/* <Popup /> */}
    </div>
  )
}

export default Dm