import React from 'react'
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'
 import { game, home, logo, map, messages, rectangle, search, coin, level, avatar } from '../../assets/images/navbar/index'

function Header({OpenSidebar}) {
  const path = window.location.pathname
  
  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-right'>
        <div className='navigationWrapper'>
            <div className='map'><img src={map} alt="map" /></div>
            <div className='game'><img src={game} alt="game" /></div>
            <a href='/' className={`${path === '/' ? 'currentHome' : 'home'}`}><img src={home} alt="home" /></a>
            <a href='/dm' className={`${path === '/dm' || path.includes('/quizzes/') ? 'dm' : 'messages'}`} ><img src={messages} alt="messages" /></a>
            <a href='/foxcustomization' className={`${path === '/foxcustomization' ? 'dm' : 'search'}`}><img src={search} alt="search" /></a>
        </div>
        </div>
    </header>
  )
}

export default Header