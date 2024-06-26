import HeaderResponsive from '../HeaderResponsive/HeaderResponsive';
import avatar from '../../assets/images/dms/userpick.png';
import { useGlobalContext } from '../../context/context';

const NewMessage = ({ messages, onSelectMessage, setSelectedMessagePreview }) => {
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
            <img src={msg.sender.authorImagePath == null ? avatar : `${baseUrlImage}${msg.sender.authorImagePath}`} alt="avatar" />
          </div>
          <div className="msgShortPreview">
            <h5>{msg.sender.authorName}</h5>
            <p>{msg.content}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default NewMessage;
