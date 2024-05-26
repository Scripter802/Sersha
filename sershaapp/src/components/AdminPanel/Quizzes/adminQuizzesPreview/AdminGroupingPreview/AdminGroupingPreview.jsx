import closeButton from '../../../../../assets/images/adminPanel/closeButton.png';
import { useGlobalContext } from '../../../../../context/context';
import GroupingCreateNewGroup from './GroupingCreateNewGroup/GroupingCreateNewGroup';


import './adminGroupingPreview.css';

const AdminGroupingPreview = () => {
  const { groupingCreateNew,
    setGroupingCreateNew,
    allGrouping,
    setAllGrouping } = useGlobalContext();

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

  return (
    <>
      {groupingCreateNew === true ? (
        <GroupingCreateNewGroup />) : (
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
                  <td data-label="Words">{group.GroupOne.Words.map(word => (
                    <p>{word}</p>
                  ))}</td>
                  <td data-label="Group 2">{group.GroupTwo.Title}</td>
                  <td data-label="Words">{group.GroupTwo.Words.map(word => (
                    <p>{word}</p>
                  ))}</td>

                  <td data-label="Edit/Delete" className='settingsData'>
                    <button className="edit-btn" onClick={() => handleEdit(index)}>Edit</button>

                    <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
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