import { heart } from '../../assets/images/customization/items/index.js'
import done from '../../assets/images/miniGames/done.png'
import game from '../../assets/images/miniGames/game.png'
import emojiEmotions from '../../assets/images/miniGames/emojiEmotions.png'
import friendOrFoe from '../../assets/images/miniGames/friendOrFoe.png'
import postingChallenge from '../../assets/images/miniGames/postingChallenge.png'
import snapJudgment from '../../assets/images/miniGames/snapJudgment.png'
import emojiEmotionsRes from '../../assets/images/miniGames/emojiEmotionsResponsive.png'
import friendOrFoeRes from '../../assets/images/miniGames/friendOrFoeResponsive.png'
import postingChallengeRes from '../../assets/images/miniGames/postingChallengeResponsive.png'
import snapJudgmentRes from '../../assets/images/miniGames/snapJudgmentResponsive.png'

import './minigames.css'
import HeaderResponsive from '../../components/HeaderResponsive/HeaderResponsive.jsx'

const MiniGames = () => {
  return (
    <div className='mainWrapper'>
      <div className='headerContainer'>
        {window.innerWidth < 1000 && <HeaderResponsive />}
      </div>
      <div className='miniGamesWrapper'>
        <div className='contentWrapper'>
          <div className='gameContent'>
            <img src={game} alt="" />
            <h1>Mini Games</h1>
            <p>You must play three games of three rounds each</p>
            <button className='startGameButton'><img src={done} alt="done" /> Start</button>
          </div>
          {window.innerWidth >= 1000 ? (
            <div className='roundImagesWrapper'>
              <div className='overflow-wrap'>
                <div className='top-left'><img src={snapJudgment} alt="snapJudgment" /></div>
                <div className='top-right'><img src={emojiEmotions} alt="emojiEmotions" /></div>
                <div className='bottom-left'><img src={postingChallenge} alt="postingChallenge" /></div>
                <div className='bottom-right'><img src={friendOrFoe} alt="friendOrFoe" /></div>
              </div>
            </div>
          ) : (
            <div className='roundImagesWrapper'>
              <div className='overflow-wrap'>
                <div className='top-left'><img src={snapJudgmentRes} alt="snapJudgmentResponsive" /></div>
                <div className='top-right'><img src={emojiEmotionsRes} alt="emojiEmotionsResponsive" /></div>
                <div className='bottom-left'><img src={postingChallengeRes} alt="postingChallengeResponsive" /></div>
                <div className='bottom-right'><img src={friendOrFoeRes} alt="friendOrFoeResponsive" /></div>
              </div>
            </div>
          )
          }
        </div>


        <div className='footerGames'>
          <small>© 2024 Kaza Swap LLC. All rights reserved.</small>
          <small className='gamesMadeWith'>Made with <img src={heart} alt="heart" /></small>
        </div>

        <div className='rectanglesWrapper'>
          <div className='rectangle'></div>
          <div className='rectangle-1'></div>
          <div className='rectangle-2'></div>
          <div className='rectangle-3'></div>
        </div>
      </div>

    </div>
  )
}

export default MiniGames