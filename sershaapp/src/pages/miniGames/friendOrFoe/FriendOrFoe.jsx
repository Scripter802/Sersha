import { useEffect, useRef, useState } from 'react';
import { heart } from '../../../assets/images/customization/items/index'
import close from '../../../assets/images/quiz/close.png'
import correctAnswer from '../../../assets/images/miniGames/correctAnswer.png'
import incorrectAnswer from '../../../assets/images/miniGames/incorrectAnswer.png'
import foxuserpick from '../../../assets/images/miniGames/foxuserpick.png'
import foxTought from '../../../assets/images/miniGames/foxTought.png'
import accept from '../../../assets/images/miniGames/friendOrFoe/accept.png'
import decline from '../../../assets/images/miniGames/friendOrFoe/decline.png'
import avatar from '../../../assets/images/miniGames/friendOrFoe/userpick.png'
import gamePhoto from '../../../assets/images/miniGames/friendOrFoe/photo.png'

import './friendOrFoe.css'

const FriendOrFoe = () => {
  const [seconds, setSeconds] = useState(25);
  const [correctAnswered, setCorrectAnswered] = useState(0);
  const [incorrectAnswered, setIncorrectAnswered] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0)

  const intervalIdRef = useRef(null);

useEffect(() => {
  intervalIdRef.current = setInterval(() => {
    setSeconds(prevSeconds => prevSeconds - 1);
  }, 1000);

  return () => clearInterval(intervalIdRef.current);
}, []);

useEffect(() => {
  if (seconds === 0) {
    clearInterval(intervalIdRef.current);
  }
}, [seconds]);

const handleAnswerSubmission = () => {

}

  return (
    <div className='friendOrFoeWrapper'>
      
      <div className='friendOrFoeTitleWrapper'>

        <div className='friendOrFoeTitle'>
          <img src={close} alt="" />
          <h1>Friend or Foe</h1>
        </div>

        <div className='friendOrFoeAnswersNumber'>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
          <div>9</div>
          <div>10</div>
        </div>

      </div>

      <div className='friendOrFoeGameWrapper'>
        <div className='friendOrFoeGameContainer'>

          <div className='friendOrFoeLeftSideContent'>
              <div className='gameResult'>
                <div className='correctAnswered'><img src={correctAnswer} alt="correctAnswer" />{`${correctAnswered} correct`} </div>
                <div className='incorrectAnswered'><img src={incorrectAnswer} alt="incorrectAnswer" />{`${incorrectAnswered} mistake`}</div>
              </div>
              <div className='gameDescription'>You have to decide whether to add as friends or not.</div>
          </div>

          <div className='friendOrFoeMiddleContent'>
            <div className='friendOrFoeGameCard'>
              <div className='messageGameCard'>
                <img src={avatar} alt="userpic" />
                <div>
                    <p className='messageName'>Andrew</p>
                    <p className='messageText'>Constantly seeking inspiration and growth. Let's connect and explore together!</p>
                </div>
              </div>
              <img src={gamePhoto} alt='gamephoto' />
            </div>

            <div className='friendOrFoeOptionAnswers'>
            <button className='friendOrFoeDeclineButton'><img src={decline} alt="declineButton" /> Decline</button>
            <button className='friendOrFoeAcceptButton'><img src={accept} alt="acceptButton" /> Accept</button>
            </div>
          </div>

          <div className='friendOrFoeRightSideContent'>
            <div className='foxWrap'><p className='foxTextTought'>Multi kill! Awesome!</p><img className='foxTought' src={foxTought} alt="foxtought" /><img className='foxUserPick' src={foxuserpick} alt="foxuserpick" /></div>
            <div className='gameTimerWrapper'> 
                <div className='gameTimeCirkle'></div>
                <p className='gamePad'>{seconds}</p>
            </div>
          </div>

        </div>
      </div>

      <div className='footer'>
        <small>© 2024 Kaza Swap LLC. All rights reserved.</small>
        <small className='madeWith'>Made with <img src={heart} alt="heart" /></small>
      </div>
      
    </div>
  )
}

export default FriendOrFoe