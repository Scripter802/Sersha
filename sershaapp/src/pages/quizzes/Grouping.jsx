import React, { useEffect, useRef, useState } from 'react';
import { heart } from '../../assets/images/customization/items/index';
import avatar from '../../assets/images/navbar/userpick.png';
import close from '../../assets/images/quiz/close.png';
import done from '../../assets/images/quiz/done.png';
import inventory from '../../assets/images/quiz/inventory.png';
import { CiHeart } from 'react-icons/ci';
import { FaHeart } from "react-icons/fa";
import sershafox from '../../assets/images/quiz/sershafox.png';
import evilfox from '../../assets/images/attact/evilfox.png';
import dropPlace from '../../assets/images/quiz/dropPlace.png';
import { useDrag, useDrop } from 'react-dnd';

import './grouping.css';
import HealthBar from '../../components/HealthBar';
import { useGlobalContext } from '../../context/context';

const Grouping = ({ currentQ }) => {
  const { setShowPopup, currentQuestion, currentQuizz, setCurrentQuestion, heartsNum, setHeartsNum, correctAnswers, setCorrectAnswers } = useGlobalContext();
  const dropRefs = Array.from({ length: 6 }, () => useRef(null));
  console.log(currentQ)

  const messages = [
    {
      group: ['Fruits'],
      answers: ["Watermelon", "Strawberries", "Mango"],
    },
    {
      group: ['Vegetables'],
      answers: ["Pumpkin", "Mushroom", "Potato"],
    },
  ];

  const [droppedOne, setDroppedOne] = useState(new Array(currentQ.groups[0].groupingItems.length).fill("Drop here"));
  const [droppedTwo, setDroppedTwo] = useState(new Array(currentQ.groups[1].groupingItems.length).fill("Drop here"));
  const [optionAnswer, setOptionAnswer] = useState([]);

  useEffect(() => {
    const tempOptionAnswer = [];
    messages.forEach(item => item.answers.forEach(ans => tempOptionAnswer.push(ans)));
    setOptionAnswer(tempOptionAnswer);
  }, []);


  const handleDropOne = (index, item) => {
    const newDroppedOne = [...droppedOne];
    newDroppedOne[index] = item.name;
    setDroppedOne(newDroppedOne);
  };

  const handleDropTwo = (index, item) => {
    const newDroppedTwo = [...droppedTwo];
    newDroppedTwo[index] = item.name;
    setDroppedTwo(newDroppedTwo);
  };

  // const updateDropped = (currentIndex, draggedIndex) => {
  //   const newDropped = [...dropped];
  //   const draggedItem = newDropped[draggedIndex];
  //   newDropped[draggedIndex] = newDropped[currentIndex];
  //   console.log(newDropped)
  //   newDropped[currentIndex] = draggedItem;
  //   setDropped(newDropped);

  // };

  let items = []

  function areArraysEqual(arr1, arr2) {
    let res = true;
    arr1.forEach(el => {
      if (!arr2.includes(el)) {
        res = false;
      }
    })
    return res;
  }


  console.log(`CORRECT ANSWERS ${correctAnswers}`)
  if (currentQ?.groups && currentQuizz.questions.length != currentQuestion) {
    currentQ.groups[0].groupingItems.map(it => items.push(it.item))
    currentQ.groups[1].groupingItems.map(it => items.push(it.item))
  }


  const handleDone = (arr1, arr2) => {
    if (currentQ?.groups && currentQuizz.questions.length - 1 == currentQuestion) {
      setShowPopup(true)
    }

    // const dropped1 = [dropped[0], dropped[1], dropped[2]];
    // const dropped2 = [dropped[3], dropped[4], dropped[5]];

    let res = areArraysEqual(droppedOne, currentQ.groups[0].groupingItems) && areArraysEqual(droppedTwo, currentQ.groups[1].groupingItems);
    if (res == true) {
      setCorrectAnswers(correctAnswers + 1);
    }
    console.log(res)
    setCurrentQuestion(currentQuestion + 1)
  }


  return (
    <div className='GroupingQuizWrapper'>

      <div className='GroupingQuizTitleWrapper'>

        <div className='GroupingQuizTitle'>

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
            <div className='heartWrapper'>{heartsNum >= 1 ? <FaHeart className='heartFull' /> : <CiHeart className='heart' />}</div>
            <div className='heartWrapper'>{heartsNum >= 2 ? <FaHeart className='heartFull' /> : <CiHeart className='heart' />}</div>
            <div className='heartWrapper'>{heartsNum >= 3 ? <FaHeart className='heartFull' /> : <CiHeart className='heart' />}</div>
          </div>

          <div className='sershaLogo'>
            <p>Sersha</p>
            <img src={sershafox} alt="" />
          </div>
        </div>
      </div>

      <div className='GroupingquizWrapper'>
        <div className='evilFoxWrapper'>
          <div className='health'>
            <HealthBar />
          </div>
          <div className='evilFox'>
            <img src={evilfox} alt="" />
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
                {droppedOne.map((item, index) => {
                  return (
                    <DropBoxOne
                      key={index}
                      index={index}
                      handleDropOne={handleDropOne}
                      currentItem={item}
                    // updateDropped={updateDropped}
                    />
                  );
                })}
              </div>
              <div className='vegetableDropBoxes'>
                {droppedTwo.map((item, index) => {
                  return (
                    <DropBoxTwo
                      key={index}
                      index={index}
                      handleDropTwo={handleDropTwo}
                      currentItem={item}
                    // updateDropped={updateDropped}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <h5 className='words'>Words</h5>

          <div className='groupingOfferedAnswerWrapper'>
            {items.map((item, index) => (
              <DraggableItem key={index} item={item} index={index} droppedOne={droppedOne} droppedTwo={droppedTwo} />
            ))}
          </div>

          {droppedOne.includes("Drop here") && droppedTwo.includes("Drop here") ? '' : <div className='groupingFinished' onClick={() => handleDone()}><img src={done} alt="done" />I'm Done</div>}
        </div>
      </div>

      <div className='footer'>
        <small>© 2024 Kaza Swap LLC. All rights reserved.</small>
        <small className='madeWith'>Made with <img src={heart} alt="heart" /></small>
      </div>
    </div>
  );
};

const DraggableItem = ({ item, index, droppedOne, droppedTwo }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "answer",
    item: { name: item },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [item, index]);

  const isDropped = droppedOne.includes(item) || droppedTwo.includes(item)

  if (isDropped) {
    return (
      <div className='groupingOfferedAnswerDroppedWrapper' key={index}>
        <p className='groupingOfferedAnswerDropped' style={{ color: 'transparent', background: 'transparent', border: '1px dashed #FFB496', cursor: 'default' }}>{item}</p>
      </div>
    );
  }

  return (
    <div className='groupingOfferedAnswerDroppedWrapper' key={index}>
      {!isDragging && <p className='groupingOfferedAnswerDropped' ref={drag}>{item}</p>}
    </div>
  );
};

const DraggableDroppedItem = ({ item, index, onDragStart }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "droppedItem",
    item: { name: item, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [item, index]);

  return (
    <div className='droppedItem' ref={drag} onDragStart={onDragStart} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {item}
    </div>
  );
};

const DropBoxTwo = ({ index, handleDropTwo, currentItem, updateDropped }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["answer", "droppedItem"],
    drop: (item) => handleDropTwo(index, item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [index, handleDropTwo]);

  const onDragStart = (e) => {
    e.dataTransfer.setData("index", index);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e) => {
    const draggedIndex = e.dataTransfer.getData("index");

    if (index === draggedIndex) return

    updateDropped(index, draggedIndex);
  };

  return (
    <div ref={drop} className='dropBox' onDragOver={onDragOver} onDrop={onDrop} style={{ backgroundColor: currentItem !== "Drop here" ? '#C26F4D' : "", color: currentItem !== "Drop here" ? '#FFFFFF' : "#FFB496", border: currentItem !== "Drop here" ? "none" : "1px dashed #FFB496" }}>
      {currentItem !== "Drop here" && (
        <DraggableDroppedItem item={currentItem} index={index} onDragStart={onDragStart} />
      )}
      {currentItem === "Drop here" && <p>{currentItem}</p>}
    </div>
  );
}


const DropBoxOne = ({ index, handleDropOne, currentItem, updateDropped }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["answer", "droppedItem"],
    drop: (item) => handleDropOne(index, item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [index, handleDropOne]);




  const onDragStart = (e) => {
    e.dataTransfer.setData("index", index);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e) => {
    const draggedIndex = e.dataTransfer.getData("index");

    if (index === draggedIndex) return

    updateDropped(index, draggedIndex);
  };

  return (
    <div ref={drop} className='dropBox' onDragOver={onDragOver} onDrop={onDrop} style={{ backgroundColor: currentItem !== "Drop here" ? '#C26F4D' : "", color: currentItem !== "Drop here" ? '#FFFFFF' : "#FFB496", border: currentItem !== "Drop here" ? "none" : "1px dashed #FFB496" }}>
      {currentItem !== "Drop here" && (
        <DraggableDroppedItem item={currentItem} index={index} onDragStart={onDragStart} />
      )}
      {currentItem === "Drop here" && <p>{currentItem}</p>}
    </div>
  );
};



export default Grouping;
