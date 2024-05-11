import { useEffect, useRef, useState } from 'react';
import { heart } from '../../../assets/images/customization/items/index'
import close from '../../../assets/images/quiz/close.png'
import correctAnswer from '../../../assets/images/miniGames/correctAnswer.png'
import incorrectAnswer from '../../../assets/images/miniGames/incorrectAnswer.png'
import snapjudgmentpostphoto from '../../../assets/images/miniGames/snapJudgment/snapjudgmentpostphoto.png'
import neutral from '../../../assets/images/miniGames/snapJudgment/neutral.png'
import unlike from '../../../assets/images/miniGames/snapJudgment/unlike.png'
import like from '../../../assets/images/miniGames/snapJudgment/like.png'
import foxuserpick from '../../../assets/images/miniGames/foxuserpick.png'
import foxTought from '../../../assets/images/miniGames/foxTought.png'

import './snapJudgment.css'

const SnapJudgment = () => {
  const [seconds, setSeconds] = useState(25);
  const [correctAnswered, setCorrectAnswered] = useState(0);
  const [incorrectAnswered, setIncorrectAnswered] = useState(0);

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

  return (
    <div className='snapJudgmentGameWrapper'>
      
      <div className='snapJudgmentTitleWrapper'>

        <div className='snapJudgmentTitle'>
          <img src={close} alt="" />
          <h1>Snap Judgment</h1>
        </div>

        <div className='snapAnswersNumber'>
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

      <div className='snapGameWrapper'>
        <div className='snapGameContainer'>

          <div className='snapLeftSideContent'>
              <div className='gameResult'>
                <div className='correctAnswered'><img src={correctAnswer} alt="correctAnswer" />{`${correctAnswered} correct`} </div>
                <div className='incorrectAnswered'><img src={incorrectAnswer} alt="incorrectAnswer" />{`${incorrectAnswered} mistake`}</div>
              </div>
              <div className='gameDescription'>Decide whether this post is positive, negative, or neutral</div>
          </div>

          <div className='snapMiddleContent'>
            <div className='snapGameCard'>
              <img className='snapProfilePhoto' src={snapjudgmentpostphoto} alt="snapProfilePhoto" />
              <p className='snapProfileName'>Olivia</p>
              <p className='snapPostText'>I’m hate teachers!!!</p>
            </div>
            <div className='snapOptionAnswers'>
              <img src={unlike} alt="unlike" />
              <img className='neutralAnswer' src={neutral} alt="neutral" />
              <img src={like} alt="like" />
            </div>
          </div>

          <div className='snapRightSideContent'>
            <div className='foxWrap'><p className='foxTextTought'>You’re awesome!</p><img className='foxTought' src={foxTought} alt="foxtought" /><img className='foxUserPick' src={foxuserpick} alt="foxuserpick" /></div>
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

export default SnapJudgment