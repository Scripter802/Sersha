import React, { useEffect, useState } from 'react'
import cards from '../../assets/images/login/cards.png'
import { useGlobalContext } from '../../context/context.jsx'
import './signInUpPage.css'
import LoginForm from '../../components/signInUp/LoginForm.jsx'
import RegisterForm from '../../components/signInUp/RegisterForm.jsx'

const signInUpSlider = [
  {
    id: 1,
    image: cards,
    title: 'Build and Improve  your Community',
    text: 'You can expand your circle by joining streams, clubs and chatting with different people.'
  },
  {
    id: 2,
    image: cards,
    title: 'Build and  your Community',
    text: 'You can expand your circle by joining streams, clubs and chatting with  people.'
  },
  {
    id: 3,
    image: cards,
    title: 'Build and Improve  your ',
    text: 'You can   your circle by joining streams,{<br />} clubs and chatting with different people.'
  },
];

const SignInUpPage = () => {
  const {logIn, setLogIn} = useGlobalContext();
  const [slider, setSlider] = useState(signInUpSlider);
  const [sliderIndex, setSliderIndex] = useState(0);

  useEffect(() => {
    const lastIndex = slider.length - 1;
    if(sliderIndex < 0) {
      setSliderIndex(lastIndex)
    }
    if(sliderIndex > slider.length - 1) {
      setSliderIndex(0)
    }
    

  }, [sliderIndex, slider])
  


  return (
    <div className='logInWrapper'>
      <div className='leftSideWrapper'>
        <div className="leftSideBackground"></div>
        <div className="leftSideContent">
          {signInUpSlider.map((slide, slideIndex) => {
            const {id, image, title, text} = slide

            let position = "nextSlide"
            if(slideIndex === sliderIndex) {
              position = "activeSlide"
            }
            if(slideIndex === sliderIndex - 1 || 
              (sliderIndex === 0 && slideIndex === signInUpSlider.length - 1)){
                position = "lastSlide"
              }
            return (
              <article className={position} key={id} >
                <div className='slideImage'>
                  <img src={image} alt="loginPicture" />
                </div>

                <div className='leftSideText'>
                  <h1>{title}</h1>
                  <p>{text}</p>
                </div>

                <div>
          
                </div>
              </article>
            )
          })}
          <div className="sliderDots">
    {signInUpSlider.map((slide, slideIndex) => (
      <button
        key={slideIndex}
        className={slideIndex === sliderIndex ? "dot active" : "dot"}
        onClick={() => setSliderIndex(slideIndex)}
      />
    ))}
  </div>
  <div>
    <button className="prev sliderBtn" onClick={() => setSliderIndex(sliderIndex - 1)}> {"<"} </button>
    <button className="next sliderBtn" onClick={() => setSliderIndex(sliderIndex + 1)}> {">"} </button>
  </div>
          {/* <div>
            <img src={cards} alt="loginPicture" />
            </div>
            
            <div className='leftSideText'>
            <h1>Build and Improve {<br />} your Community</h1>
            <p>You can expand your circle by joining streams,{<br />} clubs and chatting with different people.</p>
          </div>

          <div>
          
        </div> */}
        </div>
      </div>


      <div className='rightSideWrapper'>
        {logIn ? <LoginForm /> : <RegisterForm /> }
      </div>
    </div>
  )
}


export default SignInUpPage