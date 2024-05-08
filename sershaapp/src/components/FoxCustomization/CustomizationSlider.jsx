import TinySlider from "tiny-slider-react";
import 'tiny-slider/dist/tiny-slider.css';

const CustomizationSlider = ({ items, settings }) => {
    
  return (
    <>
        <TinySlider settings={settings} className='singleImg'>
            {items.map((el, index) => (
              <div key={index}  >
                <img
                  className={`tns-lazy-img`}
                  src={el}
                  data-src={el}
                  alt=""
                />
              </div>
            ))}
          </TinySlider>
    </>
  )
}

export default CustomizationSlider