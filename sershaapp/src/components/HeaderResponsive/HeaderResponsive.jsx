import './headerResponsive.css'
import { level, avatar, coin } from './../../assets/images/navbar/index.js'
import {
  gameResponsive,
  homeResponsive,
  mapResponsive,
  messagesResponsive,
  characterResponsive,
} from '../../assets/images/headerResponsive/index.js'

const HeaderResponsive = () => {
  const path = window.location.pathname
  console.log(path)

  return (
    <div className='responsiveHeaderWrapper'>

      <div className='responsiveRightWrapper'>

        <div className='responsiveProfileWrapper'>

          <div className='responsiveAvatarWrapper'>
            <img src={level} alt="level" className='responsiveLevel' />
            <img src={avatar} alt="avatar" className='responsiveAvatar' />
          </div>

          <div className='responsiveProfileInfo'>
            <p>Camelia</p>
            <p>Level 2</p>
          </div>

        </div>

        <div>
          <div className='responsiveCoinWrapper'>
            <img src={coin} alt="coin" className='coinImg' />
            <p>3,483</p>
          </div>
        </div>

      </div>
      <div className='responsiveNavigationWrapper'>
        <div className='responsiveMap'><img src={mapResponsive} alt="map" /></div>
        <div className='responsiveGame'><img src={gameResponsive} alt="game" /></div>
        <a href='/' className={`${path === '/' ? 'responsiveCurrentHome' : 'responsiveHome'}`}><img src={homeResponsive} alt="home" /></a>
        <a href='/dm' className={`${path === '/dm' || path.includes('/quizzes/') ? 'responsiveDm' : 'responsiveMessages'}`} ><img src={messagesResponsive} alt="messages" /></a>
        <a href='/foxcustomization' className={`${path === '/foxcustomization' ? 'responsiveDm' : 'responsiveSearch'}`}><img src={characterResponsive} alt="search" /></a>
      </div>
    </div>
  )
}

export default HeaderResponsive