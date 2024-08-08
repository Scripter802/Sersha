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
        const response = await axios.get(`${baseUrl}/Quizzes`);
        console.log(`response: ${response.data}`);
        const filteredData = response.data.filter(res => res.questions[0].type === 6);

        // Avoid adding duplicates
        setAllFriendOrFoeAssignments(prev => {
          const newAssignments = filteredData.filter(newRes =>
            !prev.some(prevRes => prevRes.id === newRes.id)
          );
          return [...prev, ...newAssignments];
        });
      } catch (error) {
        console.error('Error fetching Friend or Foe assignments:', error);
      }
    };

    fetchAllQuizzes();
  }, [friendOrFoeCreateNew, editingFriendOrFoe]);
  console.log(allFriendOrFoeAssignments)

  const handleEditFriendOrFoe = (post) => {
    setEditingFriendOrFoe(post);
    setIsFriendOrFoeEdit(true)
  };

  const handleDeleteFriendOrFoe = async (post) => {
    try {
      const response = await axios.delete(`${baseUrl}/Quizzes/${post.id}`);
      if (response.status === 200) {


        // Update the allQuizzes state by filtering out the deleted quiz
        const updatedFriendOrFoeAssignments = allFriendOrFoeAssignments.filter(q => q.id !== post.id);
        setAllFriendOrFoeAssignments(updatedFriendOrFoeAssignments);
      }
    } catch (error) {
      console.error('Error deleting the question:', error);
    }
  };


  return (
    <>
      {friendOrFoeCreateNew ? (
        <FriendOrFoeCreateNew />
      ) : isFriendOrFoeEdit ? (
        <FriendOrFoeEdit />
      ) : (
        <div className='friendOrFoeWrapperList'>
          <div className='titleWrapper'>
            <h3 className="friendOrFoeTitle">Friend Or Foe</h3>
            <button className="createNewFriendOrFoeBtn" onClick={() => (setFriendOrFoeCreateNew(true))}>Create New Question</button>
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
                  <td data-label="AuthorName">{post?.questions[0]?.text}</td>
                  <td data-label="AuthorName">Male</td>
                  <td data-label="Image"><img src={`${baseUrlImage}${post?.questions[0]?.imagePath}`} alt="Post Image" /></td>
                  <td data-label="AuthorName">{post?.questions[0]?.content}</td>
                  <td data-label="Bundle">{post.difficulty == '0' ? 'Easy' : post.difficulty == '1' ? 'Medium' : 'Hard'}</td>

                  <td data-label="Edit/Delete" className='settingsData'>
                    <button className="edit-btn" onClick={() => handleEditFriendOrFoe(post)}>Edit</button>

                    <button className="delete-btn" onClick={() => handleDeleteFriendOrFoe(post)}>Delete</button>
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