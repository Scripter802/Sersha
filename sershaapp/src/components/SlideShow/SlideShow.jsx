import React, { useState, useEffect } from 'react';
import digitalCompassClue from '../../assets/images/slideshow/easyBundle//Clues/GIFS/LevelDigitalCompass.gif'
import gif1 from '../../assets/images/slideshow/easyBundle/Narrative/2.gif'
import gif2 from '../../assets/images/slideshow/easyBundle/Narrative/3.gif'
import gif3 from '../../assets/images/slideshow/easyBundle/Narrative/4.gif'
import gif4 from '../../assets/images/slideshow/easyBundle/Narrative/5.gif'
import gif5 from '../../assets/images/slideshow/easyBundle/Narrative/6.gif'
import gif6 from '../../assets/images/slideshow/easyBundle/Narrative/7.gif'
import gif7 from '../../assets/images/slideshow/easyBundle/Narrative/8.gif'
import gif8 from '../../assets/images/slideshow/easyBundle/Narrative/9.gif'
import gif9 from '../../assets/images/slideshow/easyBundle/Narrative/10.gif'
import gif10 from '../../assets/images/slideshow/easyBundle/Narrative/11.gif'
import gif11 from '../../assets/images/slideshow/easyBundle/Narrative/12.gif'
import gif12 from '../../assets/images/slideshow/easyBundle/Narrative/13.gif'
import gif13 from '../../assets/images/slideshow/easyBundle/Narrative/14.gif'
import gif14 from '../../assets/images/slideshow/easyBundle/Narrative/15.gif'
import LevelGlowingEmoji from '../../assets/images/slideshow/easyBundle//Clues/GIFS/LevelGlowingEmoji.gif'
import LevelHalfAPhotograph from '../../assets/images/slideshow/easyBundle//Clues/GIFS/LevelHalfAPhotograph.gif'
import LevelSecretAgentBade from '../../assets/images/slideshow/easyBundle//Clues/GIFS/LevelSecretAgentBade.gif'

import './slideshow.css';

const Slideshow = () => {
  const gifs = [digitalCompassClue, gif1, gif2, gif3, gif4, gif5, gif6, gif7, gif8, gif9, gif10, gif11, gif12, gif13, gif14];
  const [currentGif, setCurrentGif] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGif((prevGif) => (prevGif + 1) % gifs.length);
    }); // Change GIF every 3 seconds
    return () => clearInterval(interval);
  }, [gifs.length]);

  return (
    <div className="slideshow">
      {/* <audio autoPlay loop>
        <source src={backgroundMusic} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio> */}
      <img src={gifs[currentGif]} alt="Slideshow GIF" />
    </div>
  );
};

export default Slideshow;
