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
import gamePhoto from '../../../assets/images/miniGames/postingChallenge/photo.png'

import './postingChallenge.css'

const PostingChallenge = () => {
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
    <div className='postingChallengeWrapper'>
      
      <div className='postingChallengeTitleWrapper'>

        <div className='postingChallengeTitle'>
          <img src={close} alt="" />
          <h1>Posting Challenge</h1>
        </div>

        <div className='postingChallengeAnswersNumber'>
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

      <div className='postingChallengeGameWrapper'>
        <div className='postingChallengeGameContainer'>

          <div className='postingChallengeLeftSideContent'>
              <div className='gameResult'>
                <div className='correctAnswered'><img src={correctAnswer} alt="correctAnswer" />{`${correctAnswered} correct`} </div>
                <div className='incorrectAnswered'><img src={incorrectAnswer} alt="incorrectAnswer" />{`${incorrectAnswered} mistake`}</div>
              </div>
              <div className='gameDescription'>Decide what kind of content you need to post.</div>
          </div>

          <div className='postingChallengeMiddleContent'>
            <div className='postingGameCard'>
              <img className='postingProfilePhoto' src={gamePhoto} alt="snapProfilePhoto" />
              <div className='postingProfileInfo'>
                <p className='postingProfileName'>Andrew</p>
                <p className='postingPostText'>My best friend</p>
              </div>
            </div>

            <div className='postingChallengeOptionAnswers'>
              <button className='postingChallengeDeclineButton'><img src={decline} alt="declineButton" /> Don’t post</button>
              <button className='postingChallengeAcceptButton'><img src={accept} alt="acceptButton" /> Post</button>
            </div>
          </div>

          <div className='postingChallengeRightSideContent'>
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

export default PostingChallenge