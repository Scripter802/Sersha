import { useState, useRef } from "react";
import TinySlider from "tiny-slider-react";
import 'tiny-slider/dist/tiny-slider.css';

const CustomizationSlider = ({ items, toLeft, toRight }) => {
  const [sliderIndex, setSliderIndex] = useState(0);

  const sliderRef = useRef(null);

  const moveSliderToLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.slider.goTo('prev');
      setSliderIndex(sliderIndex - 1);
    }
  };

  const moveSliderToRight = () => {
    if (sliderRef.current) {
      sliderRef.current.slider.goTo('next');
      setSliderIndex(sliderIndex + 1);
    }
  };

  const settings = {
    lazyload: true,
    nav: false,
    mouseDrag: true,
    controls: false,
    touch: true,
    items: 5,
    onIndexChanged: (index) => setSliderIndex(index),
    responsive: {
      460: {
        items: 5 
        },
      700: {
        items: 5
      },
      1000: {
        items: 9
      }
      }
    };

  return (
    <>
      <div className="sliderControls">
        <div className="sliderLeftButton" onClick={moveSliderToLeft}>
          <img src={toLeft} alt="leftArrow" />
        </div>
        <div className="sliderRightButton" onClick={moveSliderToRight}>
          <img src={toRight} alt="rightArrow" />
        </div>
      </div>
      <div className="tinySlidWrapper">
        <TinySlider settings={settings} className='singleImg' ref={sliderRef}>
          {items.map((el, index) => (
            <div key={index}>
              <img
                className={`tns-lazy-img`}
                src={el}
                data-src={el}
                alt=""
              />
            </div>
          ))}
        </TinySlider>
      </div>
    </>
  )
}

export default CustomizationSlider;
