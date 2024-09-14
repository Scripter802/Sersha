import React, { useEffect } from 'react'
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import './checkoutPage.css'
import HeaderResponsive from '../../components/HeaderResponsive/HeaderResponsive';
import { useGlobalContext } from '../../context/context';


const CheckoutPage = () => {
  const { baseUrl, subscriptionPeriod, setSubscriptionPeriod } = useGlobalContext();
  const [isLoading, setLoading] = useState(false);

  const yearlySubscription = {
    priceId: "price_1PxGnuDTW8RXGzBAozsI7S7y",
  };
  const monthlySubscription = {
    priceId: "price_1PxGmeDTW8RXGzBAwOUGQUSC",
  };


  const redirectToCheckout = async (subPlan) => {
    setLoading(true);


    try {
      const response = await fetch(`${baseUrl}/Stripe/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(subPlan)
      });

      const { sessionId } = await response.json();
      const stripe = await loadStripe(import.meta.env.VITE_APP_STRIPE_KEY);
      await stripe.redirectToCheckout({ sessionId });

    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };


  return (
    <div className='checkoutPageWrapper'>
      {window.innerWidth < 1000 && <HeaderResponsive />}
      <h1 className='checkoutTitle'>Subscription  </h1>
      {/* <p className=''>Please Subscribe to Play Sersha  </p> */}
      <div className='checkoutCartWrapper'>

        <div className='checkoutCart' onClick={() => { redirectToCheckout(monthlySubscription); setSubscriptionPeriod('0') }}>
          <div className='cartTitle'>
            <h2>Monthly Subscription</h2>
            {/* <h2 className='subtitle'>(1 parent, 1 child)</h2>
            <small>Monthly Subscription</small> */}
          </div>

          <p className='cartDescription'>Enjoy full access to Sersha for an entire month.</p>
          <h3 className='cartPrice'>5.99€</h3>
        </div>

        <div className='checkoutCart' onClick={() => { redirectToCheckout(yearlySubscription); setSubscriptionPeriod('1') }}>
          <div className='cartTitle'>
            <h2>Yearly Subscription</h2>
            {/* <h2 className='subtitle'>(1 parent, 1 child)</h2> */}
            {/* <small>Yearly Subscription</small> */}
          </div>

          <p className='cartDescription'>Experience the benefits of Sersha all year long at an exclusive rate.</p>
          <h3 className='cartPrice'>54.99€</h3>
        </div>

      </div>
    </div>
  )
}

export default CheckoutPage