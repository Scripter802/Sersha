import React, { useEffect, useState } from 'react';
import cards from '../../assets/images/login/cards.png';
import cardsRes from '../../assets/images/login/cardsRes.png';
import { useGlobalContext } from '../../context/context.jsx';
import './signInUpPage.css';
import LoginForm from '../../components/signInUp/LoginForm.jsx';
import RegisterForm from '../../components/signInUp/RegisterForm.jsx';
import skipImg from '../../assets/images/login/skip.png';

const signInUpSlider = [
  {
    id: 1,
    title: 'Build and Improve  your Community',
    text: 'You can expand your circle by joining streams, clubs and chatting with different people.'
  },
  {
    id: 2,
    title: 'Build and  your Community',
    text: 'You can expand your circle by joining streams, clubs and chatting with  people.'
  },
  {
    id: 3,
    title: 'Build and Improve  your ',
    text: 'You can   your circle by joining streams, clubs and chatting with different people.'
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
            <img src={sliderImage} alt="loginPicture" />
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
            <div className="sliderDots">
              {signInUpSlider.map((_, index) => (
                <button
                  key={index}
                  className={index === sliderIndex ? "dot active" : "dot"}
                  onClick={() => setSliderIndex(index)}
                />
              ))}
            </div>
            <div>
              <button className="prev sliderBtn" onClick={() => setSliderIndex(sliderIndex - 1)}>{"<"}</button>
              <button className="next sliderBtn" onClick={() => setSliderIndex(sliderIndex + 1)}>{">"}</button>
            </div>
          </div>
        </div>
      )}
      {windowWidth >= 1000 && (
        <>
          <div className='leftSideWrapper'>
            <div className="leftSideBackground"></div>
            <div className="leftSideContent">
              {renderSlides()}
              <div className="sliderDots">
                {signInUpSlider.map((_, index) => (
                  <button
                    key={index}
                    className={index === sliderIndex ? "dot active" : "dot"}
                    onClick={() => setSliderIndex(index)}
                  />
                ))}
              </div>
              <div>
                <button className="prev sliderBtn" onClick={() => setSliderIndex(sliderIndex - 1)}>{"<"}</button>
                <button className="next sliderBtn" onClick={() => setSliderIndex(sliderIndex + 1)}>{">"}</button>
              </div>
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
    </div>
  );
};

export default SignInUpPage;
