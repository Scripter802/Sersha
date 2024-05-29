import React, { useContext, createContext, useState } from "react";
import postimg from '../assets/images/posts/postimg.png'
import postimg2 from '../assets/images/posts/postImg2.png'
import authorImg from '../assets/images/posts/authorimg.png'
import axios from 'axios'

import avatar from '../assets/images/navbar/userpick.png'

const AppContext = createContext();
const baseUrl = "http://localhost:5000";
const baseUrlImage = "http://172.28.176.1:8080/api";

const AppProvider = ({ children }) => {

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

  /* ADMIN RIGHT ANSWER QUIZ */
  const [rightAnswerCreateNew, setRightAnswerCreateNew] = useState(false);
  const [allRightAnswerQuestions, setAllRightAnswerQuestions] = useState([]);
  /* ADMIN FILL IN THE BLANK */
  const [fillInTheBlankCreateNew, setFillInTheBlankCreateNew] = useState(false);
  const [allFillInTheBlankStatements, setAllFillInTheBlankStatements] = useState([]);
  /* ADMIN CORRECT/INCORRECT */
  const [correctIncorrectCreateNew, setCorrectIncorrectCreateNew] = useState(false);
  const [allCorrectIncorrect, setAllCorrectIncorrectCreateNew] = useState([]);
  /* ADMIN GROUPING */
  const [groupingCreateNew, setGroupingCreateNew] = useState(false);
  const [allGrouping, setAllGrouping] = useState([]);
  /* _______________________________________________________________________________ */

  /* SIGN IN_SIGN UP PAGE *//* SIGN IN_SIGN UP PAGE *//* SIGN IN_SIGN UP PAGE *//* SIGN IN_SIGN UP PAGE *//* SIGN IN_SIGN UP PAGE */

  const [logIn, setLogIn] = useState(true);

  /* LOG IN FORM COMPONENT */

  const [logEmail, setLogEmail] = useState("");
  const [logPassword, setLogPassword] = useState("");
  const [logRemember, setLogRemember] = useState(false);
  const [logValidate, setLogValidate] = useState({});
  const [logShowPassword, setLogShowPassword] = useState(false);


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






  return (
    <AppContext.Provider
      value={{
        baseUrl,
        baseUrlImage,
        windowWidth,
        setWindowWidth,
        activeTab,
        setActiveTab,
        allPosts,
        setAllPosts,
        postsPerStage,
        setPostsPerStage,
        getPostsPerStage,
        randomPosts,
        setRandomPosts,
        isPostsLoading,
        setIsPostsLoading,
        allUsers,
        setAllUsers,
        createNewPost,
        setCreateNewPost,
        isPostEdit,
        setIsPostEdit,
        editingPost,
        setEditingPost,
        isTopPart,
        setIsTopPart,
        isBottomPart,
        setIsBottomPart,
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
        quizzesActiveTab,
        setQuizzesActiveTab,
        rightAnswerCreateNew,
        setRightAnswerCreateNew,
        allRightAnswerQuestions,
        setAllRightAnswerQuestions,
        fillInTheBlankCreateNew,
        setFillInTheBlankCreateNew,
        allFillInTheBlankStatements,
        setAllFillInTheBlankStatements,
        correctIncorrectCreateNew,
        setCorrectIncorrectCreateNew,
        allCorrectIncorrect,
        setAllCorrectIncorrectCreateNew,
        groupingCreateNew,
        setGroupingCreateNew,
        allGrouping,
        setAllGrouping,
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
        selectedMessagePreview,
        setSelectedMessagePreview,
        getAllPosts,
        handleDeletePost,
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
