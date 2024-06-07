import { useState } from 'react';
import { useGlobalContext } from '../../../../context/context';
import './adminPanelSnapJudgment.css';

const AdminPanelSnapJudgment = () => {
  const { isSnapJudgmentEdit,
    setIsSnapJudgmentEdit,
    editingSnapJudgment,
    setEditingSnapJudgment, } = useGlobalContext();
  // const [postImage, setPostImage] = useState(null);
  // const [postAuthor, setPostAuthor] = useState('');
  // const [postContent, setPostContent] = useState('');
  // const [correctAnswer, setCorrectAnswer] = useState('');

  const allSnapJudgment = [
    {
      Image: null,
      AuthorName: 'John',
      PostContent: 'Ovo je probni post',
      CorrectAnswer: '',
      Stage: '',
    },
    {
      Image: null,
      AuthorName: '',
      PostContent: 'Ovo je probni post',
      CorrectAnswer: '',
      Stage: '',
    },
    {
      Image: null,
      AuthorName: '',
      PostContent: 'Ovo je probni post',
      CorrectAnswer: '',
      Stage: '',
    },
  ]

  // const handleEditSnapJudgment = (index) => {
  setEditingSnapJudgment(index);
  setIsSnapJudgmentEdit(true)
  // };

  // const handleDeleteSnapJudgment = (index) => {

  // };


  return (
    <>
      {/* {SnapJudgmentCreateNew ? (
        <AdminSnapJudgmentCreateNew />
      ) : isSnapJudgmentEdit ? (
        <AdminSnapJudgmentEdit />
      ) : ( */}
      <div className='SnapJudgmentWrapperList'>
        <div className='createNewSnapJudgmentBtnWrapper'>
          <h3 className="snapJudgmentTitle">Snap Judgment</h3>
          <button className="createNewSnapJudgmentBtn" onClick={() => (setSnapJudgmentCreateNew(true))}>Create New Question</button>
        </div>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>No.</th>
              <th>Image</th>
              <th>Author Name</th>
              <th>Post Content</th>
              <th>Correct Answer</th>
              <th>Stage</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {allSnapJudgment && allSnapJudgment.map((post, index) =>
              <tr key={index}>
                <td data-label="No.">{index + 1}</td>
                <td data-label="Image"><img src={post.Image} alt="Post Image" /></td>
                <td data-label="AuthorName">{post.AuthorName}</td>
                <td data-label="AuthorName">{post.PostContent}</td>
                <td data-label="AuthorName">{post.CorrectAnswer}</td>
                <td data-label="Bundle">{post.Stage}</td>

                <td data-label="Edit/Delete" className='settingsData'>
                  <button className="edit-btn" onClick={() => handleEditSnapJudgment(index)}>Edit</button>

                  <button className="delete-btn" onClick={() => handleDeleteSnapJudgment(index)}>Delete</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* )
      } */}
    </>
  )
}

export default AdminPanelSnapJudgment
