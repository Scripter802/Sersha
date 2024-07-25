import { useState, useRef, useEffect } from "react";
import TinySlider from "tiny-slider-react";
import 'tiny-slider/dist/tiny-slider.css';
import { useGlobalContext } from "../../context/context";
import './customizationSlider.css'

const CustomizationSlider = ({ itemsTopPart, itemsBottomPart, toLeft, toRight }) => {
  const { isTopPart, isBottomPart, baseUrlImage, selectedTopItem, setSelectedTopItem, selectedBottomItem, setSelectedBottomItem } = useGlobalContext();
  const [sliderIndex, setSliderIndex] = useState(0);
  const sliderRef = useRef(null);
  const sliderDownRef = useRef(null);

  useEffect(() => {
    if (sliderRef.current) {
      console.log(sliderRef);
      sliderRef.current.slider.refresh();
    }
  }, [isTopPart, isBottomPart]);

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

  const settings1 = {
    container: '.singleImg',
    lazyload: true,
    nav: false,
    mouseDrag: true,
    controls: false,
    touch: true,
    items: 5,
    slideBy: 1,
    loop: false,
    onIndexChanged: (info) => setSliderIndex(info.index),
    responsive: {
      0: {
        items: 3,
      },
      // "700": {
      //   "items": 2,
      // },
      1000: {
        items: 5,
      }
    }
  };

  const settings2 = {
    container: '.singleImg1',
    lazyload: true,
    nav: false,
    mouseDrag: true,
    controls: false,
    touch: true,
    items: 5,
    slideBy: 1,
    loop: false,
    onIndexChanged: (info) => setSliderIndex(info.index),
    responsive: {
      0: {
        items: 3,
      },
      // "700": {
      //   "items": 2,
      // },
      1000: {
        items: 5,
      }
    }
  };

  const handleTopItemClick = (el) => {
    setSelectedTopItem(el);
    localStorage.setItem('TopItem', JSON.stringify(el));
  };
  const handleBottomItemClick = (el) => {
    setSelectedBottomItem(el);
    localStorage.setItem('BottomItem', JSON.stringify(el));
  };

  const renderItems = () => {
    if (isTopPart === true) {
      document.querySelector('.topPartsMainWrapper')?.classList.remove('displaynone');
      document.querySelector('.bottomPartsMainWrapper')?.classList.add('displaynone');
      return (
        <>
          {itemsTopPart.map((el, index) => (
            <div key={index} className="toppart topPartsMainWrapper myslider">
              <img
                className="tns-lazy-img"
                src={`${baseUrlImage}${el.imagePath}`}
                data-src={`${baseUrlImage}${el.imagePath}`}
                alt=""
                onClick={() => handleTopItemClick(el)}
              />
            </div>
          ))}
        </>
      );
    }

    if (isBottomPart === true) {
      document.querySelector('.topPartsMainWrapper')?.classList.add('displaynone');
      document.querySelector('.bottomPartsMainWrapper')?.classList.remove('displaynone');
      return (
        <>
          {itemsBottomPart.map((el, index) => (
            <div key={index} className="bottompart bottomPartsMainWrapper myslider">
              {console.log(`${baseUrlImage}${el.imagePath}`)}
              <img
                className="tns-lazy-img"
                src={`${baseUrlImage}${el.imagePath}`}
                data-src={`${baseUrlImage}${el.imagePath}`}
                alt=""
                onClick={() => handleBottomItemClick(el)}
              />
            </div>
          ))}
        </>
      );
    }
    return null;
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
      {/* <div className="tinySlidWrapper"> */}
      {isTopPart ? (
        <TinySlider settings={settings1} className="singleImg" id="singleImg" ref={sliderRef}>
          {renderItems()}
        </TinySlider>
      ) :
        isBottomPart && (
          <TinySlider settings={settings2} className="singleImg1" id="singleImg" ref={sliderDownRef}>
            {renderItems()}
          </TinySlider>
        )}


      {/* </div> */}
    </>
  );
};

export default CustomizationSlider;
