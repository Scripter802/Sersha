import {heart} from '../../assets/images/customization/items/index.js'
import logo from '../../assets/images/login/logo.png'
import signUp from '../../assets/images/login/signup.png'
import passwordforgot from '../../assets/images/login/passwordforgot.png'
import circleLoginOrange from '../../assets/images/login/circleLoginOrange.png'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../../context/context.jsx'

import './registerForm.css'


const RegisterForm = () => {
    const {
        registerNameOfParent,
        setRegisterNameOfParent,
        registerNameOfChild,
        setRegisterNameOfChild,
        registerAgeOfChild,
        setRegisterAgeOfChild,
        registerPhoneNumber,
        setRegisterPhoneNumber,
        registerEmail,
        setRegisterEmail,
        registerPassword,
        setRegisterPassword,
        registerRePassword,
        setRegisterRePassword,
        registerValidate,
        setRegisterValidate,
        registerShowPassword,
        setRegisterShowPassword,
        logIn,
        setLogIn,
      } = useGlobalContext()

  return (
    <>
        <div className='registerHeaderWrapper'>
          <div>
            <img src={logo} alt="sershalogo" />
          </div>
          <div className='registerHeaderRightSide'>
            <p>Have an account?</p>
            <img src={circleLoginOrange} alt="login" />
            <p className='registerButton' onClick={() => setLogIn(true)}>Log In</p>
          </div>
        </div>

        <div className='registerFormWrapper'>
          <h1>Sign Up</h1>
          <div className='regFormWrapper'>
            <form>
              <div className='namesFieldWrapper'>
                <div className="parentName mb-3">
                  <label>
                    Name of parent
                    <input
                      type="text"
                      className={`form-control `}
                      id="parentName"
                      name="parentName"
                      value={registerNameOfParent}
                      placeholder="Name of parent"
                      onChange={(e) => setRegisterNameOfParent(e.target.value)}
                    />
                  </label>
                  <div
                    className={`invalid-feedback text-start`}
                  >
                  </div>
                </div>

                <div className="childName mb-3">
                  <label>
                    Name of child
                    <input
                      type="text"
                      className={`form-control `}
                      id="childName"
                      name="childName"
                      value={registerNameOfChild}
                      placeholder="Name of child"
                      onChange={(e) => setRegisterNameOfChild(e.target.value)}
                    />
                  </label>
                  <div
                    className={`invalid-feedback text-start`}
                  >
                  </div>
                </div>
              </div>

              <div className='agePhoneWrapper'>
                <div className="childAge mb-3">
                  <label>
                    Age of child
                    <input
                      type="number"
                      className={`form-control `}
                      id="childAge"
                      name="childAge"
                      value={registerAgeOfChild}
                      placeholder="Age of child"
                      onChange={(e) => setRegisterAgeOfChild(e.target.value)}
                    />
                  </label>
                  <div
                    className={`invalid-feedback text-start`}
                  >
                  </div>
                </div>

                <div className="phone mb-3">
                  <label>
                    Phone number
                    <input
                      type="text"
                      className={`form-control `}
                      id="phone"
                      name="phone"
                      value={registerPhoneNumber}
                      placeholder="Phone number"
                      onChange={(e) => setRegisterPhoneNumber(e.target.value)}
                    />
                  </label>
                  <div
                    className={`invalid-feedback text-start`}
                  >
                  </div>
                </div>

              </div>

              <div className="email mb-3">
                <label>
                  Email
                  <input
                    type="email"
                    className={`form-control `}
                    id="email"
                    name="email"
                    value={registerEmail}
                    placeholder="Email"
                    onChange={(e) => setRegisterEmail(e.target.value)}
                  />
                </label>
                <div
                  className={`invalid-feedback text-start`}
                >
                </div>
              </div>

              <div className='passwordWrapper'>
                <div className="regPassword mb-3">
                  <div className="input-group">
                    <label>
                      Password
                      <input
                        type={registerShowPassword ? "text" : "password"}
                        className={`form-control`}
                        name="password"
                        id="password"
                        value={registerPassword}
                        placeholder="Password"
                        onChange={(e) => setRegisterPassword(e.target.value)}
                      />
                    </label>
                    <div
                      className={`invalid-feedback text-start`}
                    >
                    </div>
                  </div>
                </div>
                
                <div className="regRePassword mb-3">
                  <div className="input-group">
                    <label>
                      Re-password
                      <input
                        type={registerShowPassword ? "text" : "password"}
                        className={`form-control`}
                        name="rePassword"
                        id="rePassword"
                        value={registerRePassword}
                        placeholder="Re-password"
                        onChange={(e) => setRegisterRePassword(e.target.value)}
                      />
                    </label>
                    <div
                      className={`invalid-feedback text-start`}
                    >
                    </div>
                  </div>      
                </div>
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  className="regBtn btn-primary w-100 theme-btn mx-auto"
                >
                 <img src={signUp} alt="signUp" /> Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className='footerWrapper'>
          <div className='footer'>
            <small>© 2024 Kaza Swap LLC. All rights reserved.</small>
            <small className='madeWith'>Made with <img src={heart} alt="heart" /></small>
          </div>
        </div>
    </>
  )
}

export default RegisterForm