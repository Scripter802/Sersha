import './header.css'
import { game, home, logo, map, messages, rectangle, search } from './../assets/images/navbar/index.js'

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
        <div></div>
    </div>
  )
}

export default Header