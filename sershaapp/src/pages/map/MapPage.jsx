import React from 'react';
import './map.css';
import background from '../../assets/images/map/mask.png'; // Replace with your actual background image path
import {
  bottomLeft,
  bottomLeft1,
  bottomLeft2,
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
  repeatPart,
  repeatPart1,
  repeatPart2,
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
import mergedMapCenter from "../../assets/images/map/mergedMap.png"
import lockGame from "../../assets/images/map/mapItems/lockLevel.png"
import completedGame from "../../assets/images/map/mapItems/completedLevel.png"

const mapsData = [
  { id: 1, item: mergedMapCenter, position: { left: '220%', top: '50%' } },
  { id: 1, item: mergedMapCenter, position: { left: '781.3%', top: '50%' } },
  { id: 2, item: group18Two, position: { left: '0%', top: '85%' } },
  { id: 3, item: group5, position: { left: '38%', top: '37%' } },
  { id: 4, item: group8, position: { left: '58%', top: '83%' } },
  { id: 5, item: topRightZone, position: { left: '59%', top: '15%' } },
  { id: 6, item: group6, position: { left: '79%', top: '63%' } },
  { id: 7, item: group1, position: { left: '99%', top: '85%' } },
  { id: 8, item: bottomLeft, position: { left: '99%', top: '85%' } },
  { id: 9, item: group4One, position: { left: '132%', top: '60%' } },
  { id: 10, item: group9, position: { left: '140%', top: '15%' } },
  { id: 11, item: topLeftZone, position: { left: '135%', top: '5%' } },
  { id: 12, item: group7, position: { left: '161%', top: '60%' } },
  { id: 13, item: group24, position: { left: '180%', top: '85%' } },
  { id: 14, item: bottomRight, position: { left: '180%', top: '88%' } },
  { id: 15, item: group11, position: { left: '200%', top: '37%' } },
  { id: 16, item: group13, position: { left: '220%', top: '83%' } },
  { id: 17, item: group20, position: { left: '220%', top: '15%' } },
  { id: 18, item: topRightZone3, position: { left: '220%', top: '15%' } },
  { id: 19, item: group12, position: { left: '245%', top: '60%' } },
  { id: 20, item: bottomLeft2, position: { left: '263%', top: '90%' } },
  { id: 21, item: group14, position: { left: '280%', top: '35%' } },
  { id: 21, item: group10, position: { left: '300%', top: '83%' } },
  { id: 21, item: group21, position: { left: '300%', top: '15%' } },
  { id: 21, item: topLeftZone1, position: { left: '295%', top: '7%' } },
];

const gameUp = [
  { id: 1, item: false, position: { left: '15%', top: '41%' } },
  { id: 2, item: false, position: { left: '19.5%', top: '40.5%' } },
  { id: 3, item: false, position: { left: '24%', top: '41%' } },
  { id: 4, item: false, position: { left: '95%', top: '41%' } },
  { id: 5, item: false, position: { left: '99.8%', top: '40.5%' } },
  { id: 6, item: false, position: { left: '104.8%', top: '41%' } },
  { id: 7, item: false, position: { left: '175%', top: '41%' } },
  { id: 8, item: false, position: { left: '179.8%', top: '40.5%' } },
  { id: 9, item: false, position: { left: '184.8%', top: '41%' } },
  { id: 10, item: false, position: { left: '255%', top: '41%' } },
  { id: 11, item: false, position: { left: '259.8%', top: '40.5%' } },
  { id: 12, item: false, position: { left: '264.8%', top: '41%' } },
  { id: 13, item: false, position: { left: '335%', top: '41%' } },
  { id: 14, item: false, position: { left: '339.8%', top: '40.5%' } },
  { id: 15, item: false, position: { left: '344.8%', top: '41%' } },
  { id: 16, item: false, position: { left: '415%', top: '41%' } },
  { id: 17, item: false, position: { left: '419.8%', top: '40.5%' } },
  { id: 18, item: false, position: { left: '424.8%', top: '41%' } },
  { id: 19, item: false, position: { left: '495%', top: '41%' } },
  { id: 20, item: false, position: { left: '499.8%', top: '40.5%' } },
  { id: 21, item: false, position: { left: '504.8%', top: '41%' } },
];

const gameDown = [
  { id: 1, item: false, position: { left: '55%', top: '58%' } },
  { id: 2, item: false, position: { left: '59.5%', top: '58%' } },
  { id: 3, item: false, position: { left: '64%', top: '58%' } },
  { id: 4, item: false, position: { left: '135%', top: '58%' } },
  { id: 5, item: false, position: { left: '139.5%', top: '58%' } },
  { id: 6, item: false, position: { left: '144%', top: '58%' } },
  { id: 7, item: false, position: { left: '215%', top: '58%' } },
  { id: 8, item: false, position: { left: '219.5%', top: '58%' } },
  { id: 9, item: false, position: { left: '224%', top: '58%' } },
  { id: 10, item: false, position: { left: '295%', top: '58%' } },
  { id: 11, item: false, position: { left: '299.5%', top: '58%' } },
  { id: 12, item: false, position: { left: '304%', top: '58%' } },
  { id: 13, item: false, position: { left: '375%', top: '58%' } },
  { id: 14, item: false, position: { left: '379.5%', top: '58%' } },
  { id: 15, item: false, position: { left: '384%', top: '58%' } },
  { id: 16, item: false, position: { left: '455%', top: '58%' } },
  { id: 17, item: false, position: { left: '459.8%', top: '58%' } },
  { id: 18, item: false, position: { left: '464.8%', top: '58%' } },
];

const MapPage = () => {
  return (
    <div className="map-container">

      <img src={background} alt="Background" className="map-background" />
      {mapsData.map((item) => (
        <div
          key={item.id}
          className="map-item"
          style={{ left: item.position.left, top: item.position.top }}
        >
          <img
            src={item?.item}
            alt={'map-path'}
            className=""
          />
        </div>
      ))}
      {gameUp.map((game) => (
        <div
          key={game.id}
          className="map-item"
          style={{ left: game.position.left, top: game.position.top }}
        >
          <img src={game?.item ? completedGame : lockGame} alt="Shadow" className="map-game" />
          {/* <img src={''} alt="Line" className="map-line" /> */}

        </div>

      ))}
      {gameDown.map((game) => (
        <div
          key={game.id}
          className="map-item"
          style={{ left: game.position.left, top: game.position.top }}
        >
          <img src={game?.item ? completedGame : lockGame} alt="Shadow" className="map-game" />
          {/* <img src={''} alt="Line" className="map-line" /> */}

        </div>

      ))}
    </div>
  );
};

export default MapPage;