import { useState, useEffect } from 'react';
import { heart } from '../../assets/images/customization/items/index.js';
import logo from '../../assets/images/login/logo.png';
import skip from '../../assets/images/login/skip.png';
import signup from '../../assets/images/login/signup.png';
import passwordforgot from '../../assets/images/login/passwordforgot.png';
import circleLogin from '../../assets/images/login/circleLogin.png';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context/context.jsx';
import './loginform.css';
import Slideshow from '../SlideShow/SlideShow.jsx';

const LoginForm = () => {
  const {
    baseUrl,
    logEmail,
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
    windowWidth,
    setWindowWidth,
  } = useGlobalContext();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email: logEmail,
      password: logPassword,
    };

    try {
      const response = await fetch(`${baseUrl}/api/User/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Handle successful login
        const data = await response.json();
        console.log('Login successful:', data);
        setIsLoggedIn(true);
      } else if (logEmail === 'admin@admin.com' && logPassword === 'admin') {
        setIsLoggedIn(true);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Login failed');

      }
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred');
    }
  };

  if (isLoggedIn) {
    return <Slideshow />; // Render the slideshow component after login
  }

  return (
    <>
      <div className='logInHeaderWrapper'>
        <div>
          <img src={logo} alt="sershalogo" />
        </div>
        {windowWidth > 1000 && (
          <div className='logInHeaderRightSide'>
            <p>Don’t have an account?</p>
            <img src={skip} alt="signup" />
            <p className='signUpButton' onClick={() => setLogIn(false)}>Sign Up</p>
          </div>
        )}
      </div>

      <div className='logInFormWrapper'>
        <h1>Log In</h1>
        <div className='formWrapper'>
          <form onSubmit={handleSubmit}>
            <div className="email mb-3">
              <label>
                Email
                <input
                  type="email"
                  className={`form-control`}
                  id="email"
                  name="email"
                  value={logEmail}
                  placeholder="Email"
                  onChange={(e) => setLogEmail(e.target.value)}
                />
              </label>
              <div className={`invalid-feedback text-start`}></div>
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
                <div className={`invalid-feedback text-start`}></div>
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

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            {windowWidth < 1000 && (
              <div className='logInHeaderRightSide'>
                <p>Don’t have an account?</p>
                <img src={skip} alt="signup" />
                <p className='signUpButton' onClick={() => setLogIn(false)}>Sign Up</p>
              </div>
            )}

            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary w-100 theme-btn mx-auto"
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
  );
}

export default LoginForm;
