// MusicContext.js
import React, { createContext, useState, useEffect, useRef } from 'react';

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentPlaying, setCurrentPlaying] = useState('');
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const audio = audioRef.current;
    audio.src = currentPlaying;
    audio.loop = true;

    const playAudio = () => {
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    };

    if (currentPlaying) {
      playAudio();
    }

    return () => {
      audio.pause();
    };
  }, [isPlaying, currentPlaying]);

  const toggleMusic = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const changeMusic = (newMusic) => {
    if (currentPlaying !== newMusic) {
      setCurrentPlaying(newMusic);
      setIsPlaying(true);
    }
  };

  return (
    <MusicContext.Provider value={{ isPlaying, toggleMusic, currentPlaying, setCurrentPlaying, changeMusic }}>
      {children}
    </MusicContext.Provider>
  );
};

export default MusicContext;
