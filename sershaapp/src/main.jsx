import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'
import HomePage from './pages/HomePage.jsx'
import Header from './components/Header.jsx'
import FoxCustomization from './pages/FoxCustomization.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/foxcustomization',
    element: <FoxCustomization />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <>
    <RouterProvider router={router} />
    </>
  </React.StrictMode>,
);
