import React from 'react'

import {
  bottomLeft,
  bottomLeft1,
  bottomLeft2,
  bottomLeft2Item,
  bottomLeft3,
  bottomRight,
  bottomRight1,
  bottomRight2,
  bottomRight3,
  group,
  group1,
  group2,
  group3,
  group4,
  group4One,
  group5,
  group6,
  group7,
  group8,
  group9,
  group10,
  group11,
  group12,
  group13,
  group14,
  group15,
  group16,
  group17,
  group18,
  group18Two,
  group19,
  group20,
  group21,
  group22,
  group23,
  group24,
  group25,
  group26,
  group27,
  group28,
  group29,
  repeatPart,
  repeatPart1,
  repeatPartTwo,
  repeatPart3,
  repeatPart4,
  repeatPart5,
  repeatPart6,
  repeatPart7,
  topLeftZone,
  topLeftZone1,
  topLeftZone2,
  topLeftZone3,
  topRightZone,
  topRightZone1,
  topRightZone2,
  topRightZone3,
} from '../../assets/images/map/mapItems/index.js';
import lockGame from "../../assets/images/map/mapItems/lockLevel.png";
import completedGame from "../../assets/images/map/mapItems/completedLevel.png";
import { useGlobalContext } from '../../context/context.jsx';

const MapComponent = ({ bundle }) => {
  const { user } = useGlobalContext();

  return (
    <>
      <h2 className='bundleName'>{bundle.bundleName}</h2>
      {bundle.levels.map((lvl, lvli) => {
        let odd = lvl.levelNo % 2 === 1;
        console.log(lvl.step)
        return (
          <div className="basePartWrapper">
            <img className="path" src={repeatPart} alt="" />
            <div className="title-up">
              <h3>
                {lvl?.levelName}
              </h3>
              <p>
                {lvl?.desc}
              </p>
            </div>
            <div className="gameLevel">
              {user?.level > lvl.levelNo || lvl.step >= 1 && user?.level == lvl.levelNo ? <img src={completedGame} alt="" /> : lvl.step < 1 && user?.level == lvl.levelNo ? <div className='levelNoWrapper'><p className='levelNo'>01</p></div> : <img src={lockGame} alt="" />}
              {user?.level > lvl.levelNo || lvl.step >= 2 && user?.level == lvl.levelNo ? <img src={completedGame} alt="" /> : lvl.step < 2 && user?.level == lvl.levelNo ? <div className='levelNoWrapper'><p className='levelNo'>02</p></div> : <img src={lockGame} alt="" />}
              {user?.level > lvl.levelNo || lvl.step >= 3 && user?.level == lvl.levelNo ? <img src={completedGame} alt="" /> : lvl.step < 3 && user?.level == lvl.levelNo ? <div className='levelNoWrapper'><p className='levelNo'>03</p></div> : <img src={lockGame} alt="" />}
            </div>

            <div className="title-down">
              <h3>
                {lvl?.levelNameDown}
              </h3>
              <p>
                {lvl?.descDown}
              </p>
            </div>
            <div className="gameLevel-down">
              {user?.level > lvl.levelNoDown || lvl.step > 1 && user?.level == lvl.levelNoDown ? <img src={completedGame} alt="" /> : lvl.step < 1 && user?.level == lvl.levelNoDown ? <div className='levelNoWrapper'><p className='levelNo'>01</p></div> : <img src={lockGame} alt="" />}
              {user?.level > lvl.levelNoDown || lvl.step > 2 && user?.level == lvl.levelNoDown ? <img src={completedGame} alt="" /> : lvl.step < 2 && user?.level == lvl.levelNoDown ? <div className='levelNoWrapper'><p className='levelNo'>02</p></div> : <img src={lockGame} alt="" />}
              {user?.level > lvl.levelNoDown || lvl.step > 3 && user?.level == lvl.levelNoDown ? <img src={completedGame} alt="" /> : lvl.step < 3 && user?.level == lvl.levelNoDown ? <div className='levelNoWrapper'><p className='levelNo'>03</p></div> : <img src={lockGame} alt="" />}

            </div>

            {bundle?.images.map((img, i) => (
              <>
                <div className={`trees ${`tree${i + 1}`}`}>
                  {img.fondation ? (
                    <div className={`${img.fondation && 'fondation'}`}>
                      <img src={img?.item} alt="tree" className='fondationTopImg' />
                      {img.fondation && <img src={img?.fondation} alt="fondation" className='fondationImg' />}

                    </div>
                  ) : (
                    <img src={img?.item} alt="tree" />
                  )}
                </div>
              </>
            ))}

          </div>
        )

      })}
    </>
  )
}

export default MapComponent