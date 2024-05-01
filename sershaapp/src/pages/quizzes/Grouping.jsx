import React, { useEffect, useRef, useState } from 'react';
import { heart } from '../../assets/images/customization/items/index';
import avatar from '../../assets/images/navbar/userpick.png';
import close from '../../assets/images/quiz/close.png';
import inventory from '../../assets/images/quiz/inventory.png';
import { CiHeart } from 'react-icons/ci';
import { FaHeart } from "react-icons/fa";
import sershafox from '../../assets/images/quiz/sershafox.png';
import evilfox from '../../assets/images/attact/evilfox.png';
import dropPlace from '../../assets/images/quiz/dropPlace.png';
import { useDrag, useDrop } from 'react-dnd';

import './grouping.css';
import HealthBar from '../../components/HealthBar';

const Grouping = () => {
  const dropRefs = Array.from({ length: 6 }, () => useRef(null));

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

  const [heartsNum, setHeartsNum] = useState(2);
  const [dropped, setDropped] = useState(["Drop here", "Drop here", "Drop here", "Drop here", "Drop here", "Drop here"]);
  const [optionAnswer, setOptionAnswer] = useState([]);
  
  useEffect(() => {
    const tempOptionAnswer = [];
    messages.forEach(item => item.answers.forEach(ans => tempOptionAnswer.push(ans)));
    setOptionAnswer(tempOptionAnswer);
  }, []);
  

  const handleDrop = (index, item) => {
    const newDropped = [...dropped];
    newDropped[index] = item.name;
    setDropped(newDropped);

  };

  const updateDropped = (currentIndex, draggedIndex) => {
    const newDropped = [...dropped];
    const draggedItem = newDropped[draggedIndex];
    newDropped[draggedIndex] = newDropped[currentIndex];
    console.log(newDropped)
    newDropped[currentIndex] = draggedItem;
    setDropped(newDropped);
  };

  return (
    <div className='rightAnswerQuizWrapper'>
      <div className='rightAnswerTitleWrapper'>
        <div className='rightAnswerTitle'>
          <img src={close} alt="" />
          <h1>The battle has begun</h1>
        </div>
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

      <div className='quizWrapper'>
        <div className='evilFoxWrapper'>
          <div className='health'>
            <HealthBar />
          </div>
          <div className='evilFox'>
            <img src={evilfox} alt="" />
          </div>
        </div>

        <div className='msgPreview'>
          <h5>Place the words into the appropriate groups</h5>
          <div className='receivedMsgWrapper'>
            <div className='receivedMsg'>
              {dropped.map((item, index) => (
                <DropBox key={index} index={index} handleDrop={handleDrop} currentItem={item} updateDropped={updateDropped} />
              ))}
            </div>
          </div>

          <h5>Words</h5>

          <div className='answerWrapper'>
            {optionAnswer.map((item, index) => (
              <DraggableItem key={index} item={item} index={index} dropped={dropped} />
            ))}
          </div>

          {dropped.includes("Drop here") ? '' : <div className='groupingFinished'>I'm Done</div>}
        </div>
      </div>

      <div className='footer'>
        <small>© 2024 Kaza Swap LLC. All rights reserved.</small>
        <small className='madeWith'>Made with <img src={heart} alt="heart" /></small>
      </div>
    </div>
  );
};

const DraggableItem = ({ item, index, dropped }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "answer",
    item: { name: item },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [item, index]);

  const isDropped = dropped.includes(item);

  if (isDropped) {
    return (
      <div className='possibleAnsWrapper' key={index}>
        <p className='possibleAnswers' style={{ color: 'transparent', background: 'transparent', border: '1px dashed #FFB496', cursor: 'default' }}>{item}</p>
      </div>
    );
  }

  return (
    <div className='possibleAnsWrapper' key={index}>
      {!isDragging && <p className='possibleAnswers' ref={drag}>{item}</p>}
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

const DropBox = ({ index, handleDrop, currentItem, updateDropped }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["answer", "droppedItem"],
    drop: (item) => handleDrop(index, item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [index, handleDrop]);

  const onDragStart = (e) => {
    e.dataTransfer.setData("index", index);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e) => {
    const draggedIndex = e.dataTransfer.getData("index");

    if(index === draggedIndex) return
    
    updateDropped(index, draggedIndex);
  };

  return (
    <div ref={drop} className='dropBox' onDragOver={onDragOver} onDrop={onDrop}>
      {currentItem !== "Drop here" && (
        <DraggableDroppedItem item={currentItem} index={index} onDragStart={onDragStart} />
      )}
      {currentItem === "Drop here" && <p>{currentItem}</p>}
    </div>
  );
};

export default Grouping;
