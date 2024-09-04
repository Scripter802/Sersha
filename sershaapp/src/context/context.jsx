import React, { useContext, createContext, useState, useEffect } from "react";
import Cookies from 'js-cookie'
import coinMultiplier from '../assets/images/inventory/coinMultiplier.png';
import correctAnswer from '../assets/images/inventory/correctAnswer.png';
import dealDamage from '../assets/images/inventory/dealDamage.png';
import healingPotion from '../assets/images/inventory/healingPotion.png';
import shield from '../assets/images/inventory/shield.png';
import axios from 'axios'
import {
  group1,
  group5,
  group6,
  group8,
  group9,
  group18Two,
} from '../assets/images/map/mapItems/index.js';
import itemOneEasy from '../assets/images/map/mapItems/easybundle/itemOne.png'
import itemTwoEasy from '../assets/images/map/mapItems/easybundle/itemTwo.png'
import itemThreeEasy from '../assets/images/map/mapItems/easybundle/itemThree.png'
import itemFourEasy from '../assets/images/map/mapItems/easybundle/itemFour.png'
import itemFiveEasy from '../assets/images/map/mapItems/easybundle/itemFive.png'
import itemSixEasy from '../assets/images/map/mapItems/easybundle/itemSix.png'
import itemSevenEasy from '../assets/images/map/mapItems/easybundle/itemSeven.png'
import itemEightEasy from '../assets/images/map/mapItems/easybundle/itemEight.png'
import itemEasyFondation from '../assets/images/map/mapItems/easybundle/foundation.png'
import itemMediumFondation from '../assets/images/map/mapItems/mediumbundle/foundation.png'
import itemOneMedium from '../assets/images/map/mapItems/mediumbundle/itemOne.png'
import itemTwoMedium from '../assets/images/map/mapItems/mediumbundle/itemTwo.png'
import itemThreeMedium from '../assets/images/map/mapItems/mediumbundle/itemThree.png'
import itemFourMedium from '../assets/images/map/mapItems/mediumbundle/itemFour.png'
import itemFiveMedium from '../assets/images/map/mapItems/mediumbundle/itemFive.png'
import itemSixMedium from '../assets/images/map/mapItems/mediumbundle/itemSix.png'
import itemSevenMedium from '../assets/images/map/mapItems/mediumbundle/itemSeven.png'
import itemEightMedium from '../assets/images/map/mapItems/mediumbundle/itemEight.png'
import avatar from '../assets/images/navbar/userpick.png'

