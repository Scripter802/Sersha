import { useEffect, useRef, useState } from 'react';
import evilfox from '../assets/images/attact/evilfox.png'
import './popup.css'
import evilfoxBg from '../assets/images/attact/backgroundAttack.png'
import { useNavigate } from 'react-router-dom';

const Popup = () => {
  const [seconds, setSeconds] = useState(3);
  const intervalIdRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(intervalIdRef.current);
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      clearInterval(intervalIdRef.current);
      navigate('/quiz')
    }
  }, [seconds]);


  return (
    <div className='popupBackground'>
      <div className='popupWrapper'>
        <img src={evilfox} alt="evilfox" />
        <h1>Rogue Fox is attacking!</h1>
        <p>Prepare to defend against attacks.</p>
        <div className='timerWrapper'>
          <div className='cirkle'></div>
          <p className='pad'>{seconds}</p>
        </div>
      </div>
      <img src={evilfoxBg} alt="evilfoxBg" />
    </div>
  )
}

export default Popup