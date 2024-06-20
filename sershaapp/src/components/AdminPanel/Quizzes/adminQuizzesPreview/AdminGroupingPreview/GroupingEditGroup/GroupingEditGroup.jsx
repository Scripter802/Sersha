// import React, { useState, useEffect } from 'react';
// import { useGlobalContext } from '../../../../../../context/context';
// import closeButton from '../../../../../../assets/images/adminPanel/closeButton.png';

// import './groupingEditGroup.css';

// const GroupingEditGroup = () => {
//   const {
//     allGrouping,
//     setAllGrouping,
//     editingGrouping,
//     setEditingGrouping,
//     isGroupingEdit,
//     setIsGroupingEdit,
//   } = useGlobalContext();

//   const [editedGrouping, setEditedGrouping] = useState({
//     GroupOne: {
//       Title: "",
//       Words: ['', '', ''],
//     },
//     GroupTwo: {
//       Title: "",
//       Words: ['', '', ''],
//     },
//   });

//   useEffect(() => {
//     if (isGroupingEdit && editingGrouping) {
//       setEditedGrouping(editingGrouping);
//     }
//   }, [isGroupingEdit, editingGrouping]);

//   const handleSubmit = () => {
//     const updatedAllGrouping = allGrouping.map(group => {
//       if (group === editingGrouping) {
//         return editedGrouping;
//       }
//       return group;
//     });

//     setAllGrouping(updatedAllGrouping);
//     setIsGroupingEdit(false);
//   };

//   const handleOptionChange = (group, index, value) => {
//     const updatedEditedGrouping = { ...editedGrouping };
//     updatedEditedGrouping[group].Words[index] = value;
//     setEditedGrouping(updatedEditedGrouping);
//   };

//   const handleAddOption = () => {
//     const updatedEditedGrouping = { ...editedGrouping };
//     updatedEditedGrouping.GroupOne.Words.push('');
//     updatedEditedGrouping.GroupTwo.Words.push('');
//     setEditedGrouping(updatedEditedGrouping);
//   };

//   return (
//     <div className="editGroupingContainer">
//       <div className="close-btn" onClick={() => setIsGroupingEdit(false)}>
//         <img src={closeButton} alt='close' />
//       </div>
//       <h3 className="p-3 text-center">Edit Group</h3>

//       <div className='editGroupsWrapper'>
//         {/* Group One Form */}
//         <div className='groupFormWrapper'>
//           <div>
//             <h5>Group 1</h5>
//           </div>
//           <div>
//             <label className='groupingFieldLabel'>Group name:</label>
//             <input
//               className='groupingTitleInput'
//               type="text"
//               value={editedGrouping.GroupOne.Title}
//               placeholder='Name'
//               onChange={(e) => setEditedGrouping({ ...editedGrouping, GroupOne: { ...editedGrouping.GroupOne, Title: e.target.value } })}
//             />
//           </div>
//           <div>
//             <span className='groupItemsTitle'>Group items</span>
//             {editedGrouping.GroupOne.Words.map((word, index) => (
//               <div className='groupingOptionBox' key={index}>
//                 <label>
//                   <input
//                     className='postProfileName'
//                     type="text"
//                     value={word}
//                     placeholder={`Item ${index + 1}`}
//                     onChange={(e) => handleOptionChange('GroupOne', index, e.target.value)}
//                   />
//                 </label>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Group Two Form */}
//         <div className='groupFormWrapper'>
//           <div>
//             <h5>Group 2</h5>
//           </div>
//           <div>
//             <label className='groupingFieldLabel'>Group name:</label>
//             <input
//               className='groupingTitleInput'
//               type="text"
//               value={editedGrouping.GroupTwo.Title}
//               placeholder='Name'
//               onChange={(e) => setEditedGrouping({ ...editedGrouping, GroupTwo: { ...editedGrouping.GroupTwo, Title: e.target.value } })}
//             />
//           </div>
//           <div>
//             <span className='groupItemsTitle'>Group items</span>
//             {editedGrouping.GroupTwo.Words.map((word, index) => (
//               <div className='groupingOptionBox' key={index}>
//                 <label>
//                   <input
//                     className='postProfileName'
//                     type="text"
//                     value={word}
//                     placeholder={`Item ${index + 1}`}
//                     onChange={(e) => handleOptionChange('GroupTwo', index, e.target.value)}
//                   />
//                 </label>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className='groupingNewOptionFieldAdd'>
//         <button className='groupingAddNewOptionFieldBtn' onClick={handleAddOption}>
//           <div className='groupingIncrementCharacter'>+</div>
//         </button>
//       </div>

//       <button className='newPostBtn' onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// }

// export default GroupingEditGroup;
