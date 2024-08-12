import React, { useState, useEffect } from 'react';
import levelDigitalCompass from '../../assets/images/slideshow/easyBundle/Clues/GIFS/LevelDigitalCompass.gif'
import {
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  ten,
  eleven,
  twelve,
  threeteen,
  fourteen,
  fiveteen,
} from '../../assets/images/slideshow/easyBundle/Narrative/index.js'
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/context';
import './slideshow.css';

const Slideshow = () => {
  const navigate = useNavigate();
  const [currentGifIndex, setCurrentGifIndex] = useState(0);
  const [playBackgroundMusic, setPlayBackgroundMusic] = useState(false);
  const { user } = useGlobalContext();
  const firstLevelGifs = [levelDigitalCompass, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, threeteen, fourteen, fiveteen];

  useEffect(() => {
    const musicTimer = setTimeout(() => {
      setPlayBackgroundMusic(true);
    }, 2000);

    return () => clearTimeout(musicTimer);
  }, []);

  const handleNext = () => {
    if (currentGifIndex < firstLevelGifs.length - 1) {
      setCurrentGifIndex(prevIndex => prevIndex + 1);
    } else {
      navigate('/');
    }
  };

  const handlePrev = () => {
    if (currentGifIndex > 0) {
      setCurrentGifIndex(prevIndex => prevIndex - 1);
    }
  };

  return (
    <div className="slideshow">
      {currentGifIndex > 0 && <div className="arrow left" onClick={handlePrev}>&#9664;</div>}
      <img src={firstLevelGifs[currentGifIndex]} alt="Slideshow GIF" />
      <div className="arrow right" onClick={handleNext}>&#9654;</div>
      <audio autoPlay>
        <source src="/music/SFX/Slideshow/LoadingSoundEffect.mp3" type="audio/mpeg" />
      </audio>
      {playBackgroundMusic && (
        <audio loop autoPlay>
          <source src="/music/Music/SershaThemesongMediumoptimal310520241122.mp3" type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
};

export default Slideshow;