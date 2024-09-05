import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/context.jsx';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const userdata = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    if (userdata) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [userdata]);


  if (!token) {
    return <Navigate to="/signin-up" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(`SUBS ${userdata?.isSubscribed !== true}`)
  if (userdata?.type == "User" && !userdata?.isSubscribed) {
    return <Navigate to="/checkout" />;
  }

  return children;
};

export default ProtectedRoute;
