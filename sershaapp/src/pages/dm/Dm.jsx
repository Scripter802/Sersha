import './dm.css';
import avatar from '../../assets/images/dms/userpick.png';
import { heart } from '../../assets/images/customization/items/index.js';
import { useEffect, useState } from 'react';
import Popup from '../../components/Popup.jsx';
import NewMessage from '../../components/Dm/NewMessage.jsx';
import AnswersMsg from '../../components/Dm/AnswersMsg.jsx';
import { useGlobalContext } from '../../context/context.jsx';
import backButton from '../../assets/images/dms/backbuttonResponsive.png';
import axios from 'axios';

const Dm = () => {
  const { baseUrl, selectedMessagePreview, setSelectedMessagePreview } = useGlobalContext();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [answer, setAnswer] = useState('');
  const [answer2, setAnswer2] = useState([]);
  const [answer3, setAnswer3] = useState([]);
  const [answer4, setAnswer4] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [nextMessage, setNextMessage] = useState(null);

  useEffect(() => {
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
      for (let i = 0; i < 4; i++) {
        const message = await fetchRandomChat();
        if (message) newMessages.push(message);
      }
      setMessages(newMessages);
    };

    fetchMessages();
  }, [baseUrl]);

  useEffect(() => {
    if (answer && selectedMessage?.responses[0].nextMessageId) {
      const fetchNextMessageChat = async () => {
        try {
          const response = await axios.get(`${baseUrl}/Chat/${selectedMessage?.responses[0].nextMessageId}`);
          setNextMessage(response.data);
        } catch (error) {
          console.error('Error fetching chat message:', error);
        }
      };

      fetchNextMessageChat();
    }
  }, [answer, selectedMessage, baseUrl]);

  return (
    <div className='dmsWrapper'>
      <div className='dmsContainer'>
        <div className={`${window.innerWidth < 780 && selectedMessagePreview ? 'responsiveNewMsgWrapper' : 'newMsgWrapper'}`}>
          <NewMessage messages={messages} onSelectMessage={setSelectedMessage} setSelectedMessagePreview={setSelectedMessagePreview} setAnswer={setAnswer} />
        </div>

        {window.innerWidth < 780 && selectedMessagePreview && (
          <div className='responsiveSingleMessageHeader'>
            <div><img src={avatar} alt="avatar" /></div>
            <div><p>{selectedMessage?.name}</p></div>
            <div onClick={() => setSelectedMessagePreview(false)} className='backButtonRespDm'><img src={backButton} alt="backbutton" className='resHeaderAvatarImg' /></div>
          </div>
        )}

        <div className={`${window.innerWidth < 780 && selectedMessagePreview ? 'responsiveMsgPreview' : 'msgPreview'}`}>
          <div className='receivedMsg'>
            <img src={avatar} alt="" />
            {selectedMessage?.content}
          </div>
          {!answer && <h5>Answer options</h5>}
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
  );
};

export default Dm;
