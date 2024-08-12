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
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import volume from '../../assets/images/navbar/volume.png'
import volumePlay from '../../assets/images/navbar/volumePlay.png'
import MusicContext from '../../context/MusicContext.jsx'


const HeaderResponsive = () => {

  const { newMessage, setNewMessage, user, setUser, baseUrlImage, canPlayAnotherQuizToday, updateQuizzesPlayed, bundelsAndLevels, setBundlesAndLevels } = useGlobalContext();
  const path = window.location.pathname
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const { toggleMusic, isPlaying } = useContext(MusicContext);
  let levelStep = JSON.parse(localStorage.getItem('levelStep'));

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    navigate('/signin-up');
    console.log('Logout clicked');
  };

  const handleSettings = () => {
    navigate('/settings');
  };

  useEffect(() => {
    let singleUser;

    if (localStorage.getItem('New Message')) {
      setNewMessage(localStorage?.getItem('New Message'))
    }


    if (localStorage.getItem('userData')) {
      singleUser = localStorage.getItem('userData');
      console.log(singleUser);
    }

    if (localStorage.getItem('userData') == "undefined") {
      localStorage.removeItem("token");
    }

    if (singleUser !== 'undefined') {
      setUser(JSON.parse(singleUser));
    }

  }, []);

  useEffect(() => {
    const updatedBundlesAndLevels = bundelsAndLevels.map(bundle => ({
      ...bundle,
      levels: bundle.levels.map(level => {
        if (level.levelNo === user?.level || level.levelNoDown === user?.level) {
          return {
            ...level,
            step: levelStep,
          };
        }
        return level;
      }),
    }));
    setBundlesAndLevels(updatedBundlesAndLevels);
  }, [user, levelStep])

  useEffect(() => {
    if (canPlayAnotherQuizToday()) {
      const newMessageTimer = setTimeout(() => {
        setNewMessage(1);
        localStorage.setItem('New Message', 1);
      }, 4000);
      return () => clearTimeout(newMessageTimer);
    } else {
      localStorage.setItem('New Message', 0);
      setNewMessage(0);
    };
  }, [user, canPlayAnotherQuizToday, newMessage]);

  return (
    <div className='responsiveHeaderWrapper'>

      <div className='responsiveRightWrapper'>

        <div className='responsiveProfileWrapper'>

          <div className='responsiveAvatarWrapper' onClick={toggleDropdown}>
            <img src={level} alt="level" className='responsiveLevel' />
            <img src={user?.image ? `${baseUrlImage}${user.image}` : avatar} alt="avatar" className='responsiveAvatar' />
            {dropdownVisible && (
              <div className='dropdownMenuRes'>
                <button onClick={handleSettings}>Settings</button>
                <button onClick={handleLogout}>Log out</button>
              </div>
            )}
          </div>



          <div className='responsiveProfileInfo'>
            <p>{user?.fullName}</p>
            <p>Level {user?.level}</p>
          </div>

        </div>

        <div className='flexWrap'>
          <div className='mute-btn-res' onClick={toggleMusic}>{!isPlaying ? <img src={volume} alt="mute button" /> : <img src={volumePlay} alt="Volume Play Button" />}</div>
          <div className='responsiveCoinWrapper'>
            <img src={coin} alt="coin" className='coinImg' />
            <p>{user?.coinBalance}</p>
          </div>
        </div>

      </div>
      <div className='responsiveNavigationWrapper'>
        <a href='/map' className={`${path === '/map' ? 'currentMapRes' : 'mapRes'}`}><img src={mapResponsive} alt="map" /></a>
        <a href='/minigames' className={`${path === '/minigames' || path.includes('/minigames/') ? 'currentMiniGamesRes' : 'miniGamesRes'}`}><img src={gameResponsive} alt="game" /></a>
        <a href='/' className={`${path === '/' ? 'currentHomeRes' : 'homeRes'}`}><img src={homeResponsive} alt="home" /></a>
        <a href='/dm' id="messages" className={`${path === '/dm' || path.includes('/quizzes/') ? 'currentDmRes' : 'dmRes'}`} ><img src={messagesResponsive} alt="messages" />{newMessage >= 1 && <p className='messageCounter'>{newMessage}</p>}</a>
        <a href='/foxcustomization' className={`${path === '/foxcustomization' ? 'currentFoxCustomizationRes' : 'foxCustomizationRes'}`}><img src={characterResponsive} alt="search" /></a>
      </div>
    </div>
  )
}

export default HeaderResponsive