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

  // If there's no token, redirect to the signin page
  if (!token) {
    return <Navigate to="/signin-up" />;
  }

  // While waiting for the user data to load, you can show a loading spinner or null
  if (loading) {
    return <div>Loading...</div>; // Replace this with a spinner or any loading indicator
  }

  // If the user is not an admin and not subscribed, redirect to the checkout page
  if (user?.type !== "Admin" && user?.isSubscribed !== true) {
    return <Navigate to="/checkout" />;
  }

  return children;
};

export default ProtectedRoute;
