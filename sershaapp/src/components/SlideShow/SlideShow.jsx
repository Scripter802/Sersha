import React, { useState, useEffect, useContext } from 'react';
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
import volume from '../../assets/images/navbar/volume.png'
import volumePlay from '../../assets/images/navbar/volumePlay.png'
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/context';
import MusicContext from '../../context/MusicContext.jsx'
import './slideshow.css';

const Slideshow = ({ lvl }) => {
  const navigate = useNavigate();
  const [currentGifIndex, setCurrentGifIndex] = useState(0);
  const [playBackgroundMusic, setPlayBackgroundMusic] = useState(false);
  const { toggleMusic, isPlaying } = useContext(MusicContext);
  const { baseUrlImage, user, slideshowByLevel, fetchSlideshowByLevel, updateShowedSlideshow } = useGlobalContext();
  const firstLevelGifs = [levelDigitalCompass, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, threeteen, fourteen, fiveteen];
  const [preloadedGifs, setPreloadedGifs] = useState({});

  useEffect(() => {
    if (lvl > 0) {
      fetchSlideshowByLevel(lvl);
    }
  }, [lvl]);



  const preloadGifs = (gifs) => {
    const preloaded = {};
    gifs.forEach((gif) => {
      const img = new Image();
      img.src = `${baseUrlImage}${gif.filePath}`;
      preloaded[gif.filePath] = img;
    });
    setPreloadedGifs(preloaded);
  };

  useEffect(() => {
    if (slideshowByLevel && slideshowByLevel.length > 0) {
      preloadGifs(slideshowByLevel);
    }
  }, [slideshowByLevel]);

  useEffect(() => {
    const musicTimer = setTimeout(() => {
      setPlayBackgroundMusic(true);
    }, 2000);

    return () => clearTimeout(musicTimer);
  }, []);

  const handleNext = () => {
    if (currentGifIndex < slideshowByLevel?.length - 1) {
      setCurrentGifIndex(prevIndex => prevIndex + 1);
    } else {
      updateShowedSlideshow();
      localStorage.setItem('showedSlideshow', true);
      navigate('/');
    }
  };

  const handlePrev = () => {
    if (currentGifIndex > 0) {
      setCurrentGifIndex(prevIndex => prevIndex - 1);
    }
  };

  const currentImageName = slideshowByLevel?.[currentGifIndex]?.name || '';
  const containsClue = currentImageName.includes("Clue");

  return (
    <div className="slideshow">
      {currentGifIndex > 0 && <div className="arrow left" onClick={handlePrev}>&#9664;</div>}
      {slideshowByLevel?.length > 0 && (
        <>
          <img
            src={preloadedGifs[slideshowByLevel[currentGifIndex]?.filePath]?.src || `${baseUrlImage}${slideshowByLevel[currentGifIndex]?.filePath}`}
            alt="Slideshow GIF"
            loading="lazy"
          />
          {containsClue && (
            <audio autoPlay>
              <source src="/music/SFX/Slideshow/Harpforreward.mp3" type="audio/mpeg" />
            </audio>)}
        </>
      )}
      <div className="arrow right" onClick={handleNext}>&#9654;</div>
      <audio autoPlay>
        <source src="/music/SFX/Slideshow/LoadingSoundEffect.mp3" type="audio/mpeg" />
      </audio>
      {/* {playBackgroundMusic && (
        <audio loop autoPlay>
          <source src="/music/Music/SershaThemesongMediumoptimal310520241122.mp3" type="audio/mpeg" />
        </audio>
      )} */}
      <div className='mute-music-slideshow' onClick={() => toggleMusic()}>{!isPlaying ? <img src={volume} alt="mute button" /> : <img src={volumePlay} alt="Volume Play Button" />}</div>    </div>
  );
};

export default Slideshow;