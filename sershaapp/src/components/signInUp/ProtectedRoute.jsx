import React from 'react';
import { Navigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/context.jsx';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useGlobalContext();

  let token = localStorage.getItem('token');
  console.log(token)
  if (!token) {
    return <Navigate to="/signin-up" />;
  }

  return children;
};

export default ProtectedRoute;
