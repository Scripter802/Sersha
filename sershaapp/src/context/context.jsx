import React, { useContext, createContext, useState, useEffect } from "react";
import postimg from '../assets/images/posts/postimg.png'
import postimg2 from '../assets/images/posts/postImg2.png'
import authorImg from '../assets/images/posts/authorimg.png'
import axios from 'axios'

import avatar from '../assets/images/navbar/userpick.png'

const AppContext = createContext();
const baseUrl = "http://localhost:5000/api";
const baseUrlImage = "http://172.28.112.1:8080/API";

const AppProvider = ({ children }) => {

  // Function to handle selecting an item for the top part
  const handleSelectTopItem = (item) => {
    setSelectedTopItem(item);
    setIsTopPart(true);
    setIsBottomPart(false);
  };

  // Function to handle selecting an item for the bottom part
  const handleSelectBottomItem = (item) => {
    setSelectedBottomItem(item);
    setIsBottomPart(true);
    setIsTopPart(false);
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  /*   ADMIN PANEL  *//*   ADMIN PANEL  *//*   ADMIN PANEL  *//*   ADMIN PANEL  *//*   ADMIN PANEL  */
  const [activeTab, setActiveTab] = useState("Dashboard")

  /* ADMIN posts */
  const [allPosts, setAllPosts] = useState([]);
  const [isPostsLoading, setIsPostsLoading] = useState(false);

  // { id: 1, profilePicture: 'Frank', profileName: 'Murphy', image: 'frank.murphy@test.com', text: 'User' },
  // { id: 2, profilePicture: 'Vic', profileName: 'Reynolds', image: 'vic.reynolds@test.com', text: 'Admin' },
  // { id: 3, profilePicture: 'Gina', profileName: 'Jabowski', image: 'gina.jabowski@test.com', text: 'Admin' },
  // { id: 4, profilePicture: 'Jessi', profileName: 'Glaser', image: 'jessi.glaser@test.com', text: 'User' },
  // { id: 5, profilePicture: 'Jay', profileName: 'Bilzerian', image: 'jay.bilzerian@test.com', text: 'User' }

  const [createNewPost, setCreateNewPost] = useState(false);
  const [isPostEdit, setIsPostEdit] = useState(false);
  const [editingPost, setEditingPost] = useState([]);

  /* ADMIN users */
  const [allUsers, setAllUsers] = useState([
    { id: 1, username: 'Frank', email: 'frank.murphy@test.com', signupDate: '12.05.2024', currentLevel: '5' },
    { id: 2, username: 'Vic', email: 'vic.reynolds@test.com', signupDate: '12.05.2024', currentLevel: '3' },
    { id: 3, username: 'Gina', email: 'gina.jabowski@test.com', signupDate: '12.05.2024', currentLevel: '7' },
    { id: 4, username: 'Jessi', email: 'jessi.glaser@test.com', signupDate: '12.05.2024', currentLevel: '1' },
    { id: 5, username: 'Jay', email: 'jay.bilzerian@test.com', signupDate: '12.05.2024', currentLevel: '4' }
  ]);

  /* ADMIN QUIZZES */
  const [quizzesActiveTab, setQuizzesActiveTab] = useState('Right Answer');
  const [quizzesCreateNew, setQuizzesCreateNew] = useState(false);
  const [quizzesEdit, setQuizzesEdit] = useState(false);
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [quizzCreateNew, setQuizzCreateNew] = useState(false);
  const [questionEdit, setQuestionEdit] = useState(false);



  /* ADMIN RIGHT ANSWER QUIZ */
  const [rightAnswerCreateNew, setRightAnswerCreateNew] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [isQuestionEdit, setIsQuestionEdit] = useState(false);
  const [allRightAnswerQuestions, setAllRightAnswerQuestions] = useState([]);
  const rightAnswerAPI = 'http://localhost:5000/api/Quizzes/randomByType/0'


  /* ADMIN FILL IN THE BLANK */
  const [fillInTheBlankCreateNew, setFillInTheBlankCreateNew] = useState(false);
  const [editingFillInTheBlank, setEditingFillInTheBlank] = useState(null);
  const [isFillInTheBlankEdit, setIsFillInTheBlankEdit] = useState(false);
  const [allFillInTheBlankStatements, setAllFillInTheBlankStatements] = useState([]);
  const fillInTheBlankAPI = 'http://localhost:5000/api/Quizzes/randombytype/2'
  /* ADMIN CORRECT/INCORRECT */
  const [correctIncorrectCreateNew, setCorrectIncorrectCreateNew] = useState(false);
  const [editingCorrectIncorrect, setEditingCorrectIncorrect] = useState(null);
  const [isCorrectIncorrectEdit, setIsCorrectIncorrectEdit] = useState(false);
  const [allCorrectIncorrect, setAllCorrectIncorrect] = useState([]);
  const correctIncorrectAPI = 'http://localhost:5000/api/Quizzes/randombytype/1'
  /* ADMIN GROUPING */
  const [groupingCreateNew, setGroupingCreateNew] = useState(false);
  const [editingGrouping, setEditingGrouping] = useState(null);
  const [isGroupingEdit, setIsGroupingEdit] = useState(false);
  const [allGrouping, setAllGrouping] = useState([]);
  const groupingAPI = 'http://localhost:5000/api/Quizzes/randombytype/3'
  /* _______________________________________________________________________________ */


  /* ADMIN MINI-GAMES */
  const [miniGamesActiveTab, setMiniGamesActiveTab] = useState('Snap Judgment');

  /* SNAP JUDGMENT */
  const [snapJudgmentCreateNew, setSnapJudgmentCreateNew] = useState(false);
  const [editingSnapJudgment, setEditingSnapJudgment] = useState(null);
  const [isSnapJudgmentEdit, setIsSnapJudgmentEdit] = useState(false);
  const [allSnapJudgmentAssignments, setAllSnapJudgmentAssignments] = useState(false);


  /* EMOJI EMOTIONS */
  const [emojiEmotionsCreateNew, setEmojiEmotionsCreateNew] = useState(false);
  const [editingEmojiEmotions, setEditingEmojiEmotions] = useState(null);
  const [isEmojiEmotionsEdit, setIsEmojiEmotionsEdit] = useState(false);
  const [allEmojiEmotionsAssignments, setAllEmojiEmotionsAssignments] = useState([]);

  /* FRIEND OR FOE */
  const [friendOrFoeCreateNew, setFriendOrFoeCreateNew] = useState(false);
  const [editingFriendOrFoe, setEditingFriendOrFoe] = useState(null);
  const [isFriendOrFoeEdit, setIsFriendOrFoeEdit] = useState(false);
  const [allFriendOrFoeAssignments, setAllFriendOrFoeAssignments] = useState([]);

  /* POSTING CHALLENGE */
  const [postingChallengeCreateNew, setPostingChallengeCreateNew] = useState(false);
  const [editingPostingChallenge, setEditingPostingChallenge] = useState(null);
  const [isPostingChallengeEdit, setIsPostingChallengeEdit] = useState(false);
  const [allPostingChallengeAssignments, setAllPostingChallengeAssignments] = useState([]);

  //____________________________________________________________________________


  /* SIGN IN_SIGN UP PAGE *//* SIGN IN_SIGN UP PAGE *//* SIGN IN_SIGN UP PAGE *//* SIGN IN_SIGN UP PAGE *//* SIGN IN_SIGN UP PAGE */

  const [logIn, setLogIn] = useState(true);

  /* LOG IN FORM COMPONENT */

  const [logEmail, setLogEmail] = useState("");
  const [logPassword, setLogPassword] = useState("");
  const [logRemember, setLogRemember] = useState(false);
  const [logValidate, setLogValidate] = useState({});
  const [logShowPassword, setLogShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token); // Check if the token is retrieved correctly
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsAuthenticated(true);
      console.log('IsAuthenticated:', isAuthenticated);
    }
  }, [isAuthenticated]);

  const loginUser = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };


  /* REGISTER FORM COMPONENT */

  const [registerNameOfParent, setRegisterNameOfParent] = useState("");
  const [registerNameOfChild, setRegisterNameOfChild] = useState("");
  const [registerDateOfBirth, setRegisterDateOfBirth,] = useState(new Date());
  const [registerPhoneNumber, setRegisterPhoneNumber] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerRePassword, setRegisterRePassword] = useState("");
  const [registerValidate, setRegisterValidate] = useState({});
  const [registerShowPassword, setRegisterShowPassword] = useState(false);

  /* _______________________________________________________________________________ */

  /* HOMEPAGE *//* HOMEPAGE *//* HOMEPAGE *//* HOMEPAGE *//* HOMEPAGE *//* HOMEPAGE *//* HOMEPAGE */
  const [postsPerStage, setPostsPerStage] = useState([]);
  const [randomPosts, setRandomPosts] = useState([]);



  /* DMS  *//* DMS  *//* DMS  *//* DMS  *//* DMS  *//* DMS  *//* DMS  *//* DMS  *//* DMS  */


  const [selectedMessagePreview, setSelectedMessagePreview] = useState(false);



  /* FOX CUSTOMIZATION FOX CUSTOMIZATION FOX CUSTOMIZATION FOX CUSTOMIZATION FOX CUSTOMIZATION */
  const [isTopPart, setIsTopPart] = useState(false);
  const [isBottomPart, setIsBottomPart] = useState(false);

  /* AXIOS REQUESTS *//* AXIOS REQUESTS *//* AXIOS REQUESTS *//* AXIOS REQUESTS *//* AXIOS REQUESTS *//* AXIOS REQUESTS */

  /* POSTS *//* POSTS *//* POSTS */

  //GET ALL AUTHORS GET ALL AUTHORS GET ALL AUTHORS
  const [createNewPostAuthor, setCreateNewPostAuthor] = useState(false)
  const [isPostAuthorEdit, setIsPostAuthorEdit] = useState(false)
  const [editingPostAuthor, setEditingPostAuthor] = useState([])
  const [allAuthors, setAllAuthors] = useState([]);

  const getAllAuthors = async () => {
    try {
      const response = await axios.get(`${baseUrl}/Author`);
      if (response.status === 200) {
        setAllAuthors(response.data); // Directly set the data
      }
      console.log(allAuthors);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPostsLoading(false); // Set loading state to false after the request is completed
    }
  };


  //DELETE Author
  const handleDeleteAuthor = async (authorId) => {
    try {
      const response = await axios.delete(`${baseUrl}/Author/${authorId}`);
      if (response.status === 200) {
        // Remove the deleted post from the state
        setAllAuthors(allAuthors.filter(author => author.id !== authorId));
      }
    } catch (error) {
      console.error('Failed to delete author:', error);
    } finally {
      console.log('success')
    }
  };



  //GET ALL               //GET ALL
  const getAllPosts = async () => {
    try {
      setIsPostsLoading(true); // Set loading state to true before making the request
      const response = await axios.get(`${baseUrl}/Post`);
      if (response.status === 200) {
        setAllPosts(response.data); // Directly set the data
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsPostsLoading(false); // Set loading state to false after the request is completed
    }
  };
  //GET ALL POSTS PER STAGE
  const getPostsPerStage = async () => {
    try {
      setIsPostsLoading(true); // Set loading state to true before making the request
      const response = await axios.get(`${baseUrl}/Post/ListPerStages/Easy`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        }
      }
      );
      if (response.status === 200) {
        setPostsPerStage(response.data); // Directly set the data
        console.log(postsPerStage)
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsPostsLoading(false); // Set loading state to false after the request is completed
    }
  };
  //DELETE POST
  const handleDeletePost = async (postId) => {
    try {
      setIsPostsLoading(true);
      const response = await axios.delete(`${baseUrl}/Post/${postId}`);
      if (response.status === 200) {
        // Remove the deleted post from the state
        setAllPosts(allPosts.filter(post => post.id !== postId));
      }
    } catch (error) {
      console.error('Failed to delete post:', error);
    } finally {
      setIsPostsLoading(false);
    }
  };

  //________________________________________
  //POST METHOD               //POST METHOD


  // QUIZZ CURRENT
  const [currentQuizz, setCurrentQuizz] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);


  return (
    <AppContext.Provider
      value={{

        // BASE STATES - APIs// 
        baseUrl,
        baseUrlImage,
        windowWidth,
        setWindowWidth,
        rightAnswerAPI,
        correctIncorrectAPI,
        fillInTheBlankAPI,
        groupingAPI,

        //FOX CUSTOMIZATION

        handleSelectTopItem,
        handleSelectBottomItem,
        isTopPart,
        setIsTopPart,
        isBottomPart,
        setIsBottomPart,



        // POSTS 
        allPosts,
        setAllPosts,
        postsPerStage,
        setPostsPerStage,
        getPostsPerStage,
        randomPosts,
        setRandomPosts,
        isPostsLoading,
        setIsPostsLoading,
        createNewPost,
        setCreateNewPost,
        isPostEdit,
        setIsPostEdit,
        editingPost,
        setEditingPost,
        getAllPosts,
        handleDeletePost,


        // USERS
        allUsers,
        setAllUsers,

        // AUTHORS
        allAuthors,
        setAllAuthors,
        createNewPostAuthor,
        setCreateNewPostAuthor,
        isPostAuthorEdit,
        setIsPostAuthorEdit,
        editingPostAuthor,
        setEditingPostAuthor,
        getAllAuthors,
        handleDeleteAuthor,

        // MAIN MENU
        activeTab,
        setActiveTab,

        //QUIZZES ADMIN PANEL
        quizzesActiveTab,
        setQuizzesActiveTab,
        quizzesCreateNew,
        setQuizzesCreateNew,
        quizzesEdit,
        setQuizzesEdit,
        allQuizzes,
        setAllQuizzes,
        selectedQuestion, setSelectedQuestion,
        quizzCreateNew, setQuizzCreateNew, questionEdit, setQuestionEdit,
        currentQuizz, setCurrentQuizz,
        currentQuestion, setCurrentQuestion,

        // ADMIN PANEL QUIZZES RIGHT ANSWER
        rightAnswerCreateNew,
        setRightAnswerCreateNew,
        allRightAnswerQuestions,
        setAllRightAnswerQuestions,
        editingQuestion,
        setEditingQuestion,
        isQuestionEdit,
        setIsQuestionEdit,
        // ADMIN PANEL QUIZZES FILL IN THE BLANK
        fillInTheBlankCreateNew,
        setFillInTheBlankCreateNew,
        allFillInTheBlankStatements,
        setAllFillInTheBlankStatements,
        editingFillInTheBlank,
        setEditingFillInTheBlank,
        isFillInTheBlankEdit,
        setIsFillInTheBlankEdit,
        // ADMIN PANEL QUIZZES CORRECT/INCORRECT
        correctIncorrectCreateNew,
        setCorrectIncorrectCreateNew,
        allCorrectIncorrect,
        setAllCorrectIncorrect,
        editingCorrectIncorrect,
        setEditingCorrectIncorrect,
        isCorrectIncorrectEdit,
        setIsCorrectIncorrectEdit,
        // ADMIN PANEL QUIZZES GROUPING
        groupingCreateNew,
        setGroupingCreateNew,
        allGrouping,
        setAllGrouping,
        editingGrouping,
        setEditingGrouping,
        isGroupingEdit,
        setIsGroupingEdit,

        // MINI GAMES 
        miniGamesActiveTab,
        setMiniGamesActiveTab,

        // SNAP JUDGMENT ADMIN PANEL MINIGAMES SNAPJUDGMENT
        snapJudgmentCreateNew,
        setSnapJudgmentCreateNew,
        isSnapJudgmentEdit,
        setIsSnapJudgmentEdit,
        editingSnapJudgment,
        setEditingSnapJudgment,
        allSnapJudgmentAssignments,
        setAllSnapJudgmentAssignments,

        /* EMOJI EMOTIONS ADMIN PANEL MINIGAMES */
        emojiEmotionsCreateNew,
        setEmojiEmotionsCreateNew,
        isEmojiEmotionsEdit,
        setIsEmojiEmotionsEdit,
        editingEmojiEmotions,
        setEditingEmojiEmotions,
        allEmojiEmotionsAssignments,
        setAllEmojiEmotionsAssignments,

        /* FRIEND OR FOE ADMIN PANEL MINIGAMES */
        friendOrFoeCreateNew,
        setFriendOrFoeCreateNew,
        isFriendOrFoeEdit,
        setIsFriendOrFoeEdit,
        editingFriendOrFoe,
        setEditingFriendOrFoe,
        allFriendOrFoeAssignments,
        setAllFriendOrFoeAssignments,

        /* POSTING CHALLENGE ADMIN PANEL MINIGAMES */
        postingChallengeCreateNew,
        setPostingChallengeCreateNew,
        isPostingChallengeEdit,
        setIsPostingChallengeEdit,
        editingPostingChallenge,
        setEditingPostingChallenge,
        allPostingChallengeAssignments,
        setAllPostingChallengeAssignments,

        //LOGIN/REGISTER
        logEmail,
        setLogEmail,
        logPassword,
        setLogPassword,
        logRemember,
        setLogRemember,
        logValidate,
        setLogValidate,
        logShowPassword,
        setLogShowPassword,
        logIn,
        setLogIn,
        isAuthenticated,
        loginUser,
        logoutUser,
        registerNameOfParent,
        setRegisterNameOfParent,
        registerNameOfChild,
        setRegisterNameOfChild,
        registerDateOfBirth,
        setRegisterDateOfBirth,
        registerPhoneNumber,
        setRegisterPhoneNumber,
        registerEmail,
        setRegisterEmail,
        registerPassword,
        setRegisterPassword,
        registerRePassword,
        setRegisterRePassword,
        registerValidate,
        setRegisterValidate,
        registerShowPassword,
        setRegisterShowPassword,

        // DMS
        selectedMessagePreview,
        setSelectedMessagePreview,

      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
