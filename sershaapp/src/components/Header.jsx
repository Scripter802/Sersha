import './header.css'
import { game, home, logo, map, messages, rectangle, search, coin, level, avatar } from './../assets/images/navbar/index.js'


const Header = () => {
  const path = window.location.pathname
  console.log(path)

  return (
    <div className='headerWrapper'>
      <a className='logo' href='/' ><img src={logo} className='logoImg' alt="logo" /></a>
      <div className='navigationWrapper'>
        <div className='map'><img src={map} alt="map" /></div>
        <a href='/minigames' className={`${path === '/minigames' || path.includes('/minigames/') ? 'minigames' : 'home'}`}><img src={game} alt="game" /></a>
        <a href='/' className={`${path === '/' ? 'currentHome' : 'home'}`}><img src={home} alt="home" /></a>
        <a href='/dm' className={`${path === '/dm' || path.includes('/quizzes/') ? 'dm' : 'messages'}`} ><img src={messages} alt="messages" /></a>
        <a href='/foxcustomization' className={`${path === '/foxcustomization' ? 'dm' : 'search'}`}><img src={search} alt="search" /></a>
      </div>
      <div className='rightWrapper'>
        <div>
          <div className='coinWrapper'>
            <img src={coin} alt="coin" />
            <p>3,483</p>
          </div>
        </div>
        <div className='profileWrapper'>

          <div className='profileInfo'>
            <p>Camelia</p>
            <p>Level 2</p>
          </div>

          <div className='avatarWrapper'>
            <img src={level} alt="level" className='avatar' />
            <img src={avatar} alt="avatar" className='avatar' />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Header