import React from 'react'
import { createBrowserRouter, RouterProvider, useLocation, Outlet } from 'react-router-dom'

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
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from 'react-dnd-touch-backend';
import { MultiBackend, TouchTransition } from 'dnd-multi-backend';
import MiniGames from './pages/miniGames/MiniGames.jsx'
import EmojiEmotions from './pages/miniGames/emojiEmotions/EmojiEmotions.jsx'
import FriendOrFoe from './pages/miniGames/friendOrFoe/FriendOrFoe.jsx'
import PostingChallenge from './pages/miniGames/postingChallenge/PostingChallenge.jsx'
import SnapJudgment from './pages/miniGames/snapJudgment/SnapJudgment.jsx'
import ProtectedRoute from './components/signInUp/ProtectedRoute.jsx'
import QuizPage from './pages/quizzes/QuizzPage/QuizPage.jsx'
import MapPage from './pages/map/MapPage.jsx'

// Layout Component
const Layout = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/admin" && location.pathname !== "/admin/" && location.pathname !== "/signin-up" && window.innerWidth > 1000 && <Header />}
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <Layout />,  // Wrap protected routes with Layout
    children: [
      {
        path: '/',
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/foxcustomization',
        element: (
          <ProtectedRoute>
            <FoxCustomization />
          </ProtectedRoute>
        ),
      },
      {
        path: '/map',
        element: (
          <ProtectedRoute>
            <MapPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/dm',
        element: (
          <ProtectedRoute>
            <Dm />
          </ProtectedRoute>
        ),
      },
      {
        path: '/quizz',
        element: (
          <ProtectedRoute>
            <QuizPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/quizzes/rightanswer',
        element: (
          <ProtectedRoute>
            <RightAnswerQuiz />
          </ProtectedRoute>
        ),
      },
      {
        path: '/quizzes/correctanswer',
        element: (
          <ProtectedRoute>
            <CorrectAnswerQuiz />
          </ProtectedRoute>
        ),
      },
      {
        path: '/quizzes/fillintheblank',
        element: (
          <ProtectedRoute>
            <FillInTheBlank />
          </ProtectedRoute>
        ),
      },
      {
        path: '/quizzes/grouping',
        element: (
          <ProtectedRoute>
            <Grouping />
          </ProtectedRoute>
        ),
      },
      {
        path: '/minigames',
        element: (
          <ProtectedRoute>
            <MiniGames />
          </ProtectedRoute>
        ),
      },
      {
        path: "/minigames/emojiemotions",
        element: (
          <ProtectedRoute>
            <EmojiEmotions />
          </ProtectedRoute>
        ),
      },
      {
        path: "/minigames/friendorfoe",
        element: (
          <ProtectedRoute>
            <FriendOrFoe />
          </ProtectedRoute>
        ),
      },
      {
        path: "/minigames/postingchallenge",
        element: (
          <ProtectedRoute>
            <PostingChallenge />
          </ProtectedRoute>
        ),
      },
      {
        path: "/minigames/snapjudgment",
        element: (
          <ProtectedRoute>
            <SnapJudgment />
          </ProtectedRoute>
        ),
      },
      {
        path: '/admin',
        element: (
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        ),
      }
    ],
  },
  {
    path: '/signin-up',
    element: <SignInUpPage />,
  },
]);

const HTML5toTouch = {
  backends: [
    {
      backend: HTML5Backend,
      preview: true,
      transition: TouchTransition
    },
    {
      backend: TouchBackend
    }
  ]
};

const App = () => (
  <DndProvider backend={MultiBackend} options={HTML5toTouch}>
    <RouterProvider router={router} />
  </DndProvider>
);

export default App;
