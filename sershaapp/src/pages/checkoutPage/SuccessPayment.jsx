import React from 'react'
import { Navigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/context'


const SuccessPayment = () => {
  const { user } = useGlobalContext();

  return (
    // <Navigate to="/" />
    <div>A</div>
  )
}

export default SuccessPayment