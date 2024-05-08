import browse from '../../assets/images/customization/browse.png'
import shop from '../../assets/images/customization/shop.png'
import inventory from '../../assets/images/customization/inventory.png'
import fox from '../../assets/images/customization/fox.png'
import foxbottompart from '../../assets/images/customization/foxbottompart.png'
import foxtoppart from '../../assets/images/customization/foxtoppart.png'
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
         heart } from '../../assets/images/customization/items/index.js'

import './foxcustomization.css'
import CustomizationSlider from '../../components/FoxCustomization/CustomizationSlider.jsx'




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
      <div className='titleWrapper'>
        <div className='title'>Customize <span className='titleChar'>Character</span></div>
        <div className='customizeOptions'>
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
          <CustomizationSlider items={items} settings />
        </div>
      </div>
      
      <div className='footer'>
        <small>© 2024 Kaza Swap LLC. All rights reserved.</small>
        <small className='madeWith'>Made with <img src={heart} alt="heart" /></small>
      </div>
    </div>
  )
}

export default FoxCustomization