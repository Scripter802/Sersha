import React from 'react';
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
import './map.css';
import HeaderResponsive from '../../components/HeaderResponsive/HeaderResponsive.jsx';
import { useContext, useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/context'
import MusicContext from '../../context/MusicContext'

const MapPage = () => {
  const { toggleMusic, currentPlaying, setCurrentPlaying, changeMusic, isPlaying } = useContext(MusicContext);
  const { bundelsAndLevels, setBundlesAndLevels, user } = useGlobalContext();
  const music = '/music/Music/SershaThemesongMediumoptimal310520241122.mp3'

  useEffect(() => {
    if (currentPlaying != music) {
      changeMusic('/music/Music/SershaThemesongMediumoptimal310520241122.mp3');
    }
  }, [changeMusic, music]);

  console.log(user)

  return (
    <div className='mapContainer'>
      <div className='headerContainer'>
        {window.innerWidth < 1000 && <HeaderResponsive />}
      </div>

      <div className="mapWrapper">
        <div className="basePartWrapper">
          <img className="path" src={repeatPart} alt="" />
        </div>

        {bundelsAndLevels.map((bundle, i) => (
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

                  {bundle.images.map((img, i) => (
                    <>
                      <div className={`trees ${`tree${i + 1}`}`}>
                        <img src={img} alt="tree" />
                      </div>
                    </>
                  ))}

                </div>
              )

            })}
          </>
        )
        )}


        {/* <div className="basePartWrapper">
          <img className="path" src={repeatPart} alt="" />
          
          <div className="title-up">
          <h3>
              Pixel Plaza
            </h3>
            <p>
              Explore the basics of the digital world.
            </p>
          </div>
          <div className="gameLevel">
            <img src={lockGame} alt="" />
            <img src={lockGame} alt="" />
            <img src={lockGame} alt="" />
          </div>

          <div className="title-down">
            <h3>
              Message Mall
            </h3>
            <p>
              Learn to chat and share safely.
            </p>
          </div>
          <div className="gameLevel-down">
            <img src={lockGame} alt="" />
            <img src={lockGame} alt="" />
            <img src={lockGame} alt="" />
          </div>

          <div className='trees tree1'>
            <img src={group18Two} alt="tree" />
          </div>
          <div className='trees tree2'>
            <img src={group5} alt="tree" />
          </div>
          <div className='trees tree3'>
            <img src={group8} alt="tree" />
          </div>
          <div className='trees tree4'>
            <img src={group9} alt="tree" />
          </div>
          <div className='trees tree5'>
            <img src={group6} alt="tree" />
          </div>
          <div className='trees tree6'>
            <img src={group1} alt="tree" />

          </div>

        </div>
        <div className="basePartWrapper">
          <img className="path" src={repeatPart} alt="" />
          <div className="title-up">
            <h3>
              Emoji Avenue
            </h3>
            <p>
              Discover different types of online posts.
            </p>
          </div>
          <div className="gameLevel">
            <img src={lockGame} alt="" />
            <img src={lockGame} alt="" />
            <img src={lockGame} alt="" />
          </div>
          <div className="title-down">
            <h3>
              Secure Street
            </h3>
            <p>
              Keep your online info private.
            </p>
          </div>
          <div className="gameLevel-down">
            <img src={lockGame} alt="" />
            <img src={lockGame} alt="" />
            <img src={lockGame} alt="" />
          </div>

          <div className='trees tree7'>
            <img src={group4One} alt="tree" />
          </div>
          <div className='trees tree8'>
            <img src={group9} alt="tree" />
          </div>
          <div className='trees tree9'>
            <img src={group7} alt="tree" />
          </div>
          <div className='trees tree10'>
            <img src={group24} alt="tree" />
          </div>

        </div>
        <div className="basePartWrapper">
          <img className="path" src={repeatPart} alt="" />
          <div className="title-up">
            <h3>
              Wisdom Way
            </h3>
            <p>
              Think twice before you click.
            </p>
          </div>
          <div className="gameLevel">
            <img src={lockGame} alt="" />
            <img src={lockGame} alt="" />
            <img src={lockGame} alt="" />
          </div>
          <div className="title-down">
            <h3>
              Harmony Hub
            </h3>
            <p>
              Stay happy and healthy online.
            </p>
          </div>
          <div className="gameLevel-down">
            <img src={lockGame} alt="" />
            <img src={lockGame} alt="" />
            <img src={lockGame} alt="" />
          </div>
          <div className='trees tree11'>
            <img src={group11} alt="tree" />
          </div>
          <div className='trees tree12'>
            <img src={group13} alt="tree" />
          </div>
          <div className='trees tree13'>
            <img src={group20} alt="tree" />
          </div>
          <div className='trees tree14'>
            <img src={group12} alt="tree" />
          </div>
          <div className='trees tree15'>
            <img src={bottomLeft2Item} alt="tree" />
          </div>
        </div>
        <div className="basePartWrapper">
          <img className="path" src={repeatPart} alt="" />
          <div className="title-up">
            <h3>
              Bully-Free Boulevard
            </h3>
            <p>
              Stand up to online bullies.
            </p>
          </div>
          <div className="gameLevel">
            <img src={lockGame} alt="" />
            <img src={lockGame} alt="" />
            <img src={lockGame} alt="" />
          </div>
          <div className="title-down">
            <h3>
              Balanced Boulevard
            </h3>
            <p>
              Manage your online and offline time.
            </p>
          </div>
          <div className="gameLevel-down">
            <img src={lockGame} alt="" />
            <img src={lockGame} alt="" />
            <img src={lockGame} alt="" />
          </div>
          <div className='trees tree16'>
            <img src={group14} alt="tree" />
          </div>
          <div className='trees tree17'>
            <img src={group10} alt="tree" />
          </div>
          <div className='trees tree18'>
            <img src={group21} alt="tree" />
          </div>
          <div className='trees tree19'>
            <img src={group7} alt="tree" />
          </div>
          <div className='trees tree20'>
            <img src={group27} alt="tree" />
          </div>
        </div>
        <div className="basePartWrapper">
          <img className="path" src={repeatPart} alt="" />
          <div className="title-up">
            <h3>
              Alert Alley
            </h3>
            <p>
              Spot and avoid online strangers.
            </p>
          </div>
          <div className="gameLevel">
            <img src={lockGame} alt="" />
            <img src={lockGame} alt="" />
            <img src={lockGame} alt="" />
          </div>
          <div className="title-down">
            <h3>
              Friendly Forum
            </h3>
            <p>
              Join and enjoy safe online groups.
            </p>
          </div>
          <div className="gameLevel-down">
            <img src={lockGame} alt="" />
            <img src={lockGame} alt="" />
            <img src={lockGame} alt="" />
          </div>
          <div className='trees tree21'>
            <img src={group7} alt="tree" />
          </div>
          <div className='trees tree22'>
            <img src={group25} alt="tree" />
          </div>
          <div className='trees tree23'>
            <img src={group15} alt="tree" />
          </div>
          <div className='trees tree24'>
            <img src={group3} alt="tree" />
          </div>
        </div>
        <div className="basePartWrapper">
          <img className="path" src={repeatPart} alt="" />
          <div className="title-up">
            <h3>
              Clean Content Corner
            </h3>
            <p>
              Handle and report bad stuff.
            </p>
          </div>
          <div className="gameLevel">
            <img src={lockGame} alt="" />
            <img src={lockGame} alt="" />
            <img src={lockGame} alt="" />
          </div>
          <div className="title-down">
            <h3>
              Trendsetter Tower
            </h3>
            <p>
              Understand online influencers.
            </p>
          </div>
          <div className="gameLevel-down">
            <img src={lockGame} alt="" />
            <img src={lockGame} alt="" />
            <img src={lockGame} alt="" />
          </div>
          <div className='trees tree25'>
            <img src={group} alt="tree" />
          </div>
          <div className='trees tree26'>
            <img src={group29} alt="tree" />
          </div>
          <div className='trees tree27'>
            <img src={group22} alt="tree" />
          </div>
          <div className='trees tree28'>
            <img src={group17} alt="tree" />
          </div>
          <div className='trees tree29'>
            <img src={group26} alt="tree" />
          </div>
        </div>
        <div className="basePartWrapper">
          <img className="path" src={repeatPart} alt="" />
          <div className="title-up">
            <h3>
              Gamer's Gateway
            </h3>
            <p>
              Enjoy games safely.
            </p>
          </div>
          <div className="gameLevel">
            <img src={lockGame} alt="" />
            <img src={lockGame} alt="" />
            <img src={lockGame} alt="" />
          </div>

        </div> */}

      </div>


    </div>
  );
};

export default MapPage;
