import { heart } from '../../assets/images/customization/items/index.js'
import done from '../../assets/images/miniGames/done.png'
import game from '../../assets/images/miniGames/game.png'
import emojiEmotions from '../../assets/images/miniGames/emojiEmotions.png'
import friendOrFoe from '../../assets/images/miniGames/friendOrFoe.png'
import postingChallenge from '../../assets/images/miniGames/postingChallenge.png'
import snapJudgment from '../../assets/images/miniGames/snapJudgment.png'

import './minigames.css'

const MiniGames = () => {
  return (
    <div className='miniGamesWrapper'>
      <div className='contentWrapper'>
        <div className='gameContent'>
          <img src={game} alt="" />
          <h1>Mini Games</h1>
          <p>You must play three games of three rounds each</p>
          <button className='startGameButton'><img src={done} alt="done" /> Start</button>
        </div>
        <div className='top-left'><img src={snapJudgment} alt="snapJudgment" /></div>
        <div className='top-right'><img src={emojiEmotions} alt="emojiEmotions" /></div>
        <div className='bottom-left'><img src={postingChallenge} alt="postingChallenge" /></div>
        <div className='bottom-right'><img src={friendOrFoe} alt="friendOrFoe" /></div>
      </div>
      

      <div className='footerGames'>
        <small>© 2024 Kaza Swap LLC. All rights reserved.</small>
        <small className='madeWith'>Made with <img src={heart} alt="heart" /></small>
      </div>

      <div className='rectangle'></div>
      <div className='rectangle-1'></div>
      <div className='rectangle-2'></div>
      <div className='rectangle-3'></div>
    </div>
  )
}

export default MiniGames