import './header.css'
import { game, home, logo, map, messages, rectangle, search, coin, level, avatar } from './../assets/images/navbar/index.js'
import coinBlack from './../assets/images/navbar/coinBlack.png';
import { useGlobalContext } from '../context/context.jsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { newMessage, setNewMessage, user, setUser, baseUrlImage } = useGlobalContext();
  const path = window.location.pathname
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

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
    // Add settings functionality here
    console.log('Settings clicked');
  };


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

  console.log(user)

  return (
    <div className='headerWrapper'>
      <a className='logo' href='/' ><img src={logo} className='logoImg' alt="logo" /></a>
      <div className='navigationWrapper'>
        <a href='/map' className={`${path === '/map' ? 'currentMap' : 'map'}`}><img src={map} alt="map" /></a>
        <a href='/minigames' className={`${path === '/minigames' || path.includes('/minigames/') ? 'currentMiniGames' : 'miniGames'}`}><img src={game} alt="game" /></a>
        <a href='/' className={`${path === '/' ? 'currentHome' : 'home'}`}><img src={home} alt="home" /></a>
        <a href='/dm' id="messages" className={`${path === '/dm' || path.includes('/quizzes/') ? 'dm' : 'messages'}`} ><img src={messages} alt="messages" />{newMessage >= 1 && <p className='messageCounter'>{newMessage}</p>}</a>
        <a href='/foxcustomization' className={`${path === '/foxcustomization' ? 'currentFoxCustomization' : 'foxCustomization'}`}><img src={search} alt="search" /></a>
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
                <button onClick={handleSettings}>Settings</button>
                <button onClick={handleLogout}>Log out</button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Header