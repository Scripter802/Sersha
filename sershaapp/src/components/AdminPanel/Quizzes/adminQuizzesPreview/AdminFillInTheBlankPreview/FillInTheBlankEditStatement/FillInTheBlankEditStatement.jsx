// import React, { useState, useEffect } from 'react';
// import { useGlobalContext } from '../../../../../../context/context';
// import closeButton from '../../../../../../assets/images/adminPanel/closeButton.png';

// import './fillInTheBlankEditStatement.css';

// const FillInTheBlankEditStatement = () => {
//   const {
//     allFillInTheBlankStatements,
//     setAllFillInTheBlankStatements,
//     editingFillInTheBlank,
//     setEditingFillInTheBlank,
//     isFillInTheBlankEdit,
//     setIsFillInTheBlankEdit
//   } = useGlobalContext();

//   const [editedStatement, setEditedStatement] = useState({
//     StatementFirst: "",
//     StatementSecond: "",
//     Options: ['', '', ''],
//     CorrectAnswer: '',
//   });

//   useEffect(() => {
//     if (editingFillInTheBlank) {
//       setEditedStatement(editingFillInTheBlank);
//     }
//     console.log(editingFillInTheBlank, editedStatement)
//   }, [editingFillInTheBlank]);

//   // Ensure options array is initialized
//   useEffect(() => {
//     if (!editedStatement.options || editedStatement.options.length === 0) {
//       setEditedStatement(prevState => ({
//         ...prevState,
//         options: ['', '', '']
//       }));
//     }
//   }, [editedStatement]);

//   const handleSubmit = () => {
//     const updatedAllFillInTheBlankStatements = allFillInTheBlankStatements.map(statement => {
//       if (statement === editingFillInTheBlank) {
//         return editedStatement;
//       }
//       return statement;
//     });

//     setAllFillInTheBlankStatements(updatedAllFillInTheBlankStatements);
//     setIsFillInTheBlankEdit(false);
//   };

//   const handleOptionChange = (index, value) => {
//     const updatedOptions = [...editedStatement.options];
//     updatedOptions[index] = value;
//     setEditedStatement({ ...editedStatement, options: updatedOptions });
//   };

//   const handleAddOption = () => {
//     setEditedStatement({
//       ...editedStatement,
//       options: [...editedStatement.options, '']
//     });
//   };

//   return (
//     <div className="editFillInTheBlankContainer">
//       <div className="close-btn" onClick={() => setIsFillInTheBlankEdit(false)}>
//         <img src={closeButton} alt='close' />
//       </div>
//       <h3 className="p-3 text-center">Edit Statement</h3>

//       <div>
//         <label className='fillInTheBlankStatementOneFieldLabel'>Statement 1 part</label>
//         <input
//           className='editFillInTheBlankInput'
//           type="text"
//           value={editedStatement.statementFirst}
//           placeholder=''
//           onChange={(e) => setEditedStatement({ ...editedStatement, statementFirst: e.target.value })}
//         />
//       </div>
//       <div>
//         <label className='fillInTheBlankCorrectFieldLabel'>Correct answer</label>
//         <input
//           className='editFillInTheBlankInput'
//           type="text"
//           value={editedStatement.correctAnswer}
//           placeholder=''
//           onChange={(e) => setEditedStatement({ ...editedStatement, correctAnswer: e.target.value })}
//         />
//       </div>
//       <div>
//         <label className='fillInTheBlankStatementTwoFieldLabel'>Statement 2 part</label>
//         <input
//           className='editFillInTheBlankInput'
//           type="text"
//           value={editedStatement.statementSecond}
//           placeholder=''
//           onChange={(e) => setEditedStatement({ ...editedStatement, statementSecond: e.target.value })}
//         />
//       </div>

//       <div className='editFillInTheBlankOptions'>
//         <label className='fillInTheBlankOptionsFieldLabel'>Options</label>
//         {editedStatement.options && editedStatement.options.map((option, index) => (
//           <div className='fillInTheBlankOptionBox' key={index}>
//             <label>
//               <input
//                 className='postProfileName'
//                 type="text"
//                 value={option}
//                 placeholder={`Option ${index + 1}`}
//                 onChange={(e) => handleOptionChange(index, e.target.value)}
//               />
//             </label>
//           </div>
//         ))}
//       </div>

//       <div className='editFillInTheBlankNewOptionFieldAdd'>
//         <button className='editFillInTheBlankAddNewOptionFieldBtn' onClick={handleAddOption}>
//           <div className='fillInTheBlankIncrementCharacter'>+</div>
//         </button>
//       </div>

//       <button className='fillInTheBlankOptionBoxSubmitBtn' onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// }

// export default FillInTheBlankEditStatement;
