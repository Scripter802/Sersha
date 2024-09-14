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
import Jess from '../../assets/images/chatCharacterImages/Jess.png'
import John from '../../assets/images/chatCharacterImages/John.png'
import Nicky from '../../assets/images/chatCharacterImages/Nicky.png'
import Sam from '../../assets/images/chatCharacterImages/Sam.png'

const Dm = () => {
  const { baseUrl, baseUrlImage, getAllAuthors, allAuthors, selectedMessagePreview, setSelectedMessagePreview, canPlayAnotherQuizToday, updateQuizzesPlayed, newMessage, bundelsAndLevels, user } = useGlobalContext();
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [messageHistory, setMessageHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [senderCharacters] = useState([{ name: "Jess", imageSrc: Jess }, { name: "John", imageSrc: John }, { name: "Nicky", imageSrc: Nicky }, { name: "Sam", imageSrc: Sam },])
  const [randomChoosenCharacter, setRandomChoosenCharacter] = useState();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const messagesPreviewRef = useRef(null);
  const { toggleMusic, currentPlaying, setCurrentPlaying, changeMusic, isPlaying } = useContext(MusicContext);
  const music = '/music/Music/SershaThemesongMediumoptimal310520241122.mp3'
  const sendMessageSound = new Audio('/music/SFX/DMs/sendMessage.mp3');
  const [messageLocked, setMessageLocked] = useState(false);
  const [senderSelected, setSenderSelected] = useState(false);

  const getRandomSenderIndex = () => {
    if (!senderSelected) {
      let randomIndex = Math.floor(Math.random() * senderCharacters?.length);
      setRandomChoosenCharacter(senderCharacters[randomIndex]);
      setSenderSelected(true);
    }
  };

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
    if (!messageLocked) {
      const newMessages = [];
      const message = await fetchRandomChat();
      if (message) {
        newMessages.push(message);
        setMessages(newMessages);
        setSelectedMessage(newMessages[0]);
        setMessageLocked(true);
        getRandomSenderIndex();
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (canPlayAnotherQuizToday()) {
      fetchMessages();
    } else {
      setIsLoading(false);
    }
  }, [baseUrl, canPlayAnotherQuizToday]);

  const handleAnswer = (answer, image) => {
    const nextMessage = selectedMessage?.responses?.find(res => res.content === answer)?.nextMessage;

    if (nextMessage) {
      setSelectedMessage(nextMessage);
      setCurrentAnswer('');
    } else {
      setMessages([]);
      setRandomChoosenCharacter();
      setSelectedMessage(null);
      setCurrentAnswer(null);
      setMessageHistory([]);
      setMessageLocked(false);
      setShowPopup(true);
      setSenderSelected(false);
    }

    setMessageHistory(prevHistory => [
      ...prevHistory,
      { question: selectedMessage.content, answer, image }
    ]);
  };

  return (
    <div className='dmsWrapper'>
      <div className='dmsContainer'>
        <div className='LevelTitleDmRes'>{bundelsAndLevels[0].levels.map((lvl, lvli) => (
          <>
            {lvl.levelNo == user?.level && <h3 className='title-level-dmRes'>{lvl.levelName}</h3>}
            {lvl.levelNoDown == user?.level && <h3 className='title-level-dmRes'>{lvl.levelNameDown}</h3>}
          </>
        ))}</div>
        <div className={`${window.innerWidth < 780 && selectedMessagePreview ? 'responsiveNewMsgWrapper' : 'newMsgWrapper'}`}>

          <div className='LevelTitleDm'>{bundelsAndLevels[0].levels.map((lvl, lvli) => (
            <>
              {lvl.levelNo == user?.level && <h3 className='title-level-dm'>{lvl.levelName}</h3>}
              {lvl.levelNoDown == user?.level && <h3 className='title-level-dm'>{lvl.levelNameDown}</h3>}
            </>
          ))}</div>

          {isLoading && (
            <div className='loadingWrapper'>
              <h3>Loading...</h3>
            </div>
          )}
          {!isLoading && messages.length === 0 && (
            <div className='noNewMessagesWrapperRes'>
              <h3 className='noNewMessagesRes'>Congratulations, no new messages for today!</h3>
              <h3 className='noNewMessagesRes'>Let's play Mini-games to practice and win new items for tomorrow!</h3>
            </div>
          )}
          <NewMessage messages={messages} randomChoosenCharacter={randomChoosenCharacter} onSelectMessage={setSelectedMessage} setSelectedMessagePreview={setSelectedMessagePreview} />
        </div>

        {window.innerWidth < 780 && selectedMessagePreview && (
          <div className='responsiveSingleMessageHeader'>
            <div><img src={randomChoosenCharacter?.imageSrc} alt="message sender avatar" className='chatSenderImage' /></div>
            <div><p>{randomChoosenCharacter?.name}</p></div>
            <div onClick={() => setSelectedMessagePreview(false)} className='backButtonRespDm'><img src={backButton} alt="backbutton" className='resHeaderAvatarImg' /></div>
          </div>
        )
        }

        <div className={`${window.innerWidth < 780 && selectedMessagePreview ? 'responsiveMsgPreview' : 'msgPreview'}`} ref={messagesPreviewRef}>
          {messageHistory.map((msg, index) => (
            <div key={index} className='messageHistory'>
              <div className='receivedMsg'>
                <img src={randomChoosenCharacter?.imageSrc} alt="message sender avatar" className='chatSenderImage' />
                {msg.question}
              </div>
              <div className='answerWrapper'>
                <div className='answer'>
                  <img src={msg?.image ? `${baseUrlImage}${msg?.image}` : avatar} className='chatSenderImage' alt="user image" />
                  {msg.answer}
                </div>
              </div>
            </div>
          ))}
          {isLoading ? (
            <div className='loadingWrapper'>
              <h3>Loading...</h3>
            </div>
          ) : !isLoading && messages.length === 0 && newMessage === 0 ? (
            <div className='noNewMessagesWrapper'>
              <h3 className='noNewMessages'>Congratulations, no new messages for today!</h3>
              <h3 className='noNewMessages'>Let's play Mini-games to practice and win new items for tomorrow!</h3>
            </div>
          ) : selectedMessage && (
            <div className='receivedMsg'>
              <img src={randomChoosenCharacter?.imageSrc} alt="message sender image" className='chatSenderImage' />
              {selectedMessage?.content}
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
