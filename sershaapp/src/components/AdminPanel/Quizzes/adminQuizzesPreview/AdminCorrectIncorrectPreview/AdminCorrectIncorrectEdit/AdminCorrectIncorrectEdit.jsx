// import React, { useState, useEffect } from 'react';
// import { useGlobalContext } from '../../../../../../context/context';
// import closeButton from '../../../../../../assets/images/adminPanel/closeButton.png';
// import './adminCorrectIncorrectEdit.css';
// import axios from 'axios';

// const AdminCorrectIncorrectEdit = () => {
//   const {
//     baseUrl,
//     editingCorrectIncorrect,
//     setEditingCorrectIncorrect,
//     isCorrectIncorrectEdit,
//     setIsCorrectIncorrectEdit,
//     allCorrectIncorrect,
//     setAllCorrectIncorrect,
//   } = useGlobalContext();

//   const [correctIncorrectEditStatement, setCorrectIncorrectEditStatement] = useState({
//     text: '',
//     isCorrect: null,
//   });

//   useEffect(() => {
//     if (editingCorrectIncorrect) {
//       setCorrectIncorrectEditStatement(editingCorrectIncorrect);
//     }
//   }, [editingCorrectIncorrect]);
//   console.log(`CORRECT ${correctIncorrectEditStatement}`)

//   const handleSubmit = async () => {

//     await axios.put(`${baseUrl}/Quizzes/${correctIncorrectEditStatement.id}`, correctIncorrectEditStatement);
//     setAllCorrectIncorrect(prevCorrectIncorrect => prevCorrectIncorrect.questions.map(quest => quest.id === correctIncorrectEditStatement.id ? correctIncorrectEditStatement : quest));
//     setIsPostEdit(false);

//     // // Update the edited statement
//     // const updatedStatements = allCorrectIncorrect.questions.map((statement, index) => {
//     //   if (index === editingCorrectIncorrect.index) {
//     //     return correctIncorrectEditStatement;
//     //   }
//     //   return statement;
//     // });

//     // // Update the list of statements
//     // setAllCorrectIncorrect(updatedStatements);

//     // Reset form fields
//     setCorrectIncorrectEditStatement({
//       Statement: '',
//       isTrue: null,
//       Stage: '',
//     });

//     // Close the edit popup
//     setIsCorrectIncorrectEdit(false);
//   };

//   const handleCheckboxChange = (isChecked) => {
//     setCorrectIncorrectEditStatement({ ...correctIncorrectEditStatement, isTrue: isChecked });
//   };

//   return (
//     <div className="correctIncorrectEditContainer">
//       <div className="close-btn" onClick={() => setIsCorrectIncorrectEdit(false)}>
//         <img src={closeButton} alt="close" />
//       </div>
//       <h3 className="p-3 text-center">Edit Statement</h3>
//       <div>
//         <label className="correctIncorrectStatementFieldLabel">Statement</label>
//         <input
//           className="correctIncorrectStatementInput"
//           style={{ marginBottom: '1rem' }}
//           type="text"
//           value={correctIncorrectEditStatement.text}
//           placeholder="Statement"
//           onChange={(e) => setCorrectIncorrectEditStatement({ ...correctIncorrectEditStatement, text: e.target.value })}
//         />

//       </div>

//       <div className="correctIncorrectOptions">
//         <div className="checkBoxOptions">
//           <label className="correctIncorrectOptionsFieldLabel">If the statement is true - check the box</label>
//           <input
//             className="correctIncorrectTrueCheckbox"
//             type="checkbox"
//             checked={correctIncorrectEditStatement.isCorrect}
//             onChange={(e) => handleCheckboxChange(e.target.checked)}
//           />
//         </div>
//       </div>

//       <div style={{ marginTop: '1rem' }}>
//         <label>Bundle</label>
//         <select
//           className="postBundles"
//           type="dropdown"
//           value={correctIncorrectEditStatement.Stage}
//           placeholder="Choose a bundle"
//           onChange={(e) => setCorrectIncorrectEditStatement({ ...correctIncorrectEditStatement, Stage: e.target.value })}
//         >
//           <option value="Easy">Easy Bundle</option>
//           <option value="Medium">Medium Bundle</option>
//           <option value="Hard">Hard Bundle</option>
//         </select>
//       </div>

//       <button className="editStatementCorrectIncorrectBtn" onClick={handleSubmit}>
//         Submit
//       </button>
//     </div>
//   );
// };

// export default AdminCorrectIncorrectEdit;
