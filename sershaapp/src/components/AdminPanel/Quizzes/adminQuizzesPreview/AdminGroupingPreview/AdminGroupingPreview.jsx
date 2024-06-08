import { useEffect } from 'react';
import closeButton from '../../../../../assets/images/adminPanel/closeButton.png';
import { useGlobalContext } from '../../../../../context/context';
import GroupingCreateNewGroup from './GroupingCreateNewGroup/GroupingCreateNewGroup';
import GroupingEditGroup from './GroupingEditGroup/GroupingEditGroup';


import './adminGroupingPreview.css';
import axios from 'axios';

const AdminGroupingPreview = () => {
  const { groupingAPI, groupingCreateNew,
    setGroupingCreateNew,
    allGrouping,
    setAllGrouping,
    setEditingGrouping,
    isGroupingEdit,
    setIsGroupingEdit,
  } = useGlobalContext();

  const groups = [
    {
      GroupOne: {
        Title: "Fruits",
        Words: ['Watermelon', 'Strawberries', 'Mango'],
      },
      GroupTwo: {
        Title: "Vegetables",
        Words: ['Mushroom', 'Potato', 'Pumpkin'],
      },
    },
    {
      GroupOne: {
        Title: "Fruits",
        Words: ['Watermelon', 'Strawberries', 'Mango'],
      },
      GroupTwo: {
        Title: "Vegetables",
        Words: ['Mushroom', 'Potato', 'Pumpkin'],
      },
    },
    {
      GroupOne: {
        Title: "Fruits",
        Words: ['Watermelon', 'Strawberries', 'Mango'],
      },
      GroupTwo: {
        Title: "Vegetables",
        Words: ['Mushroom', 'Potato', 'Pumpkin'],
      },
    },
  ]

  useEffect(() => {
    const fetchRightAnswerQuestions = async () => {
      try {
        const response = await axios.get(groupingAPI);
        setAllGrouping(response.data);

        console.log(allGrouping)
      } catch (error) {
        console.error('Error fetching right answer questions:', error);
      }
    };

    fetchRightAnswerQuestions();
  }, [setAllGrouping]);

  const handleEditGroup = (index) => {
    setEditingGrouping(groups[index]);
    setIsGroupingEdit(true);
  };

  const handleDeleteGroup = (index) => {
    // Add your delete logic here
  };

  return (
    <>
      {groupingCreateNew ? (
        <GroupingCreateNewGroup />
      ) : isGroupingEdit ? (
        <GroupingEditGroup />
      ) : (

        <div className='groupingWrapperList'>
          <div className='groupingBtnWrapper'>
            <h3 className="quizTitle">Grouping</h3>
            <button className="createNewGroupBtn" onClick={() => setGroupingCreateNew(true)}>Create New Group</button>
          </div>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>No.</th>
                <th>Group 1</th>
                <th>Words</th>
                <th>Group 2</th>
                <th>Words</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {groups && groups.map((group, index) =>
                <tr key={index}>
                  <td data-label="No.">{index + 1}</td>
                  <td data-label="Group 1">{group.GroupOne.Title}</td>
                  <td data-label="Words">{group.GroupOne.Words.map((word, index) => (
                    <p key={index}>{word}</p>
                  ))}</td>
                  <td data-label="Group 2">{group.GroupTwo.Title}</td>
                  <td data-label="Words">{group.GroupTwo.Words.map((word, index) => (
                    <p key={index}>{word}</p>
                  ))}</td>

                  <td data-label="Edit/Delete" className='settingsData'>
                    <button className="edit-btn" onClick={() => handleEditGroup(index)}>Edit</button>

                    <button className="delete-btn" onClick={() => handleDeleteGroup(index)}>Delete</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )
      }
    </>
  )
}

export default AdminGroupingPreview