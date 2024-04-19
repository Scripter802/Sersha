import './dm.css'
import avatar from '../assets/images/navbar/userpick.png'
import { heart } from '../assets/images/customization/items/index.js'


const Dm = () => {

  const messages = [
    {
      avatar: avatar,
      name: 'Jess',
      message: 'What iconic bridge connects the boroughs …'
    },
    {
      avatar: avatar,
      name: 'Jess',
      message: 'What iconic bridge connects the boroughs …'
    },
    {
      avatar: avatar,
      name: 'Jess',
      message: 'What iconic bridge connects the boroughs …'
    },
    {
      avatar: avatar,
      name: 'Jess',
      message: 'What iconic bridge connects the boroughs …'
    },
  ]

  return (
    <div className='customizationWrapper'>

      <div className='dmsWrapper'>
        <div className='newMsgWrapper'>
          {messages.map(msg => (
          <div className='msgWrapper'>

            <div>
              <img src={msg.avatar} alt="" srcset="" />
            </div>
            <div>
              <h5>{msg.name}</h5>
              <p>{msg.message}</p>
            </div>
          </div>
          ))}
          </div>
        <div>
          
        </div>

        <div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div className='footer'>
        <small>© 2024 Kaza Swap LLC. All rights reserved.</small>
        <small className='madeWith'>Made with <img src={heart} alt="heart" /></small>
      </div>
    </div>
  )
}

export default Dm