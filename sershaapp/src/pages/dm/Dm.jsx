import './dm.css'
import avatar from '../../assets/images/navbar/userpick.png'
import { heart } from '../../assets/images/customization/items/index.js'
import { useEffect, useState } from 'react'
import Popup from '../../components/Popup.jsx'
import NewMessage from '../../components/Dm/NewMessage.jsx'
import AnswersMsg from '../../components/Dm/AnswersMsg.jsx'
import { useGlobalContext } from '../../context/context.jsx'
import userpic from '../../assets/images/dms/userpick.png'
import backButton from '../../assets/images/dms/backbuttonResponsive.png'
import axios from 'axios'

const Dm = () => {
  const { baseUrl, selectedMessagePreview, setSelectedMessagePreview } = useGlobalContext()

  const [messages, setMessages] = useState([]);
  // {
  //   avatar: avatar,
  //   name: 'Jess',
  //   message: 'How was your day?',
  //   answer: ["Not too bad, thanks for asking", "Pretty good, can't complain", "It was alright, nothing too exiciting", "Decent, just another day"],
  // },
  // {
  //   avatar: avatar,
  //   name: 'John',
  //   message: 'What iconic bridge connects the boroughs …',
  //   answer: ["Not too bad", "Pretty good, can't complain", "It was alright, nothing too exiciting", "Decent, just another day"],
  // },
  // {
  //   avatar: avatar,
  //   name: 'Nicky',
  //   message: 'What iconic bridge connects the boroughs …',
  //   answer: ["It was alright, nothing too exiciting", "Decent, just another day"],

  // },
  // {
  //   avatar: avatar,
  //   name: 'Sam',
  //   message: 'What iconic bridge connects the boroughs …',
  //   answer: ["Pretty good, can't complain", "It was alright", "Decent, just another day"],

  // },
  // ]

  const [message, setMessage] = useState(`${messages[1]?.name}`);
  const [answer, setAnswer] = useState()
  console.log(answer)

  const [selectedMessage, setSelectedMessage] = useState();
  const [nextMessage, setNextMessage] = useState(messages[0]);
  console.log(selectedMessage)
  useEffect(() => {
    const fetchRandomChat = async () => {
      try {
        const response = await axios.get(`${baseUrl}/Chat/randomChatMessage`);
        setMessages(response.data)
      } catch (error) {
        console.error('Error fetching right answer questions:', error);
      }
    };
    console.log(messages)
    messages && setSelectedMessage(messages[1])

    fetchRandomChat();
  }, []);

  return (
    <div className='dmsWrapper'>

      <div className='dmsContainer'>
        <div className={`${window.innerWidth < 780 && selectedMessagePreview === true ? 'responsiveNewMsgWrapper' : 'newMsgWrapper'}`}>
          <NewMessage messages={messages} onSelectMessage={setSelectedMessage} setSelectedMessagePreview={setSelectedMessagePreview} setAnswer={setAnswer} />
        </div>

        {window.innerWidth < 780 && selectedMessagePreview === true && (
          <div className='responsiveSingleMessageHeader'>
            <div><img src={userpic} alt="avatar" /></div>
            <div><p>{selectedMessage.name}</p></div>
            <div onClick={() => setSelectedMessagePreview(false)} className='backButtonRespDm'><img src={backButton} alt="backbutton" className='resHeaderAvatarImg' /></div>
          </div>
        )}

        <div className={`${window.innerWidth < 780 && selectedMessagePreview === true ? 'responsiveMsgPreview' : 'msgPreview'}`}>
          <div className='receivedMsg'>
            <img src={selectedMessage?.avatar} alt="" />
            {selectedMessage?.content}
          </div>
          {!answer ? <h5>Answer options</h5> : ''}

          <div>
            <AnswersMsg selectedMessage={selectedMessage} answer={answer} setAnswer={setAnswer} selectedMessagePreview={selectedMessagePreview} />
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