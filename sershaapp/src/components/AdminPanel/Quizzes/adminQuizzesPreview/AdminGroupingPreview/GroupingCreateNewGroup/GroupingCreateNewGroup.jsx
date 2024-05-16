import React, { useState } from 'react'
import { useGlobalContext } from '../../../../../../context/context';
import closeButton from '../../../../../../assets/images/adminPanel/closeButton.png'

import './groupingCreateNewGroup.css'

const GroupingCreateNewGroup = () => {
  const { groupingCreateNew,
    setGroupingCreateNew,
    allGrouping,
    setAllGrouping } = useGlobalContext();

  const [groupingNewGroup, setgroupingNewGroup] = useState({
    GroupOne: {
      Title: "",
      Words: ['', '', ''],
    },
    GroupTwo: {
      Title: "",
      Words: ['', '', ''],
    },
  },
  );

  const handleSubmit = () => {
    // Construct the new Groups object
    const newGrouping = {
      GroupOne: {
        Title: groupingNewGroup.GroupOne.Title,
        Words: [...groupingNewGroup.GroupOne.Words]
      },
      GroupTwo: {
        Title: groupingNewGroup.GroupTwo.Title,
        Words: [...groupingNewGroup.GroupTwo.Words]
      }
    };

    // Update the list of groups
    setAllGrouping([...allGrouping, newGrouping]);

    // Reset form fields
    setgroupingNewGroup({
      GroupOne: {
        Title: "",
        Words: ['', '', ''],
      },
      GroupTwo: {
        Title: "",
        Words: ['', '', ''],
      },
    });


    // Close the create new groups form
    setGroupingCreateNew(false);
  };

  // Function to update the option value in state
  // const handleOptionChange = (index, value) => {
  //   const updatedOptions = [...rightAnswerNewQuestion.options];
  //   updatedOptions[index].option = value;
  //   setRightAnswerNewQuestion({ ...rightAnswerNewQuestion, options: updatedOptions });
  // };

  // // Function to update the checkbox value in state
  // const handleCheckboxChange = (index, isChecked) => {
  //   const updatedOptions = [...rightAnswerNewQuestion.options];
  //   updatedOptions[index].isCorrect = isChecked;
  //   setRightAnswerNewQuestion({ ...rightAnswerNewQuestion, options: updatedOptions });
  //   console.log(rightAnswerNewQuestion)
  // };

  const handleAddOption = () => {
    // Create a copy of the current state
    const updatedGroupingNewGroup = { ...groupingNewGroup };

    // Add a new empty word to both groups
    updatedGroupingNewGroup.GroupOne.Words.push('');
    updatedGroupingNewGroup.GroupTwo.Words.push('');

    // Update the state with the modified groups
    setgroupingNewGroup(updatedGroupingNewGroup);
  };

  return (
    <div className="newGroupingContainer">
      <div className="close-btn" onClick={() => setGroupingCreateNew(false)}><img src={closeButton} alt='close' /></div>
      <h3 className="p-3 text-center">Create New Groups</h3>

      <div className='groupsWrapper'>
        <div className='groupOneFormWrapper'>
          <div>
            <h5>Group 1</h5>
          </div>

          <div>
            <label className='groupingFieldLabel'>Group name:</label>
            <input className='groupingTitleInput' type="text" value={groupingNewGroup.GroupOne.Title} placeholder='Name' onChange={(e) => setGroupingNewGroup({ ...groupingNewGroup.GroupOne, Title: e.target.value })} />
          </div>

          <div>
            <span className='groupItemsTitle'>Group items</span>
            {groupingNewGroup.GroupOne.Words.map((word, index) => (
              <>
                <div className='groupingOptionBox' key={index}>
                  <label>
                    <input
                      className='postProfileName'
                      type="text"
                      value={word}
                      placeholder={`Item ${index + 1}`}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                    />
                  </label>
                </div>
              </>
            ))}
          </div>

        </div>

        <div className='groupTwoFormWrapper'>
          <div>
            <h5>Group 2</h5>
          </div>

          <div>
            <label className='groupingFieldLabel'>Group name:</label>
            <input className='groupingTitleInput' type="text" value={groupingNewGroup.GroupTwo.Title} placeholder='Name' onChange={(e) => setGroupingNewGroup({ ...groupingNewGroup.GroupTwo, Title: e.target.value })} />
          </div>

          <div>
            <span className='groupItemsTitle'>Group items</span>
            {groupingNewGroup.GroupTwo.Words.map((word, index) => (
              <>
                <div className='groupingOptionBox' key={index}>
                  <label>
                    <input
                      className='postProfileName'
                      type="text"
                      value={word}
                      placeholder={`Item ${index + 1}`}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                    />
                  </label>
                </div>
              </>
            ))}
          </div>

        </div>

      </div>

      <div className='groupingNewOptionFieldAdd'>
        <button className='groupingAddNewOptionFieldBtn' onClick={handleAddOption}>
          <div className='groupingIncrementCharacter'>
            +
          </div>
        </button>
      </div>

      <button className='newPostBtn' onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default GroupingCreateNewGroup