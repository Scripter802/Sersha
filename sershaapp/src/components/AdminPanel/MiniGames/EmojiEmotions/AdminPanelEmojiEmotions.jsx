import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../../../context/context';
import './adminPanelEmojiEmotions.css';
import EmojiEmotionsCreateNew from './EmojiEmotionsCreateNew/EmojiEmotionsCreateNew';
import EmojiEmotionsEdit from './EmojiEmotionsEdit/EmojiEmotionsEdit';
import axios from 'axios';

const AdminPanelEmojiEmotions = () => {
  const {
    baseUrl,
    baseUrlImage,
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

  const handleEditEmojiEmotions = (post) => {
    setEditingEmojiEmotions(post);
    setIsEmojiEmotionsEdit(true)
  };

  const handleDeleteEmojiEmotions = async (postId) => {
    try {
      const response = await axios.delete(`${baseUrl}/Quizzes/${postId}`);
      if (response.status === 200) {

        // Update the allQuizzes state by filtering out the deleted quiz
        const updatedEmojiAssignment = allEmojiEmotionsAssignments.filter(q => q.id !== postId);
        setAllEmojiEmotionsAssignments(updatedEmojiAssignment);
      }
    } catch (error) {
      console.error('Error deleting the question:', error);
    }
  };

  useEffect(() => {

    const fetchAllQuizzes = async () => {
      try {
        const response = await axios.get(`${baseUrl}/Quizzes`);
        console.log(`response: ${response.data}`);
        const filteredData = response.data.filter(res => res?.questions[0]?.type === 5);

        // Avoid adding duplicates
        setAllEmojiEmotionsAssignments(prev => {
          const newAssignments = filteredData.filter(newRes =>
            !prev.some(prevRes => prevRes.id === newRes.id)
          );
          return [...prev, ...newAssignments];
        });
      } catch (error) {
        console.error('Error fetching Emoji Emotions assignments:', error);
      }
    };

    fetchAllQuizzes();
  }, [emojiEmotionsCreateNew, editingEmojiEmotions]);
  console.log(allEmojiEmotionsAssignments)


  return (
    <>
      {emojiEmotionsCreateNew ? (
        <EmojiEmotionsCreateNew />
      ) : isEmojiEmotionsEdit ? (
        <EmojiEmotionsEdit />
      ) : (
        <div className='emojiEmotionsWrapperList'>
          <div className='titleWrapper'>
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
              {allEmojiEmotionsAssignments && allEmojiEmotionsAssignments.map((post, index) =>
                <tr key={index}>
                  {console.log(post)}
                  <td data-label="No.">{index + 1}</td>
                  <td data-label="Image"><img src={`${baseUrlImage}${post?.questions[0].imagePath}`} alt="Post Image" /></td>
                  <td data-label="AuthorName">{post?.questions[0]?.answers.map((ans, i) => (
                    <p>{ans.text}</p>
                  ))}</td>
                  <td data-label="AuthorName">{post?.questions[0]?.answers.map((ans, i) => (
                    ans.isCorrect == true && <p>{ans.text}</p>
                  ))}</td>
                  <td data-label="Bundle">{post.difficulty == '0' ? 'Easy' : post.difficulty == '1' ? 'Medium' : 'Hard'}</td>

                  <td data-label="Edit/Delete" className='settingsData'>
                    <button className="edit-btn" onClick={() => handleEditEmojiEmotions(post)}>Edit</button>

                    <button className="delete-btn" onClick={() => handleDeleteEmojiEmotions(post.id)}>Delete</button>
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