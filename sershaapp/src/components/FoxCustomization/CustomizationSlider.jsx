import { useState, useRef, useEffect } from "react";
import TinySlider from "tiny-slider-react";
import 'tiny-slider/dist/tiny-slider.css';
import { useGlobalContext } from "../../context/context";

const CustomizationSlider = ({ itemsTopPart, itemsBottomPart, toLeft, toRight }) => {
  const { isTopPart, isBottomPart, baseUrlImage, selectedItem, setSelectedItem } = useGlobalContext();
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

  const settings = {
    lazyload: true,
    nav: false,
    mouseDrag: true,
    controls: false,
    touch: true,
    items: 5,
    onIndexChanged: (index) => setSliderIndex(index),
    // responsive: {
    //   460: {
    //     items: 5
    //   },
    //   700: {
    //     items: 5
    //   },
    //   1000: {
    //     items: 5
    //   }
    // }
  };

  const renderItems = () => {
    if (isTopPart === true) {
      document.querySelector('.topPartsMainWrapper')?.classList.remove('displaynone');
      document.querySelector('.bottomPartsMainWrapper')?.classList.add('displaynone');
      return (
        <div className="topPartsMainWrapper toppart">
          {itemsTopPart.map((el, index) => (
            <div key={index} className="toppart">
              <img
                className="tns-lazy-img"
                src={`${baseUrlImage}${el.imagePath}`}
                data-src={`${baseUrlImage}${el.imagePath}`}
                alt=""
              />
            </div>
          ))}
        </div>
      );
    }

    if (isBottomPart === true) {
      document.querySelector('.topPartsMainWrapper')?.classList.add('displaynone');
      document.querySelector('.bottomPartsMainWrapper')?.classList.remove('displaynone');
      return (
        <div className="bottomPartsMainWrapper bottompart">
          {itemsBottomPart.map((el, index) => (
            <div key={index} className="bottompart">
              {console.log(`${baseUrlImage}${el.imagePath}`)}
              <img
                className="tns-lazy-img"
                src={`${baseUrlImage}${el.imagePath}`}
                data-src={`${baseUrlImage}${el.imagePath}`}
                alt=""
              />
            </div>
          ))}
        </div>
      );
    }
    return null; // If no items to render, return null
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
        {(isTopPart || isBottomPart) && (
          <TinySlider settings={settings} className="singleImg" ref={sliderRef}>
            {renderItems()}
          </TinySlider>
        )}
      </div>
    </>
  );
};

export default CustomizationSlider;
