import { heart } from '../../assets/images/customization/items/index'
import avatar from '../../assets/images/navbar/userpick.png'
import { useEffect, useState } from 'react'
import close from '../../assets/images/quiz/close.png'
import inventory from '../../assets/images/quiz/inventory.png'
import { CiHeart } from 'react-icons/ci'
import { FaHeart } from "react-icons/fa";
import sershafox from '../../assets/images/quiz/sershafox.png'
import evilfox from '../../assets/images/attact/evilfox.png'
import dropPlace from '../../assets/images/quiz/dropPlace.png'
import { useDrag, useDrop } from 'react-dnd'

import './fillintheblank.css'
import HealthBar from '../../components/HealthBar'
import { useGlobalContext } from '../../context/context'

const FillInTheBlank = ({ currentQ }) => {
  const { currentQuestion, currentQuizz, setCurrentQuestion, heartsNum, setHeartsNum, correctAnswers, setCorrectAnswers } = useGlobalContext();
  const messages = [
    {
      avatar: avatar,
      name: 'Jess',
      message: 'Water freezes at # degrees Celsius.',
      answer: ["25", "0", "-15", "-35"],
    },
    {
      avatar: avatar,
      name: 'John',
      message: 'What iconic bridge connects the boroughs …',
      answer: ["Not too bad", "Pretty good, can't complain", "It was alright, nothing too exiciting", "Decent, just another day"],
    },
    {
      avatar: avatar,
      name: 'Nicky',
      message: 'What iconic bridge connects the boroughs …'
    },
    {
      avatar: avatar,
      name: 'Sam',
      message: 'What iconic bridge connects the boroughs …'
    },
  ]

  const [message, setMessage] = useState(`${messages[0].name}`);
  const [corAns, setCorAns] = useState('');
  const [dropped, setDropped] = useState();
  const fillInTheBlank = messages[0].message.split('#');

  useEffect(() => {
    currentQ.answers.map(q => {
      if (q.isCorrect == true) (
        setCorAns(q.text)
      );
    })

  }, [])


  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "answer",
    drop: () => ({ name: 'fill blank' }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    })
  }), []);

  console.log(currentQuizz.questions.length, currentQuestion, corAns, correctAnswers)


  if (dropped && currentQuizz.questions.length - 1 != currentQuestion) {
    if (dropped == corAns) {
      setCorrectAnswers(correctAnswers + 1);
    }
    if (dropped !== corAns) {
      setWrongAnswers(wrongAnswers + 1);
    }
    setCurrentQuestion(currentQuestion + 1)
  }

  let optionAnswer = currentQ.answers.map(item => item.text);
  console.log(currentQ)

  return (
    <div className='fillBlankQuizWrapper'>

      <div className='fillBlankQuizTitleWrapper'>

        <div className='fillBlankQuizTitle'>

          <div>
            <img src={close} alt="" />
            <h1>The battle has begun</h1>
          </div>

          <div className='healthResponsive'>
            <HealthBar />
          </div>
        </div>

        <div className='rightObenWrapper'>
          <div className='inventory'>
            <img src={inventory} alt="" />
          </div>

          <div className='hearts'>
            <div className='heartWrapper'>{heartsNum === 1 || heartsNum === 2 || heartsNum === 3 ? <FaHeart className='heartFull' /> : <CiHeart className='heart' />} </div>
            <div className='heartWrapper'>{heartsNum === 2 || heartsNum === 3 ? <FaHeart className='heartFull' /> : <CiHeart className='heart' />} </div>
            <div className='heartWrapper'>{heartsNum === 3 ? <FaHeart className='heartFull' /> : <CiHeart className='heart' />} </div>
          </div>

          <div className='sershaLogo'>
            <p>Sersha</p>
            <img src={sershafox} alt="" />
          </div>
        </div>

      </div>

      <div className='fillInTheBlankquizWrapper'>
        <div className='evilFoxWrapper'>
          <div className='health'>
            <HealthBar />
          </div>
          <div className='evilFox'>
            <img src={evilfox} alt="" />

            {/* <div className='tictac'>
              <img src={tictac} alt="" />
            </div> */}
          </div>
        </div>
        <div>

        </div>

        <div className='fillInBlankWrapper'>
          <h5>Fill in the Blank</h5>
          <div className='fillInAssignment'>
            {currentQ.statement1}{<div className={`${dropped ? 'droppedAnswer' : 'dropHereBox'}`} ref={drop}> {dropped ? `${dropped}` : <img src={dropPlace} alt='dropplace' />}</div>}{currentQ.statement2}
          </div>
          <h5>Answer options</h5>

          <div className='fillInBlankAnswerWrapper'>
            {optionAnswer.map((item, index) => {
              const [{ isDragging }, drag] = useDrag(() => ({
                type: "answer",
                item: { name: item },
                end: (item, monitor) => {
                  const dropResult = monitor.getDropResult();
                  if (item && dropResult) {
                    setDropped(item.name);
                  }
                },
                collect: (monitor) => ({
                  isDragging: !!monitor.isDragging(),
                })
              }), [item]);

              return (
                <div className='fillBlankOfferedAnswersWrapper' key={index}>
                  <p className='fillBlankOfferedAnswers' ref={drag}>{item}</p>
                </div>
              );
            })}

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

export default FillInTheBlank