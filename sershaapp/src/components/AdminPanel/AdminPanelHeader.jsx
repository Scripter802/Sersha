import React from 'react'
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify }
  from 'react-icons/bs'
import { game, home, logo, map, messages, rectangle, search, coin, level, avatar } from '../../assets/images/navbar/index'
import './adminPanelHeader.css'

function AdminPanelHeader({ OpenSidebar }) {
  const path = window.location.pathname

  return (
    <header className='header AdmHeader'>
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={OpenSidebar} />
      </div>
      <div className='header-right'>
        <div className='navigationWrapperAdm'>
          <a href='/map' className={`${path === '/map' || path.includes('/map/') ? 'currentMap' : 'map'}`}><img src={map} alt="map" /></a>
          <a href='/minigames' className={`${path === '/minigames' || path.includes('/minigames/') ? 'currentMiniGames' : 'miniGames'}`}><img src={game} alt="game" /></a>
          <a href='/' className={`${path === '/' ? 'currentHome' : 'home'}`}><img src={home} alt="home" /></a>
          <a href='/dm' className={`${path === '/dm' || path.includes('/quizzes/') ? 'dm' : 'messages'}`} ><img src={messages} alt="messages" /></a>
          <a href='/foxcustomization' className={`${path === '/foxcustomization' ? 'currentFoxCustomization' : 'foxCustomization'}`}><img src={search} alt="search" /></a>
        </div>
      </div>
    </header>
  )
}

export default AdminPanelHeader