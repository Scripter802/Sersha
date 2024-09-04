import React, { useContext, useEffect, useState } from 'react'
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify }
  from 'react-icons/bs'
import { game, home, logo, map, messages, rectangle, search, coin, level, avatar } from '../../assets/images/navbar/index'
import { useGlobalContext } from '../../context/context.jsx';
import volume from '../../assets/images/navbar/volume.png'
import volumePlay from '../../assets/images/navbar/volumePlay.png'

import MusicContext from '../../context/MusicContext.jsx'
import './adminPanelHeader.css'
import axios from 'axios';

function AdminPanelHeader({ OpenSidebar }) {
  const { toggleMusic, isPlaying, currentTime, setCurrentTime } = useContext(MusicContext);
  const [newMessageSound, setNewMessageSound] = useState(false);
  const { baseUrl, user, setUser } = useGlobalContext();
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
        <div className='mute-tutorial-wrapper'>
          <div className='mute-btn' onClick={() => toggleMusic()}>{!isPlaying ? <img src={volume} alt="mute button" /> : <img src={volumePlay} alt="Volume Play Button" />}</div>
        </div>

      </div>
    </header>
  )
}

export default AdminPanelHeader