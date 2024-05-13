import { heart } from '../../assets/images/customization/items/index'
import avatar from '../../assets/images/navbar/userpick.png'
import { useState } from 'react'
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

const FillInTheBlank = () => {
  const messages = [
    {
      avatar: avatar,
      name: 'Jess',
      message: 'Water freezes at # degrees Celsius.',
      answer: ["25", "0", "-15", "-35" ],
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
  
  const [ heartsNum, setHeartsNum ] = useState(2)
  const [message, setMessage] = useState(`${messages[0].name}`);
  const [dropped, setDropped] = useState();
  const fillInTheBlank = messages[0].message.split('#');

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "answer",
    drop: () => ({ name: 'fill blank'}),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    })
  }), []);

  let optionAnswer = messages[0].answer.map(item => item);
  

  return (
    <div className='fillBlankQuizWrapper'>
      
      <div className='fillBlankQuizTitleWrapper'>

        <div className='fillBlankQuizTitle'>
          <img src={close} alt="" />
          <h1>The battle has begun</h1>
        </div>

        <div className='inventory'>
          <img src={inventory} alt="" />
        </div>

        <div className='hearts'>
          <div className='heartWrapper'>{heartsNum === 1 || heartsNum === 2 || heartsNum === 3 ? <FaHeart className='heartFull' />  : <CiHeart className='heart' />} </div>
          <div className='heartWrapper'>{heartsNum === 2 || heartsNum === 3 ? <FaHeart className='heartFull' />  : <CiHeart className='heart' />} </div>
          <div className='heartWrapper'>{heartsNum === 3 ? <FaHeart className='heartFull' />  : <CiHeart className='heart' />} </div>
        </div>

        <div className='sershaLogo'>
          <p>Sersha</p>
          <img src={sershafox} alt="" />
        </div>
      </div>

      <div className='quizWrapper'>
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
            {fillInTheBlank[0]}{<div ref={drop}> {dropped ? `${dropped}` : <img src={dropPlace} alt='dropplace' />}</div>}{fillInTheBlank[1]}
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
                alert(`You threw ${item.name} into ${dropResult.name} `)
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