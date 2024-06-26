import browse from '../../assets/images/customization/browse.png'
import shop from '../../assets/images/customization/shop.png'
import inventory from '../../assets/images/customization/inventory.png'
import fox from '../../assets/images/customization/fox.png'
import foxbottompart from '../../assets/images/customization/foxbottompart.png'
import foxtoppart from '../../assets/images/customization/foxtoppart.png'
import {
  AlienAntena,
  AnimalEars,
  AstronautHelmet,
  CapXBlue,
  CapXGreen,
  CapXRed,
  ChefHat,
  CowboyHat,
  FlowerCrown,
  HelmetArmour,
  LongHair,
  Mask,
  PiratesBandana,
  RegularGlasses,
  Sunglasses,
  SuperheroMask,
} from '../../assets/images/customization/items/TopItems/index.js'
import {
  Apron,
  AstronautSuit,
  Book,
  Cape,
  CowboyBoots,
  DetectiveMagnifyingGlass,
  FairyWings,
  HoodieGreen,
  HoodieLightBlue,
  HoodiePink,
  HoodieRed,
  HoodieWhite,
  KnightArmour,
  MagicWand,
  NinjaBelt,
  PrincessGwon,
  SparkleWings,
  SuperheroSuitHighTech,
  TshirtGreen,
  TshirtLightBlue,
  TshirtPink,
  TshirtRed,
  TshirtWhite,
  Tutu,
  WizardCloak,
} from '../../assets/images/customization/items/DownItems/index.js'
import {
  item1,
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
  heart
} from '../../assets/images/customization/items/index.js'

import './foxcustomization.css'
import CustomizationSlider from '../../components/FoxCustomization/CustomizationSlider.jsx'
import HeaderResponsive from '../../components/HeaderResponsive/HeaderResponsive.jsx'
import { useGlobalContext } from '../../context/context.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios'




const FoxCustomization = () => {
  const { baseUrl, isTopPart, setIsTopPart, isBottomPart, setIsBottomPart } = useGlobalContext();
  // const itemsTopPart = [AlienAntena, AnimalEars, AstronautHelmet, CapXBlue, CapXGreen, CapXRed, ChefHat, CowboyHat, FlowerCrown, HelmetArmour, LongHair, Mask, PiratesBandana, RegularGlasses, Sunglasses, SuperheroMask]
  // const itemsBottomPart = [Apron, AstronautSuit, Book, Cape, CowboyBoots, DetectiveMagnifyingGlass, FairyWings, HoodieGreen, HoodieLightBlue, HoodiePink, HoodieRed, HoodieWhite, KnightArmour, MagicWand, NinjaBelt, PrincessGwon, SparkleWings, SuperheroSuitHighTech, Sunglasses, TshirtGreen, TshirtLightBlue, TshirtPink, TshirtRed, TshirtWhite, Tutu, WizardCloak]
  const [topPart, setTopPart] = useState([]);
  const [bottomPart, setBottomPart] = useState([]);

  useEffect(() => {
    const fetchFoxItems = async () => {
      try {
        const response = await axios.get(`${baseUrl}/SershaItem`);
        const items = response.data;

        const topItems = items.filter(item => item.bodyPart === 0);
        const bottomItems = items.filter(item => item.bodyPart === 1);

        setTopPart(topItems);
        setBottomPart(bottomItems);
      } catch (error) {
        console.error('Error fetching FoxItems:', error);
      }
    };

    fetchFoxItems();
  }, [baseUrl]);

  console.log(`toppart: ${topPart.map(item => item.name).join(', ')} ; bottomPart: ${bottomPart.map(item => item.name).join(', ')}`);

  return (
    <div className='customizationWrapper'>
      <div className='headerCustomization'>
        {window.innerWidth < 1000 && <HeaderResponsive />}
      </div>
      <div className='customizationBackground'>
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
            <img className='foxTopPart' src={foxtoppart} onClick={() => { setIsTopPart(true); setIsBottomPart(false); console.log(isBottomPart, isTopPart) }} />
            <img className='foxMiddle' src={fox} />
            <img className='foxBottomPart' src={foxbottompart} onClick={() => { setIsBottomPart(true); setIsTopPart(false); console.log(isBottomPart, isTopPart) }} />
          </div>
          <div className='itemSlider'>
            <CustomizationSlider itemsTopPart={topPart} itemsBottomPart={bottomPart} toLeft={toLeft} toRight={toRight} />
          </div>
        </div>

        <div className='footer'>
          <small>© 2024 Kaza Swap LLC. All rights reserved.</small>
          <small className='madeWith'>Made with <img src={heart} alt="heart" /></small>
        </div>
      </div>
      <audio loop autoPlay>
        <source src="/music/Music/RogueFoxFight310520241104.mp3" type="audio/mpeg" />
      </audio>
    </div>
  )
}

export default FoxCustomization;