import React, { useContext, createContext, useState } from "react";
import postimg from '../assets/images/posts/postimg.png'
import postimg2 from '../assets/images/posts/postImg2.png'
import authorImg from '../assets/images/posts/authorimg.png'

import avatar from '../assets/images/navbar/userpick.png'

const AppContext = createContext();
const baseUrl = "http://localhost:5173";

const AppProvider = ({ children }) => {

  /*   ADMIN PANEL  *//*   ADMIN PANEL  *//*   ADMIN PANEL  *//*   ADMIN PANEL  *//*   ADMIN PANEL  */
  const [activeTab, setActiveTab] = useState("Dashboard")

  /* posts */
  const [allPosts, setAllPosts] = useState([
    { id: 1, profilePicture: 'Frank', profileName: 'Murphy', image: 'frank.murphy@test.com', text: 'User' },
    { id: 2, profilePicture: 'Vic', profileName: 'Reynolds', image: 'vic.reynolds@test.com', text: 'Admin' },
    { id: 3, profilePicture: 'Gina', profileName: 'Jabowski', image: 'gina.jabowski@test.com', text: 'Admin' },
    { id: 4, profilePicture: 'Jessi', profileName: 'Glaser', image: 'jessi.glaser@test.com', text: 'User' },
    { id: 5, profilePicture: 'Jay', profileName: 'Bilzerian', image: 'jay.bilzerian@test.com', text: 'User' }
]);

  const [createNewPost, setCreateNewPost] = useState(false)

  /* users */
  const [allUsers, setAllUsers] = useState([
    { id: 1, username: 'Frank', email: 'frank.murphy@test.com', signupDate: '12.05.2024', currentLevel: '5' },
        { id: 2, username: 'Vic', email: 'vic.reynolds@test.com', signupDate: '12.05.2024', currentLevel: '3' },
        { id: 3, username: 'Gina', email: 'gina.jabowski@test.com', signupDate: '12.05.2024', currentLevel: '7' },
        { id: 4, username: 'Jessi', email: 'jessi.glaser@test.com', signupDate: '12.05.2024',  currentLevel: '1' },
        { id: 5, username: 'Jay', email: 'jay.bilzerian@test.com', signupDate: '12.05.2024', currentLevel: '4' }
]);


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
  const [registerAgeOfChild, setRegisterAgeOfChild] = useState("");
  const [registerPhoneNumber, setRegisterPhoneNumber] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerRePassword, setRegisterRePassword] = useState("");
  const [registerValidate, setRegisterValidate] = useState({});
  const [registerShowPassword, setRegisterShowPassword] = useState(false);

/* _______________________________________________________________________________ */


/* DMS  *//* DMS  *//* DMS  *//* DMS  *//* DMS  *//* DMS  *//* DMS  *//* DMS  *//* DMS  */


  const [selectedMessagePreview, setSelectedMessagePreview] = useState(false);


  return (
    <AppContext.Provider 
      value={{
        activeTab,
        setActiveTab,
        allPosts,
        setAllPosts,
        allUsers,
        setAllUsers,
        createNewPost,
        setCreateNewPost,
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
        registerAgeOfChild,
        setRegisterAgeOfChild,
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
