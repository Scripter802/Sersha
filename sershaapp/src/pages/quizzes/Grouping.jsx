import React, { useEffect, useState } from 'react';
import { heart } from '../../assets/images/customization/items/index';
import avatar from '../../assets/images/navbar/userpick.png';
import close from '../../assets/images/quiz/close.png';
import done from '../../assets/images/quiz/done.png';
import inventory from '../../assets/images/quiz/inventory.png';
import { CiHeart } from 'react-icons/ci';
import { FaHeart } from "react-icons/fa";
import sershafox from '../../assets/images/quiz/sershafox.png';
import evilfox from '../../assets/images/attact/evilfox.png';
import './grouping.css';
import HealthBar from '../../components/HealthBar';
import { useGlobalContext } from '../../context/context';

const Grouping = ({ currentQ, isInventoryQuiz, setIsInventoryQuiz }) => {
  const { setShowPopup, currentQuestion, currentQuizz, setCurrentQuestion, heartsNum, setHeartsNum, correctAnswers, setCorrectAnswers, wrongAnswers, setWrongAnswers,
    isShield, setIsShield,
    isCorrectAnswer, setIsCorrectAnswer,
    isCoinMultiplier, setIsCoinMultiplier, } = useGlobalContext();
  const [droppedOne, setDroppedOne] = useState([]);
  const [droppedTwo, setDroppedTwo] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [optionAnswer, setOptionAnswer] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const correctGroup1 = currentQ.groups[0].groupingItems.map(item => item.item);
  const correctGroup2 = currentQ.groups[1].groupingItems.map(item => item.item);

  useEffect(() => {
    setDroppedOne(new Array(currentQ.groups[0].groupingItems.length).fill(null));
    setDroppedTwo(new Array(currentQ.groups[1].groupingItems.length).fill(null));
  }, [currentQ]);

  useEffect(() => {
    const tempOptionAnswer = [];
    currentQ.groups.forEach(group => group.groupingItems.forEach(item => tempOptionAnswer.push(item.item)));
    setOptionAnswer(tempOptionAnswer);
  }, [currentQ]);

  const handleSelectAnswer = (item) => {
    setSelectedAnswer(item);
  };

  const handleDrop = (index, group) => {
    if (selectedAnswer) {
      let oldAnswer = null;

      if (group === 'one') {
        oldAnswer = droppedOne[index];
        const newDroppedOne = [...droppedOne];
        newDroppedOne[index] = selectedAnswer;
        setDroppedOne(newDroppedOne);
      } else if (group === 'two') {
        oldAnswer = droppedTwo[index];
        const newDroppedTwo = [...droppedTwo];
        newDroppedTwo[index] = selectedAnswer;
        setDroppedTwo(newDroppedTwo);
      }

      if (oldAnswer) {
        setOptionAnswer(prevOptionAnswer => [...prevOptionAnswer, oldAnswer]);
      }

      setOptionAnswer(prevOptionAnswer => prevOptionAnswer.filter(answer => answer !== selectedAnswer));

      setSelectedAnswer(null);
    } else {
      if (group === 'one' && droppedOne[index]) {
        const itemToRemove = droppedOne[index];
        const newDroppedOne = [...droppedOne];
        newDroppedOne[index] = null;
        setDroppedOne(newDroppedOne);
        setOptionAnswer(prevOptionAnswer => [...prevOptionAnswer, itemToRemove]);
      } else if (group === 'two' && droppedTwo[index]) {
        const itemToRemove = droppedTwo[index];
        const newDroppedTwo = [...droppedTwo];
        newDroppedTwo[index] = null;
        setDroppedTwo(newDroppedTwo);
        setOptionAnswer(prevOptionAnswer => [...prevOptionAnswer, itemToRemove]);
      }
    }
  };

  const areArraysEqual = (arr1, arr2) => arr1.every(item => arr2.includes(item));

  if (heartsNum === 0) {
    setShowPopup(true);
  }

  const handleCheck = () => {
    if (currentQ?.groups && currentQuizz.questions.length - 1 === currentQuestion) {
      setShowPopup(true);
    }


    const res = areArraysEqual(droppedOne, correctGroup1) && areArraysEqual(droppedTwo, correctGroup2);

    const correctSound = new Audio('/music/SFX/FightRogueFox/rightanswer.mp3');
    const incorrectSound = new Audio('/music/SFX/FightRogueFox/IncorrectAnswer.mp3');

    if (res) {
      setCorrectAnswers(prev => prev + 1);
      setFeedback({ type: 'correct', message: 'Correct Answer!' });
      correctSound.play();
    } else {
      setWrongAnswers(prev => prev + 1);
      if (!isShield) {
        setHeartsNum((prev) => prev - 1);
      }
      setFeedback({ type: 'wrong', message: 'Wrong Answer!' });
      incorrectSound.play();
    }

    setShowNextButton(true);
  };

  useEffect(() => {
    if (isCorrectAnswer) {
      setDroppedOne(correctGroup1);
      setDroppedTwo(correctGroup2);
    }

  }, [isCorrectAnswer])

  const handleNext = () => {
    setSelectedAnswer(null);
    setFeedback(null);
    setIsCorrectAnswer(false);
    setIsShield(false);
    setShowNextButton(false);
    setCurrentQuestion(prev => prev + 1);
  }

  return (
    <div className='GroupingQuizWrapper'>
      <div className='GroupingQuizTitleWrapper'>
        <div className='GroupingQuizTitle'>
          <div>
            <img src={close} alt="Close" />
            <h1>The battle has begun</h1>
          </div>
          <div className='healthResponsive'>
            <HealthBar />
          </div>
        </div>
        <div className='rightObenWrapper'>
          <div className='inventoryQuizz'>
            <img src={inventory} alt='inventory' onClick={() => setIsInventoryQuiz(true)} />
          </div>
          <div className='hearts'>
            {[...Array(3)].map((_, i) => (
              <div key={i} className='heartWrapper'>
                {heartsNum > i ? <FaHeart className='heartFull' /> : <CiHeart className='heart' />}
              </div>
            ))}
          </div>
          <div className='sershaLogo'>
            <p>Sersha</p>
            <img src={sershafox} alt="Sersha" />
          </div>
        </div>
      </div>

      <div className='GroupingquizWrapper'>
        <div className='evilFoxWrapper'>
          <div className='health'>
            <HealthBar />
          </div>
          <div className='evilFox'>
            <img src={evilfox} alt="Evil Fox" />
          </div>
        </div>

        <div className='groupingWrapper'>
          <h5 className='groupingAsignmentTitle'>Place the words into the appropriate groups</h5>
          <div className='groupingDropBoxesWrapper'>
            <div className='groupingDropBoxesTitles'>
              <h5>{currentQ.groups[0].name}</h5>
              <h5>{currentQ.groups[1].name}</h5>
            </div>
            <div className='groupingDropBoxes'>
              <div className='fruitDropBoxes'>
                {droppedOne?.map((item, index) => (
                  <DropBox
                    key={index}
                    index={index}
                    currentItem={item}
                    handleDrop={handleDrop}
                    group="one"
                  />
                ))}
              </div>
              <div className='vegetableDropBoxes'>
                {droppedTwo?.map((item, index) => (
                  <DropBox
                    key={index}
                    index={index}
                    currentItem={item}
                    handleDrop={handleDrop}
                    group="two"
                  />
                ))}
              </div>
            </div>
          </div>

          <h5 className='words'>Words</h5>
          <div className='groupingOfferedAnswerWrapper'>
            {optionAnswer.map((item, index) => (
              <div
                key={index}
                className={`groupingOfferedAnswerDroppedWrapper ${selectedAnswer === item ? 'selected' : ''}`}
                onClick={() => handleSelectAnswer(item)}
              >
                <p className='groupingOfferedAnswerDropped'>{item}</p>
              </div>
            ))}
          </div>

          {(droppedOne.includes(null) || droppedTwo.includes(null)) || (
            <div className='groupingFinished' onClick={showNextButton ? handleNext : handleCheck}>
              {showNextButton ? 'Next' : 'Check'}
            </div>
          )}
          {feedback && (
            <div className={`feedback ${feedback.type}`}>
              <p>{feedback.message}</p>
            </div>
          )}
        </div>
      </div >

      <div className='footer'>
        <small>© 2024 Kaza Swap LLC. All rights reserved.</small>
        <small className='madeWith'>Made with <img src={heart} alt="heart" /></small>
      </div>
    </div >
  );
};

const DropBox = ({ index, currentItem, handleDrop, group }) => {
  return (
    <div
      className='dropBox'
      onClick={() => handleDrop(index, group)}
      style={{ backgroundColor: currentItem ? '#C26F4D' : '', color: currentItem ? '#FFFFFF' : "#FFB496", border: currentItem ? "none" : "1px dashed #FFB496" }}
    >
      <p>{currentItem ? currentItem : index + 1}</p>
    </div>
  );
};

export default Grouping;
