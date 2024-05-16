import HeaderResponsive from "../HeaderResponsive/HeaderResponsive";


const NewMessage = ({ messages, onSelectMessage, selectedMessagePreview, setSelectedMessagePreview }) => {
  let messageSelect = (msg) => {
    onSelectMessage(msg);

    if (!selectedMessagePreview) {
      setSelectedMessagePreview(true);
    }
  }

  return (
    <>
      {window.innerWidth < 1000 && (
        <HeaderResponsive />
      )}

      {messages.map(msg => (
        <div className='msgWrapper' key={msg.name} onClick={() => messageSelect(msg)}>

          <div>
            <img src={msg.avatar} alt="avatar" />
          </div>
          <div className="msgShortPreview">
            <h5>{msg.name}</h5>
            <p>{msg.message}</p>
          </div>
        </div>
      ))}
    </>
  )
}

export default NewMessage