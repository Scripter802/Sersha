import { useEffect, useState } from 'react'
import evilfoxhealth from '../assets/images/quiz/evilfoxhealth.png'
import { useGlobalContext } from '../context/context'
import './healthbar.css'


const HealthBar = () => {
  const { health, setHealth, currentQuizz, wrongAnswers, correctAnswers } = useGlobalContext();

  useEffect(() => {
    const foxHealth = () => {
      let fullHealth = 100;
      let oneQuestionPercent = currentQuizz?.questions?.length + correctAnswers > 0 ? fullHealth / currentQuizz?.questions?.length : 0;
      let lostPercentages = oneQuestionPercent * wrongAnswers;
      let healthUpdate = 100 - lostPercentages;
      setHealth(healthUpdate);

      console.log(oneQuestionPercent, lostPercentages, health, currentQuizz?.questions?.length, wrongAnswers);
    };

    if (currentQuizz?.questions?.length + correctAnswers > 0) {
      foxHealth();
    }
  }, [wrongAnswers]);

  return (
    <div className='healthBarWrapper'>
      <div className='healthBar'>
        <div className='healthBarEmpty' style={{ width: `100%`, opacity: '30%' }}></div>
        <div className='healthBarFill' style={{ width: `${health}%`, borderBottomRightRadius: `${health === 100 ? '20px' : '0'}`, borderTopRightRadius: `${health === 100 ? '20px' : '0'}` }}></div>
        <div className='separator' style={{ borderColor: `${health === 0 ? "#491514" : "0"}` }}></div>
        <div className='separatorTwo' style={{ borderColor: `${health === 0 || health === 20 ? "#491514" : "0"}` }}></div>
        <div className='separatorThree' style={{ borderColor: `${health === 0 || health === 20 || health === 40 ? "#491514" : "0"}` }}></div>
        <div className='separatorFour' style={{ borderColor: `${health === 0 || health === 20 || health === 40 || health === 60 ? "#491514" : "0"}` }}></div>
      </div>
      <div className='evilFoxHealth'><img src={evilfoxhealth} alt="" /></div>
    </div>
  )
}

export default HealthBar