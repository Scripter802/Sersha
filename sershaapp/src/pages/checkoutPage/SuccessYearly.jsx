import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/context'
import axios from 'axios';


const SuccessYearly = () => {
  const { baseUrl, user, setUser } = useGlobalContext();
  const [isSubscribed, setIsSubscribed] = useState(false);
  console.log(user?.email)

  useEffect(() => {
    if (user?.email) {
      let updatingUserSubscription = {
        email: user?.email,
        subscribtionPeriod: 1,
      }

      const subscribed = async () => {
        try {
          const response = await axios.put(`${baseUrl}/User/subscribe/${user?.email}`, updatingUserSubscription);
          setUser({ ...user, isSubscribed: true })
          setIsSubscribed(true);
        } catch (error) {
          console.log(error);
        }
      }

      subscribed();
    }
  }, [user])

  if (isSubscribed) {
    return (
      <Navigate to="/" />
    )
  }
}

export default SuccessYearly