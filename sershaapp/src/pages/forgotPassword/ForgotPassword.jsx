import React, { useState } from 'react'
import visible from '../../assets/images/login/visible.png';
import './forgotPassword.css'

const ForgotPassword = () => {
  const [newShowPassword, setNewShowPassword] = useState(false);
  const [newReShowPassword, setNewReShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [newRePassword, setNewRePassword] = useState('');



  return (
    <div className='forgotPasswordWrapper'>
      <h1>Please enter a new password!</h1>
      <div>

        <div className="passwordWrapper">
          <div className="regPassword mb-3">
            <label>
              Password
            </label>
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
              <div className="invalid-feedback text-start"></div>
            </div>
          </div>

          <div className="regRePassword mb-3">
            <label>
              Re-password
            </label>
            <div className="input-group passReg2">
              <input
                type={newReShowPassword ? "text" : "password"}
                className={`form-control`}
                name="rePassword"
                id="rePassword"
                value={newRePassword}
                placeholder="Re-password"
                onChange={(e) => setNewRePassword(e.target.value)}
              />
              <button
                type="button"
                className=" btnShowHideRegister2"
                onClick={() => setNewReShowPassword(!newReShowPassword)}
              >
                <img src={visible} alt="toggle visibility" />
              </button>
              <div className={`invalid-feedback text-start`}></div>
            </div>
          </div>
        </div>

      </div>
      <button className='submitBtnForgotPass'>Submit</button>
    </div>
  )
}

export default ForgotPassword