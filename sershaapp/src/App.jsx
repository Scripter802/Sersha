import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import HomePage from './pages/homepage/HomePage.jsx'
import Header from './components/Header.jsx'
import FoxCustomization from './pages/foxcustomization/FoxCustomization.jsx'
import Dm from './pages/dm/Dm.jsx'
import RightAnswerQuiz from './pages/quizzes/RightAnswerQuiz.jsx'
import CorrectAnswerQuiz from './pages/quizzes/CorrectAnswerQuiz.jsx'
import FillInTheBlank from './pages/quizzes/FillInTheBlank.jsx'
import Grouping from './pages/quizzes/Grouping.jsx'
import AdminPanel from './pages/adminPanel/AdminPanel.jsx'
import SignInUpPage from './pages/signInUpPage/SignInUpPage.jsx'

import './index.css'

import { DndProvider } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import MiniGames from './pages/miniGames/MiniGames.jsx'
import EmojiEmotions from './pages/miniGames/emojiEmotions/EmojiEmotions.jsx'
import FriendOrFoe from './pages/miniGames/friendOrFoe/FriendOrFoe.jsx'
import PostingChallenge from './pages/miniGames/postingChallenge/PostingChallenge.jsx'
import SnapJudgment from './pages/miniGames/snapJudgment/SnapJudgment.jsx'
import { useGlobalContext } from './context/context.jsx'



const App = () => {
  const {selectedMessagePreview} = useGlobalContext()

  const router = createBrowserRouter([
    {
      path: '/signin-up',
      element: <SignInUpPage />,
    },
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/foxcustomization',
      element: <FoxCustomization />
    },
    {
      path: '/dm',
      element: <Dm />
    },
    {
      path: '/quizzes/rightanswer',
      element: <RightAnswerQuiz />
    },
    {
      path: '/quizzes/correctanswer',
      element: <CorrectAnswerQuiz />
    },
    {
      path: '/quizzes/fillintheblank',
      element: <FillInTheBlank  />
    },
    {
      path: '/quizzes/grouping',
      element: <Grouping />
    },
    {
      path: '/minigames',
      element: <MiniGames />,
    },
    {
      path: "/minigames/emojiemotions",
      element: <EmojiEmotions />,
    },
    {
      path: "/minigames/friendorfoe",
      element: <FriendOrFoe />,
    },
    {
      path: "/minigames/postingchallenge",
      element: <PostingChallenge />,
    },
    {
      path: "/minigames/snapjudgment",
      element: <SnapJudgment />,
    },
    {
      path: '/admin',
      element: <AdminPanel />
    }
  ]);

  console.log(selectedMessagePreview)

  return (
    <DndProvider backend={HTML5Backend}>
     {window.location.pathname !== "/admin" && window.location.pathname !== "/signin-up" && (window.innerWidth < 1000 && selectedMessagePreview === false) && <Header /> }
      <RouterProvider router={router} />
    </DndProvider>
  )
}

export default App