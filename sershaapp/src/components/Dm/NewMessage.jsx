

const NewMessage = ({ messages }) => {
  return (
    <>
        {messages.map(msg => (
          <div className='msgWrapper' onClick={() => setMessage(`${msg.name}`)}>

            <div>
              <img src={msg.avatar} alt="" srcset="" />
            </div>
            <div>
              <h5>{msg.name}</h5>
              <p>{msg.message}</p>
            </div>
          </div>
          ))}
    </>
  )
}

export default NewMessage