import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../../../context/context';
import './adminPanelFriendOrFoe.css';
import FriendOrFoeCreateNew from './FriendOrFoeCreateNew/FriendOrFoeCreateNew';
import FriendOrFoeEdit from './FriendOrFoeEdit/FriendOrFoeEdit';
import axios from 'axios';

const AdminPanelFriendOrFoe = () => {
  const {
    baseUrl,
    baseUrlImage,
    friendOrFoeCreateNew,
    setFriendOrFoeCreateNew,
    isFriendOrFoeEdit,
    setIsFriendOrFoeEdit,
    editingFriendOrFoe,
    setEditingFriendOrFoe,
    allFriendOrFoeAssignments,
    setAllFriendOrFoeAssignments } = useGlobalContext();
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
      Status: 'Ovo je status na profilu',
      Stage: 'Easy',
    },
    {
      Image: null,
      AuthorName: '',
      PostContent: 'Ovo je probni post',
      CorrectAnswer: '',
      Status: 'Ovo je status na profilu',
      Stage: 'Easy',
    },
    {
      Image: null,
      AuthorName: '',
      PostContent: 'Ovo je probni post',
      CorrectAnswer: '',
      Status: 'Ovo je status na profilu',
      Stage: 'Easy',
    },
  ]

  useEffect(() => {
    const fetchAllQuizzes = async () => {
      try {
        const response = await axios.get(`${baseUrl}/Quizzes/ListMinigameQuestionsByTypeAndDifficulty/0/6`);
        setAllFriendOrFoeAssignments(response.data);
      } catch (error) {
        console.error('Error fetching right answer questions:', error);
      }
    };

    fetchAllQuizzes();
  }, [friendOrFoeCreateNew, editingFriendOrFoe]);
  console.log(allFriendOrFoeAssignments)

  const handleEditFriendOrFoe = (index) => {
    setEditingFriendOrFoe(index);
    setIsFriendOrFoeEdit(true)
  };

  const handleDeleteFriendOrFoe = (index) => {

  };


  return (
    <>
      {friendOrFoeCreateNew ? (
        <FriendOrFoeCreateNew />
      ) : isFriendOrFoeEdit ? (
        <FriendOrFoeEdit />
      ) : (
        <div className='emojiEmotionsWrapperList'>
          <div className='createNewEmojiEmotionsBtnWrapper'>
            <h3 className="emojiEmotionsTitle">Friend Or Foe</h3>
            <button className="createNewEmojiEmotionsBtn" onClick={() => (setFriendOrFoeCreateNew(true))}>Create New Question</button>
          </div>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>No.</th>
                <th>Profile Name</th>
                <th>Gender</th>
                <th>Image</th>
                <th>Profile Description</th>
                <th>Stage</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {allFriendOrFoeAssignments && allFriendOrFoeAssignments.map((post, index) =>
                <tr key={index}>
                  <td data-label="No.">{index + 1}</td>
                  <td data-label="AuthorName">{post.text}</td>
                  <td data-label="AuthorName">Male</td>
                  <td data-label="Image"><img src={`${baseUrlImage}${post.imagePath}`} alt="Post Image" /></td>
                  <td data-label="AuthorName">{post.content}</td>
                  <td data-label="Bundle">Easy</td>

                  <td data-label="Edit/Delete" className='settingsData'>
                    <button className="edit-btn" onClick={() => handleEditFriendOrFoe(index)}>Edit</button>

                    <button className="delete-btn" onClick={() => handleDeleteFriendOrFoe(index)}>Delete</button>
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

export default AdminPanelFriendOrFoe