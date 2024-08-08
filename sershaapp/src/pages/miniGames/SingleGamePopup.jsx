import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/context';



const SingleGamePopup = ({ title, subtitle, description, conclusion, navigate, url, onClose }) => {


  return (
    <div className="singleGame-popup">
      <div className="singleGame-popup-content">
        <h2>{title}</h2>
        <p>{subtitle}</p>
        <p>{description}</p>
        <p>{conclusion}</p>


        <div className="buttons">
          <button id='miniGamesgoBack-button' onClick={onClose}>Go Back</button>
          <button id='playMiniGames-button' onClick={() => navigate(url)}>Play</button>
        </div>
      </div>
    </div >
  );
};

export default SingleGamePopup;
