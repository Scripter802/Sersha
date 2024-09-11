import React, { createContext, useState, useEffect, useRef } from 'react';
import { useGlobalContext } from './context'
const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentPlaying, setCurrentPlaying] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(new Audio());
  console.log(currentTime);
  const audio = audioRef.current;

  const handleTimeUpdate = () => {
    const roundedTime = Math.floor(audio.currentTime);
    setCurrentTime((prevTime) => (prevTime !== roundedTime ? roundedTime : prevTime));
  };

  useEffect(() => {
    const savedTime = localStorage.getItem('currentTime');
    if (savedTime) {
      setCurrentTime(parseFloat(savedTime));
    }

    const savedPlaying = localStorage.getItem('currentPlaying');
    if (savedPlaying) {
      setCurrentPlaying(savedPlaying);
    }
  }, []);

  useEffect(() => {
    const currentPlayingIntervalId = setInterval(() => {
      localStorage.setItem('currentPlaying', currentPlaying);
    }, 5000);

    return () => clearInterval(currentPlayingIntervalId);
  }, [currentPlaying]);

  useEffect(() => {
    const currentTimeintervalId = setInterval(() => {
      localStorage.setItem('currentTime', currentTime);
    }, 5000);

    return () => clearInterval(currentTimeintervalId);
  }, [currentTime]);

  useEffect(() => {
    if (currentPlaying && audio.src !== currentPlaying) {
      audio.src = currentPlaying;
      audio.currentTime = currentTime;
      audio.loop = true;
    }

    if (isPlaying) {
      audio.muted = true;

      audio.play().then(() => {
        audio.muted = false;
      });
    } else {
      audio.pause();
    }


    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [isPlaying, currentPlaying]);

  const toggleMusic = () => {
    setIsPlaying(prevIsPlaying => !prevIsPlaying);
  };

  const changeMusic = (newMusic) => {
    if (currentPlaying !== newMusic) {
      console.log(currentPlaying, newMusic)
      setCurrentPlaying(newMusic);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  };

  return (
    <MusicContext.Provider value={{ isPlaying, toggleMusic, currentPlaying, setCurrentPlaying, changeMusic, currentTime }}>
      {children}
    </MusicContext.Provider>
  );
};

export default MusicContext;
