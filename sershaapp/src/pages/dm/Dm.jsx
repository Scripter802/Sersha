import './dm.css';
import avatar from '../../assets/images/dms/userpick.png';
import { heart } from '../../assets/images/customization/items/index.js';
import { useEffect, useRef, useState } from 'react';
import Popup from '../../components/Popup.jsx';
import NewMessage from '../../components/Dm/NewMessage.jsx';
import AnswersMsg from '../../components/Dm/AnswersMsg.jsx';
import { useGlobalContext } from '../../context/context.jsx';
import backButton from '../../assets/images/dms/backbuttonResponsive.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dm = () => {
  const { baseUrl, selectedMessagePreview, setSelectedMessagePreview, canPlayAnotherQuizToday, updateQuizzesPlayed, newMessage } = useGlobalContext();
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [messageHistory, setMessageHistory] = useState([]);
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const messagesPreviewRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, messageHistory]);

  useEffect(() => {
    if (canPlayAnotherQuizToday()) {
      const fetchRandomChat = async () => {
        try {
          const response = await axios.get(`${baseUrl}/Chat/randomChatMessage`);
          return response.data;
        } catch (error) {
          console.error('Error fetching chat message:', error);
          return null;
        }
      };

      const fetchMessages = async () => {
        const newMessages = [];
        for (let i = 0; i < 1; i++) {
          const message = await fetchRandomChat();
          if (message) newMessages.push(message);
        }
        setMessages(newMessages);
        setSelectedMessage(newMessages[0]);
      };

      fetchMessages();
    }
  }, [baseUrl]);

  const handleAnswer = (answer) => {
    setCurrentAnswer(answer);

    if (selectedMessage?.responses?.find(res => res.content === answer)?.nextMessage) {
      setSelectedMessage(selectedMessage.responses.find(res => res.content === answer).nextMessage);
      setCurrentAnswer('');
    } else {
      setShowPopup(true);
    }

    setMessageHistory(prevHistory => [...prevHistory, { question: selectedMessage.content, answer }]);
  };

  return (
    <div className='dmsWrapper'>
      <div className='dmsContainer'>
        <div className={`${window.innerWidth < 780 && selectedMessagePreview ? 'responsiveNewMsgWrapper' : 'newMsgWrapper'}`}>
          <NewMessage messages={messages} onSelectMessage={setSelectedMessage} setSelectedMessagePreview={setSelectedMessagePreview} />
        </div>

        {window.innerWidth < 780 && selectedMessagePreview && (
          <div className='responsiveSingleMessageHeader'>
            <div><img src={selectedMessage?.sender.authorImagePath == null ? avatar : `${baseUrl}${selectedMessage?.sender.authorImagePath}`} alt="avatar" /></div>
            <div><p>{selectedMessage?.sender.authorName}</p></div>
            <div onClick={() => setSelectedMessagePreview(false)} className='backButtonRespDm'><img src={backButton} alt="backbutton" className='resHeaderAvatarImg' /></div>
          </div>
        )}

        <div className={`${window.innerWidth < 780 && selectedMessagePreview ? 'responsiveMsgPreview' : 'msgPreview'}`} ref={messagesPreviewRef}>
          {messageHistory.map((msg, index) => (
            <div key={index} className='messageHistory'>
              <div className='receivedMsg'>
                <img src={avatar} alt="" />
                {msg.question}
              </div>
              <div className='answerWrapper'>
                <div className='answer'>
                  <img src={avatar} alt="" />
                  {msg.answer}
                </div>
              </div>
            </div>
          ))}
          <div className='receivedMsg'>
            <img src={avatar} alt="" />
            {selectedMessage?.content}
          </div>
          {!currentAnswer && <h5>Answer options</h5>}
          <div>
            <AnswersMsg selectedMessage={selectedMessage} currentAnswer={currentAnswer} handleAnswer={handleAnswer} />
          </div>
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className='footer'>
        <small>© 2024 Kaza Swap LLC. All rights reserved.</small>
        <small className='madeWith'>Made with <img src={heart} alt="heart" /></small>
      </div>
      {showPopup && <Popup />}
      <audio loop autoPlay>
        <source src="/music/Music/SershaThemesongMediumoptimal310520241122.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default Dm;
