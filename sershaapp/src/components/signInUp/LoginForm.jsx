import { heart } from '../../assets/images/customization/items/index.js'
import logo from '../../assets/images/login/logo.png'
import signup from '../../assets/images/login/signup.png'
import passwordforgot from '../../assets/images/login/passwordforgot.png'
import circleLogin from '../../assets/images/login/circleLogin.png'
import { Link, redirect } from 'react-router-dom'
import { useGlobalContext } from '../../context/context.jsx'

import './loginform.css'
import { useState } from 'react'
import Slideshow from '../SlideShow/SlideShow.jsx'


const LoginForm = () => {
  const { logEmail,
    setLogEmail,
    logPassword,
    setLogPassword,
    logRemember,
    setLogRemember,
    logValidate,
    setLogValidate,
    logShowPassword,
    setLogShowPassword,
    logIn,
    setLogIn,
  } = useGlobalContext()

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let adminUsername = 'admin@admin.com';
  let adminPass = 'admin';


  const handleSubmit = (e) => {
    e.preventDefault()

    if (logEmail === adminUsername && logPassword === adminPass) {
      setIsLoggedIn(true);
    } else {
      alert('Invalid login credentials');
    }
  };
  console.log(logEmail, isLoggedIn)

  if (isLoggedIn) {
    return <Slideshow />; // Render the slideshow component after login
  }

  return (
    <>
      <div className='logInHeaderWrapper'>
        <div>
          <img src={logo} alt="sershalogo" />
        </div>
        <div className='logInHeaderRightSide'>
          <p>Don’t have an account?</p>
          <img src={signup} alt="signup" />
          <p className='signUpButton' onClick={() => setLogIn(false)}>Sign Up</p>
        </div>
      </div>

      <div className='logInFormWrapper'>
        <h1>Log In</h1>
        <div className='formWrapper'>
          <form
          >
            <div className="email mb-3">
              <label>
                Email
                <input
                  type="email"
                  className={`form-control `}
                  id="email"
                  name="email"
                  value={logEmail}
                  placeholder="Email"
                  onChange={(e) => setLogEmail(e.target.value)}
                />
              </label>
              <div
                className={`invalid-feedback text-start`}
              >
              </div>
            </div>

            <div className="password mb-3">
              <div className="input-group">
                <label>
                  Password
                  <input
                    type={logShowPassword ? "text" : "password"}
                    className={`form-control`}
                    name="password"
                    id="password"
                    value={logPassword}
                    placeholder="Password"
                    onChange={(e) => setLogPassword(e.target.value)}
                  />
                </label>

                <div
                  className={`invalid-feedback text-start`}
                >
                </div>
              </div>

              <div className="extra mt-3 row justify-content-between">
                <div className="col-6">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="remember"
                      checked={logRemember}
                      onChange={(e) => setLogRemember(e.currentTarget.checked)}
                    />
                    <label className="form-check-label" htmlFor="remember">
                      Remember me
                    </label>
                  </div>
                </div>
                <div className="col-6">
                  <div className="forgot-password text-end">
                    <img src={passwordforgot} alt="forgotPassword" />
                    <Link className='forgotPassLink' to="/forgot-password">Forgot password?</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary w-100 theme-btn mx-auto"
                onClick={handleSubmit}
              >
                <img src={circleLogin} alt="loginCircle" /> Log In
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

export default LoginForm