const AppContext = createContext();
const baseUrl = "http://localhost:5000/api";
const baseUrlImage = "http://localhost:5000";

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
        locale: { skip: <strong aria-label="skip">Skip</strong> },
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
        locale: { last: <strong aria-label="skip">Ok</strong> },
        floaterProps: {
          disableAnimation: true,
        },
        content: <><h2>Profile</h2><p>Click here to change your avatar or change your profile settings.</p></>,
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

  // SLIDESHOWS

  const [slideshowCreateNew, setSlideshowCreateNew] = useState(false);
  const [slideshowNew, setSlideshowNew] = useState({
    level: 0,
    name: '',
    place: 0,
    gif: null,
  });
  const [isSlideshowEdit, setIsSlideshowEdit] = useState(false);
  const [slideshowEditing, setSlideshowEditing] = useState(null);
  const [allSlideshows, setAllSlideshows] = useState([{ id: 1, level: 2, slides: [{ name: 'probni 1', place: 1, gif: '' }, { name: 'probni 2', place: 2, gif: '' }] }]);
  const [slideshowByLevel, setSlideshowByLevel] = useState();
  const [isSlideshowShowed, setIsSlideshowShowed] = useState(false);

  const handleIsSlideshowShowed = () => {
    const cookieValue = Cookies.get('isSlideShowed');

    if (!cookieValue) {
      Cookies.set('isSlideShowed', JSON.stringify({ level: user?.stage, isSlideShowed: false }), {
        sameSite: 'None'
      })
      setIsSlideshowShowed(false);
      return false;
    }

    const { level, isSlideShowed } = JSON.parse(cookieValue);

    if (level == user?.stage) {
      setIsSlideshowShowed(isSlideShowed);
      return isSlideShowed;
    } else {
      Cookies.set('isSlideShowed', JSON.stringify({ level: user?.stage, isSlideShowed: false }), {
        sameSite: 'None',
      });
      setIsSlideshowShowed(false);
      return false;
    }
  }

  const fetchSlideshows = async () => {
    try {
      const response = await axios.get(`${baseUrl}/Slides`);
      setAllSlideshows(response.data);
    } catch (error) {
      console.error('Error fetching Avatars:', error);
    }
  }

  const fetchSlideshowByLevel = async (lvl) => {
    try {
      const response = await axios.get(`${baseUrl}/Slides/level/${lvl}`);
      setSlideshowByLevel(response.data);
    } catch (error) {
      console.error('Error fetching Avatars:', error);
    }
  }

  const updateShowedSlideshow = () => {
    const cookieValue = Cookies.get('isSlideShowed');
    const { level, isSlideShowed } = JSON.parse(cookieValue);

    Cookies.set('isSlideShowed', JSON.stringify({ level, isSlideShowed: true }));
    setIsSlideshowShowed(true);
  };


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


  /*  MINI-GAMES */
  const [miniGamesActiveTab, setMiniGamesActiveTab] = useState('Snap Judgment');
  const [correctAnsweredMiniGames, setCorrectAnsweredMiniGames] = useState(0);
  const [incorrectAnsweredMiniGames, setIncorrectAnsweredMiniGames] = useState(0);
  const [corInc, setCorInc] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [rewardItems, setRewardItem] = useState(['Coin Multiplier', 'Correct Answer', 'Deal Damage', 'Healing Potion', 'Shield']);
  const roughFoxComments = ["Ouch!", "Yikes!", "Oof!", "Ow!", "Whoa!", "Argh!", "Dang!", "Eek!", "Gah!", "Ack!", "Ugh!"];
  const [roughFoxDamaged, setRoughFoxDamaged] = useState('');

  const handleCorrectAnswerMiniGames = () => {
    setCorrectAnsweredMiniGames((prevCorrectAnsweredMiniGames) => prevCorrectAnsweredMiniGames + 1);

    setRogueClickCounter((prevCounter) => {
      if (prevCounter < 3) {
        return prevCounter + 1;
      } else {
        return 1;
      }
    });
  };

  const handleCorrectAnswerQuiz = () => {
    setCorrectAnswers((prevCorrectAnswersQuiz) => prevCorrectAnswersQuiz + 1);

    setRogueClickCounter((prevCounter) => {
      if (prevCounter < 3) {
        return prevCounter + 1;
      } else {
        return 1;
      }
    });
  };

  const handleFoxDamaged = () => {
    let randomIndex = Math.floor(Math.random() * roughFoxComments.length);

    setRoughFoxDamaged(roughFoxComments[randomIndex]);

  }

  const renderRewardImage = (item) => {
    switch (item) {
      case 'Coin Multiplier':
        return <img src={coinMultiplier} alt="Coin Multiplier" />;
      case 'Correct Answer':
        return <img src={correctAnswer} alt="Correct Answer" />;
      case 'Deal Damage':
        return <img src={dealDamage} alt="Deal Damage" />;
      case 'Healing Potion':
        return <img src={healingPotion} alt="Healing Potion" />;
      case 'Shield':
        return <img src={shield} alt="Shield" />;
      default:
        return null;
    }
  };

  //QUIZZES
  const [isShield, setIsShield] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [isCoinMultiplier, setIsCoinMultiplier] = useState(false);

  const handleHealingPotion = () => {
    if (heartsNum < 3) {
      setHeartsNum(heartsNum + 1)

      const updatedInventoryItems = inventoryItems.map(item => {
        if (item.item === 'Healing Potion' && item.count > 0) {
          return { ...item, count: item.count - 1 };
        }
        return item;
      })
        .filter(item => item.count > 0);

      setInventoryItems(updatedInventoryItems);
      localStorage.setItem('gameItems', JSON.stringify(updatedInventoryItems));
    }
  };

  const handleDealDamage = () => {
    setHealth(0);

    const updatedInventoryItems = inventoryItems.map(item => {
      if (item.item === 'Deal Damage' && item.count > 0) {
        return { ...item, count: item.count - 1 };
      }
      return item;
    })
      .filter(item => item.count > 0);

    setInventoryItems(updatedInventoryItems);
    localStorage.setItem('gameItems', JSON.stringify(updatedInventoryItems));
  };

  const handleShield = () => {
    setIsShield(true);

    const updatedInventoryItems = inventoryItems.map(item => {
      if (item.item === 'Shield' && item.count > 0) {
        return { ...item, count: item.count - 1 };
      }
      return item;
    })
      .filter(item => item.count > 0);

    setInventoryItems(updatedInventoryItems);
    localStorage.setItem('gameItems', JSON.stringify(updatedInventoryItems));
  };

  const handleCorrectAnswer = () => {
    setIsCorrectAnswer(true);

    const updatedInventoryItems = inventoryItems.map(item => {
      if (item.item === 'Correct Answer' && item.count > 0) {
        return { ...item, count: item.count - 1 };
      }
      return item;
    })
      .filter(item => item.count > 0);

    setInventoryItems(updatedInventoryItems);
    localStorage.setItem('gameItems', JSON.stringify(updatedInventoryItems));
  };

  const handleCoinMultiplier = () => {
    setIsCoinMultiplier(true);

    const updatedInventoryItems = inventoryItems.map(item => {
      if (item.item === 'Coin Multiplier' && item.count > 0) {
        return { ...item, count: item.count - 1 };
      }
      return item;
    })
      .filter(item => item.count > 0);

    setInventoryItems(updatedInventoryItems);
    localStorage.setItem('gameItems', JSON.stringify(updatedInventoryItems));
  };

  const renderRewardImageQuiz = (item) => {
    switch (item) {
      case 'Coin Multiplier':
        return <img src={coinMultiplier} alt="Coin Multiplier" onClick={handleCoinMultiplier} />;
      case 'Correct Answer':
        return <img src={correctAnswer} alt="Correct Answer" onClick={handleCorrectAnswer} />;
      case 'Deal Damage':
        return <img src={dealDamage} alt="Deal Damage" onClick={handleDealDamage} />;
      case 'Healing Potion':
        return <img src={healingPotion} alt="Healing Potion" onClick={handleHealingPotion} />;
      case 'Shield':
        return <img src={shield} alt="Shield" onClick={handleShield} />;
      default:
        return null;
    }
  };


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
  const [inventoryItems, setInventoryItems] = useState();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('gameItems'))) {
      setInventoryItems(JSON.parse(localStorage.getItem('gameItems')))
    }
  }, []);

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
        setAllAuthors(response.data);
      }
      console.log(allAuthors);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPostsLoading(false);
    }
  };


  //DELETE Author
  const handleDeleteAuthor = async (authorId) => {
    try {
      const response = await axios.delete(`${baseUrl}/Author/${authorId}`);
      console.log(response)
      if (response.statusText == 'OK') {
        setAllAuthors(allAuthors.filter(author => author.id !== authorId));
        console.log(allAuthors)
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
      setIsPostsLoading(true);
      const response = await axios.get(`${baseUrl}/Post`);
      if (response.status === 200) {
        setAllPosts(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsPostsLoading(false);
    }
  };
  //GET ALL POSTS PER STAGE
  const getPostsPerStage = async (stage) => {
    try {
      setIsPostsLoading(true);
      const response = await axios.get(`${baseUrl}/Post/ListPerStages/${stage}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        }
      }
      );
      if (response.status === 200) {
        setPostsPerStage(response.data);
        console.log(postsPerStage)
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsPostsLoading(false);
    }
  };
  //DELETE POST
  const handleDeletePost = async (postId) => {
    try {
      setIsPostsLoading(true);
      const response = await axios.delete(`${baseUrl}/Post/${postId}`);
      if (response.status === 200) {

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

  const [health, setHealth] = useState(100);

  // MAP 
  const [bundelsAndLevels, setBundlesAndLevels] = useState([
    {
      bundle: 'Easy',
      bundleName: 'Metro Meadows (Easy)',
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
      ],
      images: [
        { item: itemOneEasy, fondation: itemEasyFondation },
        { item: itemThreeEasy },
        { item: itemFiveEasy },
        { item: itemTwoEasy, fondation: itemEasyFondation },
        { item: itemEightEasy, fondation: itemEasyFondation },
      ],
    },
    {
      bundle: 'Medium',
      bundleName: 'Suburban Villages (Medium)',
      levels: [
        {
          levelName: 'Foxy Forest',
          levelDesc: 'Dive deeper into social media.',
          levelNo: 14,
          step: 0,
          levelNameDown: 'Reynard’s Road',
          levelDescDown: 'Advanced chatting and sharing.',
          levelNoDown: 15,
          stepDown: 0,
        },
        {
          levelName: 'Vixen’s Village',
          levelDesc: 'Create and share awesome content.',
          levelNo: 16,
          step: 0,
          levelNameDown: 'Byte Boulevard',
          levelDescDown: 'Enhanced safety for your data.',
          levelNoDown: 17,
          stepDown: 0,
        },
        {
          levelName: 'Kitsune’s Keep',
          levelDesc: 'Sharpen your digital detective skills.',
          levelNo: 18,
          step: 0,
          levelNameDown: 'Sly’s Safe Zone',
          levelDescDown: 'Master online self-care.',
          levelNoDown: 19,
          stepDown: 0,
        },
        {
          levelName: 'Safe Haven',
          levelDesc: 'Become a cyberbullying warrior.',
          levelNo: 20,
          step: 0,
          levelNameDown: 'Respectful Ridge',
          levelDescDown: 'Balance screen time with real life.',
          levelNoDown: 21,
          stepDown: 0,
        },
        {
          levelName: 'Kindness Kingdom',
          levelDesc: 'Recognise and block strangers.',
          levelNo: 22,
          step: 0,
          levelNameDown: 'Trustworthy Trail',
          levelDescDown: 'Build trustworthy connections.',
          levelNoDown: 23,
          stepDown: 0,
        },
        {
          levelName: 'Digi Den',
          levelDesc: 'Navigate and report harmful content.',
          levelNo: 24,
          step: 0,
          levelNameDown: 'Whiz Web',
          levelDescDown: 'Get smart about online influencers.',
          levelNoDown: 25,
          stepDown: 0,
        },
        {
          levelName: "Guardian Grove",
          levelDesc: 'Safe and fun gaming.',
          levelNo: 26,
          step: 0,
        },
      ],
      images: [
        { item: itemOneMedium, fondation: itemMediumFondation },
        { item: itemSixMedium },
        { item: itemFiveMedium, fondation: itemMediumFondation },
        { item: itemFourMedium, fondation: itemMediumFondation },
        { item: itemEightMedium, fondation: itemMediumFondation },
      ],
    },
    {
      bundle: 'Hard',
      bundleName: 'Mountain Heights (Hard)',
      levels: [
        {
          levelName: 'Glittering Galaxy',
          levelDesc: 'Master the world of social media.',
          levelNo: 27,
          step: 0,
          levelNameDown: 'Cyber Summit',
          levelDescDown: 'Be a pro at online communication.',
          levelNoDown: 28,
          stepDown: 0,
        },
        {
          levelName: 'Hashtag Hills',
          levelDesc: 'Share content like a star.',
          levelNo: 29,
          step: 0,
          levelNameDown: 'Meme Meadow',
          levelDescDown: 'Ultimate safety skills for online fun.',
          levelNoDown: 30,
          stepDown: 0,
        },
        {
          levelName: 'Connection Cove',
          levelDesc: 'Be a savvy information seeker.',
          levelNo: 31,
          step: 0,
          levelNameDown: 'Secure Sanctuary',
          levelDescDown: 'Be your best online self.',
          levelNoDown: 32,
          stepDown: 0,
        },
        {
          levelName: 'Techno Terrain',
          levelDesc: 'Lead the fight against cyberbullying.',
          levelNo: 33,
          step: 0,
          levelNameDown: 'Virtue Valley',
          levelDescDown: 'Perfect your screen-life balance.',
          levelNoDown: 34,
          stepDown: 0,
        },
        {
          levelName: 'Mountain of Mentors',
          levelDesc: 'Stay safe from online threats.',
          levelNo: 35,
          step: 0,
          levelNameDown: 'Pawsome Peak',
          levelDescDown: 'Create positive online spaces.',
          levelNoDown: 36,
          stepDown: 0,
        },
        {
          levelName: 'Wisdom Woods',
          levelDesc: 'Stay ahead of harmful content.',
          levelNo: 37,
          step: 0,
          levelNameDown: 'Hero’s Haven',
          levelDescDown: 'Wisely follow online trends.',
          levelNoDown: 38,
          stepDown: 0,
        },
        {
          levelName: "Champion’s Crest",
          levelDesc: 'Be a gaming champion, safely.',
          levelNo: 39,
          step: 0,
        },
      ],
      images: [
        { item: group18Two },
        { item: group5 },
        { item: group8 },
        { item: group9 },
        { item: group6 },
        { item: group1 },
      ],
    },
  ]);

  const [sershaVocalisations, setSershaVocalisations] = useState([
    "/music/SFX/Vocalisations/sershaVocalisations/cute.mp3",
    "/music/SFX/Vocalisations/sershaVocalisations/hehe.mp3",
    "/music/SFX/Vocalisations/sershaVocalisations/hummingexcited.mp3",
    "/music/SFX/Vocalisations/sershaVocalisations/ohno.mp3",
    "/music/SFX/Vocalisations/sershaVocalisations/ohwow.mp3",
    "/music/SFX/Vocalisations/sershaVocalisations/ouch.mp3",
    "/music/SFX/Vocalisations/sershaVocalisations/screamsurprised.mp3",
    "/music/SFX/Vocalisations/sershaVocalisations/surprisedhappy.mp3",
    "/music/SFX/Vocalisations/sershaVocalisations/yahoo.mp3"
  ]);
  const [rogueFoxVocalisations, setRogueFoxVocalisations] = useState([
    "/music/SFX/Vocalisations/rogueFoxVocalisations/annoyed.mp3",
    "/music/SFX/Vocalisations/rogueFoxVocalisations/cuteTwo.mp3",
    "/music/SFX/Vocalisations/rogueFoxVocalisations/fight.mp3",
    "/music/SFX/Vocalisations/rogueFoxVocalisations/fightThree.mp3",
    "/music/SFX/Vocalisations/rogueFoxVocalisations/fightTwo.mp3",
    "/music/SFX/Vocalisations/rogueFoxVocalisations/ouchTwo.mp3",
    "/music/SFX/Vocalisations/rogueFoxVocalisations/slylaugh.mp3",
    "/music/SFX/Vocalisations/rogueFoxVocalisations/strain.mp3",
    "/music/SFX/Vocalisations/rogueFoxVocalisations/uggh.mp3",
    "/music/SFX/Vocalisations/rogueFoxVocalisations/uhohh.mp3",
  ]);

  const [currentVocal, setCurrentVocal] = useState('');
  const [sershaClickCounter, setSershaClickCounter] = useState(0);
  const [rogueClickCounter, setRogueClickCounter] = useState(0);

  const handleCurrentSershaVocal = () => {
    let randomIndex = Math.floor(Math.random() * sershaVocalisations.length);

    setCurrentVocal(sershaVocalisations[randomIndex]);
  }

  const handleCurrentRogueVocal = () => {
    let randomIndex = Math.floor(Math.random() * rogueFoxVocalisations.length);

    setCurrentVocal(rogueFoxVocalisations[randomIndex]);
  }

  useEffect(() => {
    if (sershaClickCounter === 3) {
      handleCurrentSershaVocal();
    }
  }, [sershaClickCounter, sershaVocalisations]);

  useEffect(() => {
    if (rogueClickCounter == 3) {
      handleCurrentRogueVocal();
    }
  }, [rogueClickCounter, rogueFoxVocalisations])


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


        sershaVocalisations, setSershaVocalisations,
        sershaClickCounter, setSershaClickCounter,
        rogueClickCounter, setRogueClickCounter,
        handleCurrentSershaVocal,
        handleCurrentRogueVocal,
        currentVocal, setCurrentVocal,


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
        inventoryItems, setInventoryItems,

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

        // SLIDESHOWS
        slideshowCreateNew,
        setSlideshowCreateNew,
        slideshowNew,
        setSlideshowNew,
        isSlideshowEdit,
        setIsSlideshowEdit,
        slideshowEditing,
        setSlideshowEditing,
        allSlideshows,
        setAllSlideshows,
        isSlideshowShowed,
        setIsSlideshowShowed,
        fetchSlideshows,
        fetchSlideshowByLevel,
        handleIsSlideshowShowed,
        slideshowByLevel, setSlideshowByLevel,
        updateShowedSlideshow,

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
        health, setHealth,
        isShield, setIsShield,
        isCorrectAnswer, setIsCorrectAnswer,
        isCoinMultiplier, setIsCoinMultiplier,

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
        handleCorrectAnswerMiniGames,
        handleCorrectAnswerQuiz,
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
        renderRewardImage,
        renderRewardImageQuiz,

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
