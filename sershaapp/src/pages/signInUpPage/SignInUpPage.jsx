import React, { useEffect, useState } from 'react';
import cards from '../../assets/images/login/cards.png';
import cardsRes from '../../assets/images/login/cardsRes.png';
import logPage from '../../assets/images/login/logPage.png';
import { useGlobalContext } from '../../context/context.jsx';
import './signInUpPage.css';
import LoginForm from '../../components/signInUp/LoginForm.jsx';
import RegisterForm from '../../components/signInUp/RegisterForm.jsx';
import skipImg from '../../assets/images/login/skip.png';
import { heart } from '../../assets/images/customization/items/index.js';

const signInUpSlider = [
  {
    id: 1,
    title: 'Defeat The Rogue Fox, Save Social Media, Become The Hero',
    text: 'Learn to master social media media safety with Sersha the fox and friends!'
  },
  {
    id: 2,
    title: 'Defeat The Rogue Fox, Save Social Media, Become The Hero',
    text: 'Learn to master social media media safety with Sersha the fox and friends!'
  },
  {
    id: 3,
    title: 'Defeat The Rogue Fox, Save Social Media, Become The Hero',
    text: 'Learn to master social media media safety with Sersha the fox and friends!'
  },
];

const SignInUpPage = () => {
  const { logIn, windowWidth, setWindowWidth } = useGlobalContext();
  const [sliderIndex, setSliderIndex] = useState(0);
  const [isSlideSkipped, setIsSlideSkipped] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const lastIndex = signInUpSlider.length - 1;
    if (sliderIndex < 0) {
      setSliderIndex(lastIndex);
    }
    if (sliderIndex > lastIndex) {
      setSliderIndex(0);
    }
  }, [sliderIndex]);

  const sliderImage = windowWidth < 1000 ? cardsRes : cards;

  const renderSlides = () => (
    signInUpSlider.map((slide, index) => {
      const { id, title, text } = slide;
      let position = 'nextSlide';
      if (index === sliderIndex) {
        position = 'activeSlide';
      }
      if (index === sliderIndex - 1 || (sliderIndex === 0 && index === signInUpSlider.length - 1)) {
        position = 'lastSlide';
      }
      return (
        <article className={position} key={id}>
          <div className='slideImage'>
            <img src={logPage} alt="loginPicture" />
          </div>
          <div className='leftSideText'>
            <h1>{title}</h1>
            {windowWidth > 1000 && <p>{text}</p>}
          </div>
        </article>
      );
    })
  );

  return (
    <div className='logInWrapper'>
      {windowWidth < 1000 && !isSlideSkipped && (
        <div className='leftSideWrapper'>
          <div className='skipWrapper' onClick={() => setIsSlideSkipped(true)}>
            <img src={skipImg} alt="Skip" />
            <p>Skip</p>
          </div>
          <div className="leftSideBackground"></div>
          <div className="leftSideContent">
            {renderSlides()}
          </div>
        </div>
      )}
      {windowWidth >= 1000 && (
        <>
          <div className='leftSideWrapper'>
            <div className="leftSideBackground"></div>
            <div className="leftSideContent">
              {renderSlides()}
            </div>
          </div>
          <div className='rightSideWrapper'>
            {logIn ? <LoginForm /> : <RegisterForm />}
          </div>

        </>
      )}

      {isSlideSkipped && (
        <div className='rightSideWrapper'>
          {logIn ? <LoginForm /> : <RegisterForm />}
        </div>
      )}
      {logIn == false && (
        <div className='footerWrapperReg'>
          <div className='footerReg'>
            <small>© 2024 Kaza Swap LLC. All rights reserved.</small>
            <small className='madeWithReg'>Made with <img src={heart} alt="heart" /></small>
          </div>
        </div>

      )}
    </div>
  );
};

export default SignInUpPage;
