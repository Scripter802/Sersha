import './dm.css';
import avatar from '../../assets/images/dms/userpick.png';
import { heart } from '../../assets/images/customization/items/index.js';
import { useContext, useEffect, useRef, useState } from 'react';
import Popup from '../../components/Popup.jsx';
import NewMessage from '../../components/Dm/NewMessage.jsx';
import AnswersMsg from '../../components/Dm/AnswersMsg.jsx';
import { useGlobalContext } from '../../context/context.jsx';
import backButton from '../../assets/images/dms/backbuttonResponsive.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MusicContext from '../../context/MusicContext';

const Dm = () => {
  const { baseUrl, selectedMessagePreview, setSelectedMessagePreview, canPlayAnotherQuizToday, updateQuizzesPlayed, newMessage, bundelsAndLevels, user } = useGlobalContext();
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [messageHistory, setMessageHistory] = useState([]);
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const messagesPreviewRef = useRef(null);
  const { toggleMusic, currentPlaying, setCurrentPlaying, changeMusic, isPlaying } = useContext(MusicContext);
  const music = '/music/Music/SershaThemesongMediumoptimal310520241122.mp3'

  useEffect(() => {
    if (currentPlaying != music) {
      changeMusic('/music/Music/SershaThemesongMediumoptimal310520241122.mp3');
    }
  }, [changeMusic, music]);

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
        <div className='LevelTitleDmRes'>{bundelsAndLevels.map((bundle, i) => (
          bundle.levels.map((lvl, lvli) => (
            <>
              {lvl.levelNo == user?.level && <h3 className='title-level-dmRes'>{lvl.levelName}</h3>}
              {lvl.levelNoDown == user?.level && <h3 className='title-level-dmRes'>{lvl.levelNameDown}</h3>}
            </>
          ))))}</div>
        <div className={`${window.innerWidth < 780 && selectedMessagePreview ? 'responsiveNewMsgWrapper' : 'newMsgWrapper'}`}>

          <div className='LevelTitleDm'>{bundelsAndLevels.map((bundle, i) => (
            bundle.levels.map((lvl, lvli) => (
              <>
                {lvl.levelNo == user?.level && <h3 className='title-level-dm'>Level: {lvl.levelName}</h3>}
                {lvl.levelNoDown == user?.level && <h3 className='title-level-dm'>Level: {lvl.levelNameDown}</h3>}
              </>
            ))))}</div>

          {newMessage == 0 && (
            <div className='noNewMessagesWrapperRes'>
              <h3 className='noNewMessagesRes'>Congratulations, no new messages for today!</h3>
              <h3 className='noNewMessagesRes'>Let's play Mini-games to practice and win new items for tomorrow!</h3>
            </div>
          )}
          <NewMessage messages={messages} onSelectMessage={setSelectedMessage} setSelectedMessagePreview={setSelectedMessagePreview} />
        </div>

        {window.innerWidth < 780 && selectedMessagePreview && (
          <div className='responsiveSingleMessageHeader'>
            <div><img src={selectedMessage?.sender.authorImagePath == null ? avatar : `${baseUrl}${selectedMessage?.sender.authorImagePath}`} alt="avatar" /></div>
            <div><p>{selectedMessage?.sender.authorName}</p></div>
            <div onClick={() => setSelectedMessagePreview(false)} className='backButtonRespDm'><img src={backButton} alt="backbutton" className='resHeaderAvatarImg' /></div>
          </div>
        )
        }

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
          {selectedMessage ? (
            <div className='receivedMsg'>
              <img src={avatar} alt="" />
              {selectedMessage?.content}
            </div>
          ) : (
            <div className='noNewMessagesWrapper'>
              <h3 className='noNewMessages'>Congratulations, no new messages for today!</h3>
              <h3 className='noNewMessages'>Let's play Mini-games to practice and win new items for tomorrow!</h3>
            </div>
          )
          }
          {!currentAnswer && selectedMessage && <h5>Answer options</h5>}
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
      {/* <audio loop autoPlay>
        <source src="/music/Music/SershaThemesongMediumoptimal310520241122.mp3" type="audio/mpeg" />
      </audio> */}
    </div>
  );
};

export default Dm;
