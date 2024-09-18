import React, { useState, useEffect } from 'react';
import visible from '../../assets/images/login/visible.png';
import './forgotPassword.css';
import { useGlobalContext } from '../../context/context';
import axios from 'axios';

const ForgotPassword = () => {
  const { baseUrl } = useGlobalContext();
  const [newShowPassword, setNewShowPassword] = useState(false);
  const [newReShowPassword, setNewReShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [newRePassword, setNewRePassword] = useState('');
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');


  useEffect(() => {
    // Extract token and email from URL
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    const email = queryParams.get('email');

    setToken(token);
    setEmail(email);
  }, []);

  const handleSubmit = () => {
    console.log('Token:', token);
    console.log('Email:', email);
    console.log('New Password:', newPassword);
    console.log('Re-entered Password:', newRePassword);


    axios.post(`${baseUrl}/User/reset-password`, { token, email, password: newPassword })
  };

  return (
    <div className='forgotPasswordWrapper'>
      <h1>Please enter a new password!</h1>
      <div>
        <div className="passwordWrapper">
          <div className="regPassword mb-3">
            <label>Password</label>
            <div className="input-group passReg1">
              <input
                type={newShowPassword ? "text" : "password"}
                className="form-control"
                name="password"
                id="password"
                value={newPassword}
                placeholder="Password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                className="btnShowHideRegister1"
                onClick={() => setNewShowPassword(!newShowPassword)}
              >
                <img src={visible} alt="toggle visibility" />
              </button>
            </div>
          </div>

          <div className="regRePassword mb-3">
            <label>Re-password</label>
            <div className="input-group passReg2">
              <input
                type={newReShowPassword ? "text" : "password"}
                className="form-control"
                name="rePassword"
                id="rePassword"
                value={newRePassword}
                placeholder="Re-password"
                onChange={(e) => setNewRePassword(e.target.value)}
              />
              <button
                type="button"
                className="btnShowHideRegister2"
                onClick={() => setNewReShowPassword(!newReShowPassword)}
              >
                <img src={visible} alt="toggle visibility" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <button className='submitBtnForgotPass' onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default ForgotPassword;
