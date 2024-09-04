import { useState, useRef, useEffect } from "react";
import TinySlider from "tiny-slider-react";
import 'tiny-slider/dist/tiny-slider.css';
import { useGlobalContext } from "../../context/context";
import './customizationSlider.css'

const CustomizationSlider = ({ itemsTopPart, itemsBottomPart, toLeft, toRight, clickSound, setSershaClickCounter }) => {
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
    const itemsPerPage = window.innerWidth < 1000 ? 3 : 5;
    const maxIndex = isTopPart
      ? Math.ceil(itemsTopPart.length / itemsPerPage) - 1
      : Math.ceil(itemsBottomPart.length / itemsPerPage) - 1;

    setSliderIndex((prevIndex) => {
      if (prevIndex === 0) {
        return maxIndex; // Wrap around to the last page
      }
      return prevIndex - 1;
    });
  };

  const moveSliderToRight = () => {
    const itemsPerPage = window.innerWidth < 1000 ? 3 : 5; // 3 items for small screens, 5 for larger screens
    const maxIndex = isTopPart
      ? Math.ceil(itemsTopPart.length / itemsPerPage) - 1
      : Math.ceil(itemsBottomPart.length / itemsPerPage) - 1;

    setSliderIndex((prevIndex) => {
      if (prevIndex === maxIndex) {
        return 0; // Wrap around to the first page
      }
      return prevIndex + 1;
    });
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
        slideBy: 3,
      },
      1000: {
        items: 5,
        slideBy: 5,
      }
    }
  };

  const handleTopItemClick = (el) => {
    setSelectedTopItem(el);
    localStorage.setItem('TopItem', JSON.stringify(el));
    clickSound.play()
    setSershaClickCounter((prevCounter) => prevCounter < 3 ? prevCounter + 1 : 0);
  };
  const handleBottomItemClick = (el) => {
    setSelectedBottomItem(el);
    localStorage.setItem('BottomItem', JSON.stringify(el));
    clickSound.play()
    setSershaClickCounter((prevCounter) => prevCounter < 3 ? prevCounter + 1 : 0);
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
  console.log(itemsTopPart, itemsBottomPart)

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
