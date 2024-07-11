import './headerResponsive.css'
import { level, avatar, coin } from './../../assets/images/navbar/index.js'
import {
  gameResponsive,
  homeResponsive,
  mapResponsive,
  messagesResponsive,
  characterResponsive,
} from '../../assets/images/headerResponsive/index.js'
import { useGlobalContext } from '../../context/context.jsx';
import { useEffect } from 'react';

const HeaderResponsive = () => {

  const { newMessage, setNewMessage, user, setUser } = useGlobalContext();
  const path = window.location.pathname

  useEffect(() => {
    let singleUser;

    if (localStorage.getItem('New Message')) {
      setNewMessage(localStorage?.getItem('New Message'))
    }

    if (localStorage.getItem('userData')) {
      singleUser = localStorage.getItem('userData');
    }

    if (singleUser !== null || undefined) {
      setUser(JSON.parse(singleUser));
    }
  }, []);

  return (
    <div className='responsiveHeaderWrapper'>

      <div className='responsiveRightWrapper'>

        <div className='responsiveProfileWrapper'>

          <div className='responsiveAvatarWrapper'>
            <img src={level} alt="level" className='responsiveLevel' />
            <img src={avatar} alt="avatar" className='responsiveAvatar' />
          </div>

          <div className='responsiveProfileInfo'>
            <p>{user?.fullName}</p>
            <p>Level {user?.level}</p>
          </div>

        </div>

        <div>
          <div className='responsiveCoinWrapper'>
            <img src={coin} alt="coin" className='coinImg' />
            <p>{user?.coinBalance}</p>
          </div>
        </div>

      </div>
      <div className='responsiveNavigationWrapper'>
        <a href='/map' className={`${path === '/map' ? 'currentMap' : 'map'}`}><img src={mapResponsive} alt="map" /></a>
        <a href='/minigames' className={`${path === '/minigames' || path.includes('/minigames/') ? 'currentMiniGames' : 'miniGames'}`}><img src={gameResponsive} alt="game" /></a>
        <a href='/' className={`${path === '/' ? 'responsiveCurrentHome' : 'responsiveHome'}`}><img src={homeResponsive} alt="home" /></a>
        <a href='/dm' id="messages" className={`${path === '/dm' || path.includes('/quizzes/') ? 'responsiveDm' : 'responsiveMessages'}`} ><img src={messagesResponsive} alt="messages" />{newMessage >= 1 && <p className='messageCounter'>{newMessage}</p>}</a>
        <a href='/foxcustomization' className={`${path === '/foxcustomization' ? 'responsiveDm' : 'responsiveSearch'}`}><img src={characterResponsive} alt="search" /></a>
      </div>
    </div>
  )
}

export default HeaderResponsive