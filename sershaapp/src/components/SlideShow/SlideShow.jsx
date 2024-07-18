import React, { useState, useEffect } from 'react';
import gifMergedLevelOne from '../../assets/images/slideshow/easyBundle/gifMergedLevelOne.gif';
import './slideshow.css';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/context';
import axios from 'axios';

const Slideshow = () => {
  const navigate = useNavigate();
  const duration = 128.33 * 1000; // 128.33 seconds in milliseconds
  const [playBackgroundMusic, setPlayBackgroundMusic] = useState(false);
  const { user } = useGlobalContext();

  useEffect(() => {
    const timer = setTimeout(() => {

      navigate('/');
    }, duration);

    return () => clearTimeout(timer);
  }, [navigate, duration]);

  useEffect(() => {
    const musicTimer = setTimeout(() => {
      setPlayBackgroundMusic(true);
    }, 2000);

    return () => clearTimeout(musicTimer);
  }, []);

  return (
    <div className="slideshow">
      <img src={gifMergedLevelOne} alt="Slideshow GIF" />
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
