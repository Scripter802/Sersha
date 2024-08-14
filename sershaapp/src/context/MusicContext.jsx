import React, { createContext, useState, useEffect, useRef } from 'react';

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentPlaying, setCurrentPlaying] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const audio = audioRef.current;

    if (currentPlaying && audio.src !== currentPlaying) {
      audio.src = currentPlaying;
      audio.currentTime = currentTime;
      audio.loop = true;
    }

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);

    // return () => {
    //   audio.pause();
    //   audio.removeEventListener('timeupdate', handleTimeUpdate);
    // };
  }, [isPlaying, currentPlaying]);

  const toggleMusic = () => {
    setIsPlaying(prevIsPlaying => !prevIsPlaying);
  };

  const changeMusic = (newMusic) => {
    if (currentPlaying !== newMusic) {
      setCurrentPlaying(newMusic);
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
