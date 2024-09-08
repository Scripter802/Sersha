import React, { useEffect } from 'react'
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import './checkoutPage.css'
import { useGlobalContext } from '../../context/context'
import { useNavigate } from 'react-router-dom';
import HeaderResponsive from '../../components/HeaderResponsive/HeaderResponsive';

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_KEY);
  }

  return stripePromise;
};

const CheckoutPage = () => {
  const [stripeError, setStripeError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const { user } = useGlobalContext();
  const navigate = useNavigate();

  const yearlySubscription = {
    price: "price_1PoPN9DTW8RXGzBATOtbzbxP",
    quantity: 1
  };
  const monthlySubscription = {
    price: "price_1PoPLdDTW8RXGzBAGNgaTJUQ",
    quantity: 1
  };

  const monthlyCheckoutOptions = {
    lineItems: [monthlySubscription],
    mode: "subscription",
    successUrl: `${window.location.origin}/successmonthly`,
    cancelUrl: `${window.location.origin}/`
  };

  const yearlyCheckoutOptions = {
    lineItems: [yearlySubscription],
    mode: "subscription",
    // allow_promotion_codes,
    successUrl: `${window.location.origin}/successyearly`,
    cancelUrl: `${window.location.origin}/`
  };

  const redirectToMonthlyCheckout = async () => {
    setLoading(true);
    console.log("redirectToCheckout");

    const stripe = await getStripe();

    const { error } = await stripe.redirectToCheckout(monthlyCheckoutOptions);
    console.log("Stripe checkout error", error);

    if (error) setStripeError(error.message);
    setLoading(false);
  };

  const redirectToYearlyCheckout = async () => {
    setLoading(true);
    console.log("redirectToCheckout");

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(yearlyCheckoutOptions);
    console.log("Stripe checkout error", error);

    if (error) setStripeError(error.message);
    setLoading(false);
  };

  if (stripeError) alert(stripeError);


  return (
    <div className='checkoutPageWrapper'>
      {window.innerWidth < 1000 && <HeaderResponsive />}
      <h1 className='checkoutTitle'>Subscription  </h1>
      {/* <p className=''>Please Subscribe to Play Sersha  </p> */}
      <div className='checkoutCartWrapper'>

        <div className='checkoutCart' onClick={redirectToMonthlyCheckout}>
          <div className='cartTitle'>
            <h2>Monthly Subscription</h2>
            {/* <h2 className='subtitle'>(1 parent, 1 child)</h2>
            <small>Monthly Subscription</small> */}
          </div>

          <p className='cartDescription'>Enjoy full access to Sersha for an entire month.</p>
          <h3 className='cartPrice'>5.99€</h3>
        </div>

        <div className='checkoutCart' onClick={redirectToYearlyCheckout}>
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