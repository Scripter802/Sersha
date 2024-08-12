import './header.css'
import { game, home, logo, map, messages, rectangle, search, coin, level, avatar } from './../assets/images/navbar/index.js'
import coinBlack from './../assets/images/navbar/coinBlack.png';
import { useGlobalContext } from '../context/context.jsx';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import volume from '../assets/images/navbar/volume.png'
import volumePlay from '../assets/images/navbar/volumePlay.png'
import tutorialBtn from '../assets/images/navbar/tutorialBtn.png'
import Joyride from 'react-joyride';
import MusicContext from '../context/MusicContext.jsx'

const Header = () => {
  const { newMessage, setNewMessage, user, setUser, baseUrlImage, canPlayAnotherQuizToday, updateQuizzesPlayed, bundelsAndLevels, setBundlesAndLevels, isTutorialActive, setIsTutorialActive } = useGlobalContext();
  const path = window.location.pathname
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const { toggleMusic, isPlaying } = useContext(MusicContext);
  const [newMessageSound, setNewMessageSound] = useState(false);
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



  // const userUpdate = async () => {
  //   try {
  //     const response = await axios.get(`${baseUrl}/User/${singleUser?.email}`);
  //     console.log('User info updated', response);
  //   } catch (error) {
  //     console.error('Error updating user info:', error);
  //   }
  // };

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
        setNewMessageSound(true);
        localStorage.setItem('New Message', 1);
      }, 4000);
      return () => clearTimeout(newMessageTimer);
    } else {
      localStorage.setItem('New Message', 0);
      setNewMessage(0);
    };
  }, [user, canPlayAnotherQuizToday, newMessage]);


  return (
    <div className='headerWrapper'>
      <a className='logo' href='/' ><img src={logo} className='logoImg' alt="logo" /></a>
      <div className='navigationWrapper'>
        <a href='/map' className={`${path === '/map' ? 'currentMap' : 'map'}`}><img src={map} alt="map" /></a>
        <a href='/minigames' className={`${path === '/minigames' || path.includes('/minigames/') ? 'currentMiniGames' : 'miniGames'}`}><img src={game} alt="game" /></a>
        <a href='/' className={`${path === '/' ? 'currentHome' : 'home'}`}><img src={home} alt="home" /></a>
        <a href='/dm' id="dm" className={`${path === '/dm' || path.includes('/quizzes/') ? 'currentDm' : 'dm'}`} ><img src={messages} alt="messages" />{newMessage >= 1 && <p className='messageCounter'>{newMessage}</p>}</a>
        <a href='/foxcustomization' className={`${path === '/foxcustomization' ? 'currentFoxCustomization' : 'foxCustomization'}`}><img src={search} alt="search" /></a>
      </div>

      <div className='mute-tutorial-wrapper'>

        <div className='mute-btn' onClick={toggleMusic}>{!isPlaying ? <img src={volume} alt="mute button" /> : <img src={volumePlay} alt="Volume Play Button" />}</div>
        <div className='tutorialBtn' onClick={() => setIsTutorialActive(true)}><img src={tutorialBtn} alt="tutorial btn" /></div>
      </div>

      <div className='rightWrapper'>
        <div>
          <div className='coinWrapper'>
            <img src={coin} alt="coin" className='coinImg' />
            <p>{user?.coinBalance}</p>
          </div>
        </div>

        <div className='profileWrapper'>

          <div className='profileInfo'>
            <p style={{ textAlign: "center" }}>{user?.fullName}</p>
            <p>Level {user?.level}</p>
          </div>

          <div className='avatarWrapper' onClick={toggleDropdown}>
            <img src={level} alt="level" className='avatar' />
            <img src={user?.image ? `${baseUrlImage}${user.image}` : avatar} alt="avatar" className='avatar' />
            {dropdownVisible && (
              <div className='dropdownMenu'>
                <button className='settingsBtn' onClick={handleSettings}>Settings</button>
                <button onClick={handleLogout}>Log out</button>
              </div>
            )}
          </div>
        </div>

      </div>
      {newMessageSound == true && (
        <audio autoPlay>
          <source src="/music/SFX/DMs/esmmessagepingx2notificationsynthelectroniccartoon.mp3" type="audio/mpeg" />
        </audio>
      )}
    </div>
  )
}

export default Header