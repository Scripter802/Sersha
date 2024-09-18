import React, { useState } from 'react'
import closeButton from '../../assets/images/adminPanel/closeButton.png'
import './resetPasswordPopup.css'
import { useGlobalContext } from '../../context/context';
import axios from 'axios';

const ResetPasswordPopup = ({ isPasswordForgot, setIsPasswordForgot }) => {
  const { baseUrl } = useGlobalContext();
  const [inputedEmail, setInputedEmail] = useState('');
  const [isSubmited, setIsSubmited] = useState(false);

  const handleSubmitResetPass = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/User/reset-password-email`, { email: inputedEmail });
    } catch (error) {
      console.log('Reset password error:', error);
    }
    setIsSubmited(true);
  };



  return (
    <div className='passwordForgotWrapper'>

      <div className='popupWrapper forgot'>
        <div className="close-btn" onClick={() => setIsPasswordForgot(false)}><img src={closeButton} alt='close' /></div>
        <h2>Reset Password</h2>

        {isSubmited ? (
          <>
            <p className='submitedTextThankyou'>Thank you!</p>
            <p className='submitedText'>We have sent you an email with a link to change your password!</p>
          </>
        ) : (

          <form onSubmit={handleSubmitResetPass}>
            <div className="email mb-3">
              <label>

                <input
                  type="email"
                  className={`form-control`}
                  id="email"
                  name="email"
                  value={inputedEmail}
                  placeholder="Enter your email"
                  onChange={(e) => setInputedEmail(e.target.value)}
                />
              </label>
              <div className={`invalid-feedback text-start`}></div>
            </div>
            <button id='resetPassBtn'>Submit</button>
          </form >
        )}
      </div >
    </div >
  )
}

export default ResetPasswordPopup