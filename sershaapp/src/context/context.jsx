import React, { useContext, createContext, useState, useEffect } from "react";
import Cookies from 'js-cookie'
import postimg from '../assets/images/posts/postimg.png'
import postimg2 from '../assets/images/posts/postImg2.png'
import authorImg from '../assets/images/posts/authorimg.png'
import axios from 'axios'

import avatar from '../assets/images/navbar/userpick.png'

const AppContext = createContext();
const baseUrl = "https://sershaback.azurewebsites.net/api";
const baseUrlImage = "https://sershaback.azurewebsites.net";

const AppProvider = ({ children }) => {

  // SINGLE USER
  const [user, setUser] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [userLevel, setUserLevel] = useState({ level: 1, step: 1 })

  // Cookies
  // Function to check if the user can play another quiz today
  const canPlayAnotherQuizToday = () => {
    const today = new Date().toISOString().split('T')[0];
    const cookieValue = Cookies.get('todayQuizzesPlayed');

    if (!cookieValue) {
      // Cookie does not exist, user can play quizzes
      Cookies.set('todayQuizzesPlayed', JSON.stringify({ date: today, quizzesPlayed: 0 }));
      return true;
    }

    const { date, quizzesPlayed } = JSON.parse(cookieValue);

    if (date === today) {
      // It's the same day, check if the user has played less than 2 quizzes
      return quizzesPlayed < 2;
    } else {
      // Different day, reset the cookie
      Cookies.set('todayQuizzesPlayed', JSON.stringify({ date: today, quizzesPlayed: 0 }));
      return true;
    }
  };

  // APP TUTORIAL
  const [isTutorialActive, setIsTutorialActive] = useState(false);
  const [tutorial, setTutorial] = useState({
    run: false,
    steps: [
      {
        content: <><h2>Welcome!</h2><p>It's your first time with us, so to make it easier and more fun, we've prepared a short tutorial for you!</p><p>Let's begin our journey!</p></>,
        locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
        placement: 'center',
        target: 'body',
      },
      {
        target: '.map',
        floaterProps: {
          disableAnimation: true,
        },
        content: <><h2>Map</h2><p>This is the map. Come here to see how far you’ve come in your journey, what levels you have accomplished, and how close you are to finding the rogue fox!</p></>,
      },
      {
        target: '.miniGames',
        floaterProps: {
          disableAnimation: true,
        },
        content: <><h2>Mini Games</h2><p>Mini Games are designed to help you receive rewards and sharpen your skills to defeat the rogue fox!</p></>,
      },
      {
        target: '.currentHome',
        floaterProps: {
          disableAnimation: true,
        },
        content: <><h2>News Feed</h2><p>Keep up to date on your team’s whereabouts and the rogue fox’s latest antics!</p></>,
      },
      {
        target: '.dm',
        floaterProps: {
          disableAnimation: true,
        },
        content: <><h2>Messages</h2><p>Your teammates will send you messages throughout your journey and teach you about social media safety, but be careful, the rogue fox can strike at any second!</p></>,
      },
      {
        target: '.foxCustomization',
        floaterProps: {
          disableAnimation: true,
        },
        content: <><h2>Fox Customisation</h2><p>Select from different outfits to give your Sersha fox the best look!</p></>,
      },
      {
        target: '.mute-btn',
        floaterProps: {
          disableAnimation: true,
        },
        content: <><h2>Mute</h2><p>Click to turn the music on or off.</p></>,
      },
      {
        target: '.tutorialBtn',
        floaterProps: {
          disableAnimation: true,
        },
        content: <><h2>Information</h2><p>Click here to read the instructions again.</p></>,
      },
      {
        target: '.avatar',
        floaterProps: {
          disableAnimation: true,
        },
        content: <><h2>Information</h2><p>Click here to change your avatar or change your profile settings.</p></>,
      },
    ]
  })



  const updateQuizzesPlayed = () => {
    const cookieValue = Cookies.get('todayQuizzesPlayed');
    const { date, quizzesPlayed } = JSON.parse(cookieValue);

    Cookies.set('todayQuizzesPlayed', JSON.stringify({ date, quizzesPlayed: quizzesPlayed + 1 }));
  };

  const handleQuizCompletion = async () => {
    if (canPlayAnotherQuizToday()) {
      updateQuizzesPlayed();
      console.log("Quiz completed. User can play another quiz today.");
    } else {
      console.log("User has already played two quizzes today.");
    }
  };


  // CLOTHING

  const [clothingCreateNew, setClothingCreateNew] = useState(false);
  const [clothingNewItem, setClothingNewItem] = useState({
    type: '',
    image: null,
    bodyPart: '',
    name: ''
  });
  const [isClothingItemEdit, setIsClothingItemEdit] = useState(false);
  const [clothingEditingItem, setClothingEditingItem] = useState(null);
  const [allClothing, setAllClothing] = useState([]);

  // AVATARS

  const [avatarCreateNew, setAvatarCreateNew] = useState(false);
  const [avatarNew, setAvatarNew] = useState({
    image: null,
    name: ''
  });
  const [isAvatarEdit, setIsAvatarEdit] = useState(false);
  const [avatarEditing, setAvatarEditing] = useState(null);
  const [allAvatars, setAllAvatars] = useState([]);


  // NEW MESSAGE
  const [newMessage, setNewMessage] = useState(0);

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
  const [showPopup, setShowPopup] = useState(false);


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
  const [correctAnsweredMiniGames, setCorrectAnsweredMiniGames] = useState(0);
  const [incorrectAnsweredMiniGames, setIncorrectAnsweredMiniGames] = useState(0);
  const [corInc, setCorInc] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [rewardItems, setRewardItem] = useState(['Coin Multiplier', 'Correct Answer', 'Deal Damage', 'Healing Potion', 'Shield']);
  const roughFoxComments = ["Ouch!", "Yikes!", "Oof!", "Ow!", "Whoa!", "Argh!", "Dang!", "Eek!", "Gah!", "Ack!", "Ugh!"];
  const [roughFoxDamaged, setRoughFoxDamaged] = useState('');

  const handleFoxDamaged = () => {
    let randomIndex = Math.floor(Math.random() * roughFoxComments.length);

    setRoughFoxDamaged(roughFoxComments[randomIndex]);

  }


  /* SNAP JUDGMENT */
  const [snapJudgmentCreateNew, setSnapJudgmentCreateNew] = useState(false);
  const [editingSnapJudgment, setEditingSnapJudgment] = useState(null);
  const [isSnapJudgmentEdit, setIsSnapJudgmentEdit] = useState(false);
  const [allSnapJudgmentAssignments, setAllSnapJudgmentAssignments] = useState([]);


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
  const [selectedTopItem, setSelectedTopItem] = useState();
  const [selectedBottomItem, setSelectedBottomItem] = useState();

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

  const [correctIncorrectIsTrue, setCorrectIncorrectIsTrue] = useState(false);
  const [heartsNum, setHeartsNum] = useState(3)
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);

  // MAP 
  const [bundelsAndLevels, setBundlesAndLevels] = useState([
    {
      bundle: 'Easy',
      bundleName: 'Digital City',
      levels: [
        {
          levelName: 'Pixel Plaza',
          levelDesc: 'Explore the basics of the digital world.',
          levelNo: 1,
          step: 0,
          levelNameDown: 'Message Mall',
          levelDescDown: 'Learn to chat and share safely.',
          levelNoDown: 2,
          stepDown: 0,
        },
        {
          levelName: 'Emoji Avenue',
          levelDesc: 'Discover different types of online posts.',
          levelNo: 3,
          step: 0,
          levelNameDown: 'Secure Street',
          levelDescDown: 'Keep your online info private.',
          levelNoDown: 4,
          stepDown: 0,
        },
        {
          levelName: 'Wisdom Way',
          levelDesc: 'Think twice before you click.',
          levelNo: 5,
          step: 0,
          levelNameDown: 'Harmony Hub',
          levelDescDown: 'Stay happy and healthy online.',
          levelNoDown: 6,
          stepDown: 0,
        },
        {
          levelName: 'Bully-Free Boulevard',
          levelDesc: 'Stand up to online bullies.',
          levelNo: 7,
          step: 0,
          levelNameDown: 'Balanced Boulevard',
          levelDescDown: 'Manage your online and offline time.',
          levelNoDown: 8,
          stepDown: 0,
        },
        {
          levelName: 'Alert Alley',
          levelDesc: 'Spot and avoid online strangers.',
          levelNo: 9,
          step: 0,
          levelNameDown: 'Friendly Forum',
          levelDescDown: 'Join and enjoy safe online groups.',
          levelNoDown: 10,
          stepDown: 0,
        },
        {
          levelName: 'Clean Content Corner',
          levelDesc: 'Handle and report bad stuff.',
          levelNo: 11,
          step: 0,
          levelNameDown: 'Trendsetter Tower',
          levelDescDown: 'Understand online influencers.',
          levelNoDown: 12,
          stepDown: 0,
        },
        {
          levelName: "Gamer's Gateway",
          levelDesc: 'Enjoy games safely.',
          levelNo: 13,
          step: 0,
        },
      ]
    }
  ]);

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

        //Cookies
        canPlayAnotherQuizToday,
        updateQuizzesPlayed,
        handleQuizCompletion,

        //APP TUTORIAL
        tutorial, setTutorial,
        isTutorialActive, setIsTutorialActive,

        //FOX CUSTOMIZATION

        handleSelectTopItem,
        handleSelectBottomItem,
        isTopPart,
        setIsTopPart,
        isBottomPart,
        setIsBottomPart,
        selectedTopItem,
        setSelectedTopItem,
        selectedBottomItem,
        setSelectedBottomItem,

        //NewMessage
        newMessage,
        setNewMessage,

        // CLOTHING
        clothingCreateNew,
        setClothingCreateNew,
        clothingNewItem,
        setClothingNewItem,
        isClothingItemEdit,
        setIsClothingItemEdit,
        clothingEditingItem,
        setClothingEditingItem,
        allClothing,
        setAllClothing,

        // AVATARS
        avatarCreateNew,
        setAvatarCreateNew,
        avatarNew,
        setAvatarNew,
        isAvatarEdit,
        setIsAvatarEdit,
        avatarEditing,
        setAvatarEditing,
        allAvatars,
        setAllAvatars,

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

        // SINGLE USER
        user,
        setUser,
        selectedUser,
        setSelectedUser,
        userLevel,
        setUserLevel,


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
        heartsNum, setHeartsNum,
        correctAnswers, setCorrectAnswers,
        wrongAnswers, setWrongAnswers,
        showPopup, setShowPopup,

        // CORRECT INCORRECT
        correctIncorrectIsTrue, setCorrectIncorrectIsTrue,

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
        correctAnsweredMiniGames,
        setCorrectAnsweredMiniGames,
        incorrectAnsweredMiniGames,
        setIncorrectAnsweredMiniGames,
        corInc,
        setCorInc,
        rewardItems,
        setRewardItem,
        roughFoxComments,
        roughFoxDamaged,
        setRoughFoxDamaged,
        handleFoxDamaged,

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

        // MAP
        bundelsAndLevels,
        setBundlesAndLevels,

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
