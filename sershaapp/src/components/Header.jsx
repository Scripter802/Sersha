import './header.css'
import { game, home, logo, map, messages, rectangle, search, coin, level, avatar } from './../assets/images/navbar/index.js'


const Header = () => {
  return (
    <div className='headerWrapper'>
        <div className='logo' ><img src={logo} className='logo' alt="logo" /></div>
        <div className='navigationWrapper'>
            <div className='map'><img src={map} alt="map" /></div>
            <div className='game'><img src={game} alt="game" /></div>
            <div className='home'><img src={home} alt="home" /></div>
            <div className='messages'><img src={messages} alt="messages" /></div>
            <div className='search'><img src={search} alt="search" /></div>
        </div>
        <div className='rightWrapper'>
          <div>
            <div className='coinWrapper'>
              <img src={coin} alt="coin" />
              <p>3,483</p>  
            </div>
          </div>
          <div className='profileWrapper'>
            
              <p>Camelia</p>
              <p>Level 2</p>
            
          </div>

          <div className='avatarWrapper'>
            <img src={level} alt="level" className='avatar' />
            <img src={avatar} alt="avatar" className='avatar' />
          </div>
          
        </div>
    </div>
  )
}

export default Header