import { useState } from 'react';
import { useGlobalContext } from '../../../../context/context';
import './adminPanelEmojiEmotions.css';
import EmojiEmotionsCreateNew from './EmojiEmotionsCreateNew/EmojiEmotionsCreateNew';
import EmojiEmotionsEdit from './EmojiEmotionsEdit/EmojiEmotionsEdit';

const AdminPanelEmojiEmotions = () => {
  const {
    emojiEmotionsCreateNew,
    setEmojiEmotionsCreateNew,
    isEmojiEmotionsEdit,
    setIsEmojiEmotionsEdit,
    editingEmojiEmotions,
    setEditingEmojiEmotions,
    allEmojiEmotionsAssignments,
    setAllEmojiEmotionsAssignments } = useGlobalContext();
  // const [postImage, setPostImage] = useState(null);
  // const [postAuthor, setPostAuthor] = useState('');
  // const [postContent, setPostContent] = useState('');
  // const [correctAnswer, setCorrectAnswer] = useState('');

  const AllEmojis = [
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

  const handleEditEmojiEmotions = (index) => {
    setEditingEmojiEmotions(index);
    setIsEmojiEmotionsEdit(true)
  };

  // const handleDeleteEmojiEmotions = (index) => {

  // };


  return (
    <>
      {emojiEmotionsCreateNew ? (
        <EmojiEmotionsCreateNew />
      ) : isEmojiEmotionsEdit ? (
        <EmojiEmotionsEdit />
      ) : (
        <div className='emojiEmotionsWrapperList'>
          <div className='createNewEmojiEmotionsBtnWrapper'>
            <h3 className="emojiEmotionsTitle">Emoji Emotions</h3>
            <button className="createNewEmojiEmotionsBtn" onClick={() => (setEmojiEmotionsCreateNew(true))}>Create New Question</button>
          </div>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>No.</th>
                <th>Emoji</th>
                <th>Answers</th>
                <th>Correct Answers</th>
                <th>Stage</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {AllEmojis && AllEmojis.map((post, index) =>
                <tr key={index}>
                  <td data-label="No.">{index + 1}</td>
                  <td data-label="Image"><img src={post.Image} alt="Post Image" /></td>
                  <td data-label="AuthorName">{post.AuthorName}</td>
                  <td data-label="AuthorName">{post.CorrectAnswer}</td>
                  <td data-label="Bundle">{post.Stage}</td>

                  <td data-label="Edit/Delete" className='settingsData'>
                    <button className="edit-btn" onClick={() => handleEditEmojiEmotions(index)}>Edit</button>

                    <button className="delete-btn" onClick={() => handleDeleteEmojiEmotions(index)}>Delete</button>
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

export default AdminPanelEmojiEmotions