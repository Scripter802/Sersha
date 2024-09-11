import HeaderResponsive from '../HeaderResponsive/HeaderResponsive';
import avatar from '../../assets/images/dms/userpick.png';
import { useGlobalContext } from '../../context/context';

const NewMessage = ({ messages, onSelectMessage, setSelectedMessagePreview, randomChoosenCharacter }) => {
  const { baseUrlImage } = useGlobalContext();
  const messageSelect = (msg) => {
    onSelectMessage(msg);
    setSelectedMessagePreview(true);
  };

  return (
    <>
      {window.innerWidth < 1000 && <HeaderResponsive />}
      {messages.map(msg => (
        <div className='msgWrapper' key={msg.id} onClick={() => messageSelect(msg)}>
          <div>
            <img src={randomChoosenCharacter?.imageSrc} alt="message sender avatar" className='chatSenderImage' />
          </div>
          <div className="msgShortPreview">
            <h5>{randomChoosenCharacter?.name}</h5>
            <p>{msg.content}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default NewMessage;
