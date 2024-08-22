import React, { useState } from 'react';
import { useGlobalContext } from '../../../../../../context/context';
import closeButton from '../../../../../../assets/images/adminPanel/closeButton.png';

import './groupingCreateNewGroup.css';

const GroupingCreateNewGroup = () => {
  const {
    groupingCreateNew,
    setGroupingCreateNew,
    allGrouping,
    setAllGrouping,
  } = useGlobalContext();

  const [groupingNewGroup, setGroupingNewGroup] = useState({
    GroupOne: {
      Title: "",
      Words: ['', '', ''],
    },
    GroupTwo: {
      Title: "",
      Words: ['', '', ''],
    },
  });

  const handleSubmit = () => {
    const newGrouping = {
      type: 3,
      difficulty: 0,
      questions: [
        {
          text: "",
          groups: [
            {
              groupName: "",
              items: [
                {
                  item: ""
                },
                {
                  item: ""
                },
                {
                  item: ""
                }
              ]
            },
            {
              groupName: "",
              items: [
                {
                  item: ""
                },
                {
                  item: ""
                },
                {
                  item: ""
                }
              ]
            }
          ]
        }
      ]
    };

    setAllGrouping([...allGrouping, newGrouping]);

    setGroupingNewGroup({
      "type": 3,
      "difficulty": 0,
      "questions": [
        {
          "text": "string",
          "groups": [
            {
              "groupName": "Banane",
              "items": [
                {
                  "item": "string"
                }
              ]
            },
            {
              "groupName": "Jagode",
              "items": [
                {
                  "item": "string"
                }
              ]
            }
          ]
        }
      ]
    })

    setGroupingCreateNew(false);
  };

  const handleOptionChange = (group, index, value) => {
    const updatedGroupingNewGroup = { ...groupingNewGroup };
    updatedGroupingNewGroup[group].Words[index] = value;
    setGroupingNewGroup(updatedGroupingNewGroup);
  };

  const handleAddOption = () => {
    const updatedGroupingNewGroup = { ...groupingNewGroup };
    updatedGroupingNewGroup.GroupOne.Words.push('');
    updatedGroupingNewGroup.GroupTwo.Words.push('');
    setGroupingNewGroup(updatedGroupingNewGroup);
  };

  return (
    <div className="newGroupingContainer">
      <div className="close-btn" onClick={() => setGroupingCreateNew(false)}>
        <img src={closeButton} alt='close' />
      </div>
      <h3 className="p-3 text-center">Create New Groups</h3>

      <div className='groupsWrapper'>
        <div className='groupFormWrapper'>
          <div>
            <h5>Group 1</h5>
          </div>
          <div>
            <label className='groupingFieldLabel'>Group name:</label>
            <input
              className='groupingTitleInput'
              type="text"
              value={groupingNewGroup.GroupOne.Title}
              placeholder='Name'
              onChange={(e) => setGroupingNewGroup({ ...groupingNewGroup, GroupOne: { ...groupingNewGroup.GroupOne, Title: e.target.value } })}
            />
          </div>
          <div>
            <span className='groupItemsTitle'>Group items</span>
            {groupingNewGroup.GroupOne.Words.map((word, index) => (
              <div className='groupingOptionBox' key={index}>
                <label>
                  <input
                    className='postProfileName'
                    type="text"
                    value={word}
                    placeholder={`Item ${index + 1}`}
                    onChange={(e) => handleOptionChange('GroupOne', index, e.target.value)}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className='groupFormWrapper'>
          <div>
            <h5>Group 2</h5>
          </div>
          <div>
            <label className='groupingFieldLabel'>Group name:</label>
            <input
              className='groupingTitleInput'
              type="text"
              value={groupingNewGroup.GroupTwo.Title}
              placeholder='Name'
              onChange={(e) => setGroupingNewGroup({ ...groupingNewGroup, GroupTwo: { ...groupingNewGroup.GroupTwo, Title: e.target.value } })}
            />
          </div>
          <div>
            <span className='groupItemsTitle'>Group items</span>
            {groupingNewGroup.GroupTwo.Words.map((word, index) => (
              <div className='groupingOptionBox' key={index}>
                <label>
                  <input
                    className='postProfileName'
                    type="text"
                    value={word}
                    placeholder={`Item ${index + 1}`}
                    onChange={(e) => handleOptionChange('GroupTwo', index, e.target.value)}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='groupingNewOptionFieldAdd'>
        <button className='groupingAddNewOptionFieldBtn' onClick={handleAddOption}>
          <div className='groupingIncrementCharacter'>+</div>
        </button>
      </div>

      <button className='newPostBtn' onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default GroupingCreateNewGroup;
