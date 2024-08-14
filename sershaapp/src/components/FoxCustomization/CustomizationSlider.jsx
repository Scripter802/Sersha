import { useState, useRef, useEffect } from "react";
import TinySlider from "tiny-slider-react";
import 'tiny-slider/dist/tiny-slider.css';
import { useGlobalContext } from "../../context/context";
import './customizationSlider.css'

const CustomizationSlider = ({ itemsTopPart, itemsBottomPart, toLeft, toRight, clickSound }) => {
  const { isTopPart, isBottomPart, baseUrlImage, selectedTopItem, setSelectedTopItem, selectedBottomItem, setSelectedBottomItem } = useGlobalContext();
  const [sliderIndex, setSliderIndex] = useState(0);
  const sliderRef = useRef(null);
  const sliderDownRef = useRef(null);


  useEffect(() => {
    const maxIndex = isTopPart ? itemsTopPart.length - 1 : itemsBottomPart.length - 1;
    if (sliderIndex > maxIndex) {
      setSliderIndex(maxIndex);
    }
  }, [sliderIndex, itemsTopPart, itemsBottomPart, isTopPart, isBottomPart]);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slider.goTo(sliderIndex);
    }
    if (sliderDownRef.current) {
      sliderDownRef.current.slider.goTo(sliderIndex);
    }
  }, [sliderIndex]);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slider.refresh();
    }
    if (sliderDownRef.current) {
      sliderDownRef.current.slider.refresh();
    }
    setSliderIndex(0);
  }, [isTopPart, isBottomPart]);

  const moveSliderToLeft = () => {
    setSliderIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const moveSliderToRight = () => {
    const maxIndex = isTopPart ? itemsTopPart.length - 1 : itemsBottomPart.length - 1;
    console.log(maxIndex, sliderIndex)
    setSliderIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
    console.log(maxIndex, sliderIndex)
  };

  const settings = {
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
      1000: {
        items: 5,
      }
    }
  };

  const handleTopItemClick = (el) => {
    setSelectedTopItem(el);
    localStorage.setItem('TopItem', JSON.stringify(el));
    clickSound.play()
  };
  const handleBottomItemClick = (el) => {
    setSelectedBottomItem(el);
    localStorage.setItem('BottomItem', JSON.stringify(el));
    clickSound.play()
  };

  const renderItems = (items, onClick) => {
    return items.map((el, index) => (
      <div key={index} className="myslider">
        <img
          className="tns-lazy-img"
          src={`${baseUrlImage}${el.imagePath}`}
          data-src={`${baseUrlImage}${el.imagePath}`}
          alt=""
          onClick={() => onClick(el)}
        />
      </div>
    ));
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
      {isTopPart ? (
        <TinySlider settings={settings} className="singleImg" ref={sliderRef}>
          {renderItems(itemsTopPart, handleTopItemClick)}
        </TinySlider>
      ) : (
        isBottomPart && (
          <TinySlider settings={settings} className="singleImg1" ref={sliderDownRef}>
            {renderItems(itemsBottomPart, handleBottomItemClick)}
          </TinySlider>
        )
      )}
    </>
  );
};

export default CustomizationSlider;
