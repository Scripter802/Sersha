import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import HomePage from './pages/HomePage.jsx'
import Header from './components/Header.jsx'
import FoxCustomization from './pages/FoxCustomization.jsx'
import Dm from './pages/Dm.jsx'
import RightAnswerQuiz from './pages/quizzes/RightAnswerQuiz.jsx'
import CorrectAnswerQuiz from './pages/quizzes/CorrectAnswerQuiz.jsx'
import FillInTheBlank from './pages/quizzes/FillInTheBlank.jsx'
import Grouping from './pages/quizzes/Grouping.jsx'

import './index.css'

import { DndProvider } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

const App = () => {
  const router = createBrowserRouter([
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
    }
  ]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Header />
      <RouterProvider router={router} />
    </DndProvider>
  )
}

export default App