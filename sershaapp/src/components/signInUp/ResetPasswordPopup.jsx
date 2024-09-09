import React from 'react'
import closeButton from '../../assets/images/adminPanel/closeButton.png'
import './resetPasswordPopup.css'

const ResetPasswordPopup = () => {
  return (
    <div className='passwordForgotWrapper'>
      {/* <div className="close-btn" onClick={() => setCreateNewPostAuthor(false)}><img src={closeButton} alt='close' /></div> */}

      <div className='popupWrapper'>
        <p>Type your email please</p>

      </div>
    </div>
  )
}

export default ResetPasswordPopup