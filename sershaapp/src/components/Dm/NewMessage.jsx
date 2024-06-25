
import HeaderResponsive from '../HeaderResponsive/HeaderResponsive';
import avatar from '../../assets/images/dms/userpick.png';

const NewMessage = ({ messages, onSelectMessage, setSelectedMessagePreview }) => {
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
            <img src={avatar} alt="avatar" />
          </div>
          <div className="msgShortPreview">
            <h5>{msg.sender}</h5>
            <p>{msg.content}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default NewMessage;
