import { useEffect, useRef, useState } from 'react';
import { heart } from '../../../assets/images/customization/items/index'
import close from '../../../assets/images/quiz/close.png'
import correctAnswer from '../../../assets/images/miniGames/correctAnswer.png'
import incorrectAnswer from '../../../assets/images/miniGames/incorrectAnswer.png'
import foxuserpick from '../../../assets/images/miniGames/foxuserpick.png'
import foxTought from '../../../assets/images/miniGames/foxTought.png'
import emojiOne from '../../../assets/images/miniGames/emojiEmotions/smajliOne.png'
import emojiTwo from '../../../assets/images/miniGames/emojiEmotions/smajliTwo.png'
import emojiThree from '../../../assets/images/miniGames/emojiEmotions/smajliThree.png'
import questionMark from '../../../assets/images/miniGames/emojiEmotions/questionmark.png'

import './emojiEmotions.css'


const EmojiEmotions = () => {
  const [seconds, setSeconds] = useState(25);
  const [correctAnswered, setCorrectAnswered] = useState(0);
  const [incorrectAnswered, setIncorrectAnswered] = useState(0);
  const [emojis, setEmojis] = useState([emojiOne, emojiTwo, emojiThree, emojiOne, emojiTwo, emojiThree])
  const [passedEmojis, setPassedEmojis] = useState([]);
  const [emojisAnswers, setEmojisAnswers] = useState(['Sad', '“You look cute!”', 'Happy'])
  const [rightAnswer, setRightAnswer] = useState(['Happy', 'Sad', '“You look cute!”', 'Sad', 'Happy'])
  const [activeEmojiIndex, setActiveEmojiIndex] = useState()
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

const handleAnswerSubmission = (index) => {
  if (emojis.length > 1) {
    setTotalAnswered((prev) => prev + 1);
    setTotalAnswered((prev) => prev);
    // Get the chosen answer
    const chosenAnswer = emojisAnswers[index];
    
    const correctAnswer = rightAnswer[totalAnswered]

    // Compare the chosen answer with the correct answer
    if (chosenAnswer === correctAnswer) {
      // If the chosen answer is correct, increment the correctAnswered state
      setCorrectAnswered(prevCorrect => prevCorrect + 1);
    } else {
      // If the chosen answer is incorrect, increment the incorrectAnswered state
      setIncorrectAnswered(prevIncorrect => prevIncorrect + 1);
    }

    
    
    if(passedEmojis.length === 0) {
    setPassedEmojis([emojis[0]])
    }

    if(passedEmojis.length === 1) {
    setPassedEmojis(prev => [...prev, emojis[1]])
    }
    
    if(passedEmojis.length > 1 && emojis.length > 2) {
    setPassedEmojis(prev => [...prev, emojis[1]])
  }
    
    setPassedEmojis(prev => prev)
    console.log(passedEmojis)
    console.log(totalAnswered)
    // Move emojis to the left
    setEmojis(prevEmojis => prevEmojis.slice(1));
    console.log(emojis)
  }
}

  return (
    <div className='emojiEmotionsWrapper'>
      
      <div className='emojiEmotionsTitleWrapper'>

        <div className='emojiEmotionsTitle'>
          <img src={close} alt="" />
          <h1>Emoji Emotions</h1>
        </div>

        <div className='emojiEmotionsAnswersNumber'>
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

      <div className='emojiEmotionsGameWrapper'>
        <div className='emojiEmotionsGameContainer'>

          <div className='emojiEmotionsLeftSideContent'>
              <div className='gameResult'>
                <div className='correctAnswered'><img src={correctAnswer} alt="correctAnswer" />{`${correctAnswered} correct`} </div>
                <div className='incorrectAnswered'><img src={incorrectAnswer} alt="incorrectAnswer" />{`${incorrectAnswered} mistake`}</div>
              </div>
              <div className='gameDescription'>Which emojis match the correct emotions or situations.</div>
          </div>

          <div className='emojiEmotionsMiddleContent'>
          <div className='emojiGameCard'>
  {/* Display emojis in positions 3, 4, and 5 */}
  <div className='emojiWrap'>
    {totalAnswered < 2 ? <img src={questionMark} alt='hidden emoji' /> : <img src={passedEmojis && passedEmojis[passedEmojis.length - 2]} alt='emojis' />}
  </div>
  <div className='emojiWrap'>
    {totalAnswered === 0 ? <img src={questionMark} alt='hidden emoji' /> : totalAnswered === 1 ? <img src={passedEmojis[0]} alt='emojis' /> : <img src={passedEmojis[passedEmojis.length - 1]} alt='emojis' />}
  </div>
  <div className='emojiWrap'>
    {emojis.length === 2 && <img src={emojis[1]} alt='emojis' />}
    {emojis.length === 1 && <img src={emojis[0]} alt='emojis' />}
    {emojis.length > 2 && totalAnswered === 0 ? <img src={emojis[0]} alt='emojis' /> : emojis.length > 2 && totalAnswered === 1 ? <img src={emojis[1]} alt='emojis' /> : emojis.length > 2 && <img src={emojis[2]} alt='emojis' /> }
  </div>

  {/* Show a question mark for positions 1 and 2 */}
  <div className='emojiHidden'>
    <img src={questionMark} alt='hidden emoji' />
  </div>
  <div className='emojiHidden'>
    <img src={questionMark} alt='hidden emoji' />
  </div>
</div>

            <div className='emojiEmotionsOptionAnswers'>
              {emojisAnswers.map((ans, index) => (
                <div onClick={() => handleAnswerSubmission(index)}>{ans}</div>
              ))}
            </div>
          </div>

          <div className='emojiEmotionsRightSideContent'>
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

export default EmojiEmotions