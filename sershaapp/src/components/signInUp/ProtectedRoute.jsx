import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/context.jsx';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useGlobalContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/signin-up" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user?.type !== "Admin" || user?.isSubscribed !== true) {
    console.log(`AAAAAA ${JSON.stringify(user)}`)
    return <Navigate to="/checkout" />;
  }

  return children;
};

export default ProtectedRoute;
