import browse from '../assets/images/customization/browse.png'
import shop from '../assets/images/customization/shop.png'
import inventory from '../assets/images/customization/inventory.png'
import fox from '../assets/images/customization/fox.png'
import foxbottompart from '../assets/images/customization/foxbottompart.png'
import foxtoppart from '../assets/images/customization/foxtoppart.png'
import { item1, 
         item2, 
         item3, 
         item4, 
         item5, 
         item6, 
         item7, 
         item8, 
         item9, 
         toLeft, 
         toRight, 
         heart } from '../assets/images/customization/items/index.js'

import './foxcustomization.css'

import TinySlider from "tiny-slider-react";
import 'tiny-slider/dist/tiny-slider.css';



const FoxCustomization = () => {
  const items = [toLeft, item1, item2, item3, item4, item5, item6, item7, item8, item9, toRight]

  const settings = {
    lazyload: true,
    nav: false,
    mouseDrag: true,
    controls: false,
  };


  return (
    <div className='customizationWrapper'>
      <div>
        <div>Customize <span>Character</span></div>
        <div>
          <img src={browse} alt="" />
          <img src={shop} alt="" />
          <img src={inventory} alt="" />
        </div>
      </div>

      <div>
        <div className='foxWrapper'>
          <img src={foxtoppart} />
          <img src={fox} />
          <img src={foxbottompart} />
        </div>
        <div className='itemSlider'>
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
        </div>
      </div>
      
      <div>
        <small>© 2024 Kaza Swap LLC. All rights reserved.</small>
      </div>
    </div>
  )
}

export default FoxCustomization