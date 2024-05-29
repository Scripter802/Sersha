import React, { useState, useEffect, useCallback } from 'react';
// import digitalCompassClue from '../../assets/images/slideshow/easyBundle/Clues/GIFS/LevelDigitalCompass.gif'
// import gifOne from '../../assets/images/slideshow/easyBundle/Narrative/two.gif'
// import gifTwo from '../../assets/images/slideshow/easyBundle/Narrative/three.gif'
// import gifThree from '../../assets/images/slideshow/easyBundle/Narrative/four.gif'
// import gifFour from '../../assets/images/slideshow/easyBundle/Narrative/five.gif'
// import gifFive from '../../assets/images/slideshow/easyBundle/Narrative/six.gif'
// import gifSix from '../../assets/images/slideshow/easyBundle/Narrative/seven.gif'
// import gifSeven from '../../assets/images/slideshow/easyBundle/Narrative/eight.gif'
// import gifEight from '../../assets/images/slideshow/easyBundle/Narrative/nine.gif'
// import gifNine from '../../assets/images/slideshow/easyBundle/Narrative/ten.gif'
// import gifTen from '../../assets/images/slideshow/easyBundle/Narrative/eleven.gif'
// import gifEleven from '../../assets/images/slideshow/easyBundle/Narrative/twelve.gif'
// import gifTwelve from '../../assets/images/slideshow/easyBundle/Narrative/threeteen.gif'
// import gifTrheeteen from '../../assets/images/slideshow/easyBundle/Narrative/fourteen.gif'
// import gifFourteen from '../../assets/images/slideshow/easyBundle/Narrative/fiveteen.gif'
import gifMergedLevelOne from '../../assets/images/slideshow/easyBundle/gifMergedLevelOne.gif'
import LevelGlowingEmoji from '../../assets/images/slideshow/easyBundle//Clues/GIFS/LevelGlowingEmoji.gif'
import LevelHalfAPhotograph from '../../assets/images/slideshow/easyBundle//Clues/GIFS/LevelHalfAPhotograph.gif'
import LevelSecretAgentBade from '../../assets/images/slideshow/easyBundle//Clues/GIFS/LevelSecretAgentBade.gif'
import { getGifDurationInSeconds } from "@remotion/gif";
import './slideshow.css';

const Slideshow = () => {
  // const gifs = [digitalCompassClue, gifOne, gifTwo, gifThree, gifFour, gifFive, gifSix, gifSeven, gifEight, gifNine, gifTen, gifEleven, gifTwelve, gifTrheeteen, gifFourteen];
  const [currentGif, setCurrentGif] = useState(0);
  const [currentGifDuration, setCurrentGifDuration] = useState(0);

  // const getCurrentGifDuration = async () => {
  //   const gifDuration = await getGifDurationInSeconds(gifs[currentGif]);
  //   setCurrentGifDuration(gifDuration * 1000);
  // };
  // useEffect(() => {
  //   getCurrentGifDuration();
  //   console.log(currentGifDuration)
  // }, [currentGif])

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentGif((prevGif) => (prevGif + 1) % gifs.length);
  //   }, currentGifDuration);
  //   return () => clearInterval(interval);
  // }, [gifs.length]);

  return (
    <div className="slideshow">
      {/* <audio autoPlay loop>
        <source src={backgroundMusic} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio> */}
      <img src={gifMergedLevelOne} alt="Slideshow GIF" />
    </div>
  );
};

export default Slideshow;
