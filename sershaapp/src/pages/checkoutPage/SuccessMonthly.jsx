import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/context'
import axios from 'axios';


const SuccessMonthly = () => {
  const { baseUrl, user, setUser, subscriptionPeriod } = useGlobalContext();
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (user?.email) {

      let updatingUserSubscription = {
        email: user?.email,
        subscribtionPeriod: subscriptionPeriod,
      }

      const subscribed = async () => {
        try {
          const response = await axios.put(`${baseUrl}/User/subscribe/${user?.email}`, updatingUserSubscription);
          setUser({ ...user, isSubscribed: true })
          setIsSubscribed(true);
          localStorage.setItem('userData', JSON.stringify({ ...user, isSubscribed: true }));


          await axios.post(`${baseUrl}/user/add-to-klaviyo-subscibe-list`, {
            email: user?.email
          });


        } catch (error) {
          console.log("Error while subscribing:", error);
        }
      }

      subscribed();
    }
  }, [user, baseUrl, setUser])

  if (isSubscribed) {
    return (
      <div className="afterPay">
        <h1>Thank you for your subscription!</h1>
      </div>
    )
  }
}

export default SuccessMonthly