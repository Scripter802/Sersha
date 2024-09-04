import { useState, useEffect } from 'react';
import { heart } from '../../assets/images/customization/items/index.js';
import logo from '../../assets/images/login/logo.png';
import skip from '../../assets/images/login/skip.png';
import signup from '../../assets/images/login/signup.png';
import passwordforgot from '../../assets/images/login/passwordforgot.png';
import circleLogin from '../../assets/images/login/circleLogin.png';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context/context.jsx';
import visible from '../../assets/images/login/visible.png';
import './loginform.css';
import Slideshow from '../SlideShow/SlideShow.jsx';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const LoginForm = () => {
  const {
    baseUrl,
    logEmail,
    setLogEmail,
    logPassword,
    setLogPassword,
    logRemember,
    setLogRemember,
    logShowPassword,
    setLogShowPassword,
    logIn,
    setLogIn,
    windowWidth,
    setWindowWidth,
    loginUser,
    user,
    setUser,
    setIsTutorialActive,
    fetchSlideshows,
    fetchSlideshowByLevel,
    allSlideshows,
    slideshowByLevel,
  } = useGlobalContext();

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isFirstTimeLoggedInChange = async () => {
    try {
      const response = await axios.put(
        `${baseUrl}/User/${user.email}`,
        {
          isFirstTimeLoggedIn: false,
          email: user.email,
          stage: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setUser({ ...user, stage: 1 })
      console.log('User updated:', response.data);
    } catch (error) {
      console.log('Error updating user:', error);
    }
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let token;
    let userData;
    if (localStorage.getItem('token')) {
      token = localStorage.getItem('token');
    }
    if (localStorage.getItem('userData')) {
      userData = localStorage.getItem('userData');
    }

    if (token && userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        setUser(userData)
        setIsLoggedIn(true)
        if (!localStorage.getItem('userData')) {
          localStorage.setItem('userData', JSON.stringify(userData));
        }
        console.log('User already logged in:', parsedUserData);
      } catch (error) {
        console.error('Error parsing userData:', error);
        if (localStorage.getItem('userData')) {
          localStorage.removeItem('userData');
        }
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email: logEmail,
      password: logPassword,
    };


    try {
      const response = await fetch(`${baseUrl}/User/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        loginUser(data.token);
        localStorage.setItem('userData', JSON.stringify(data));
        setUser(data);
        setIsLoggedIn(true);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "Username or Password is incorrect!");
      }
    } catch (error) {
      setErrorMessage("Username or Password is incorrect!");
    }
  };

  if (isLoggedIn == true) {
    if (user && user.isFirstTimeLoggedIn == true) {
      console.log(`user login is first time: ${user.isFirstTimeLoggedIn}`)
      localStorage.setItem('levelStep', '0');
      setIsTutorialActive(true);
      isFirstTimeLoggedInChange();
      Cookies.set('isSlideShowed', JSON.stringify({ level: 1, isSlideShowed: false }));




      return (<Slideshow lvl={'1'} />)
    }
    else {
      navigate('/');
    }
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
            <div className='goToSignUpBtn'>

              <img src={skip} alt="signup" />
              <p className='signUpButton' onClick={() => setLogIn(false)}>Sign Up</p>
            </div>
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
              <label className='passLabel'>
                Password
              </label>
              <div className="input-group passwordLogin">
                <div className='inputPassWrapper'>

                  <input
                    type={logShowPassword ? "text" : "password"}
                    className={`form-control`}
                    name="password"
                    id="password"
                    value={logPassword}
                    placeholder="Password"
                    onChange={(e) => setLogPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className=" btnShowHide"
                    onClick={() => setLogShowPassword(!logShowPassword)}
                  >
                    {logShowPassword ? <img src={visible} /> : <img src={visible} />}
                  </button>
                </div>
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
              <div className='logInDontHaveAcc'>
                <p>Don’t have an account?</p>
                <div className='signUpButtonWrapper'>
                  <img src={skip} alt="signup" />
                  <p className='signUpButton' onClick={() => setLogIn(false)}>Sign Up</p>

                </div>
              </div>
            )}

            <div className="text-center">
              <button
                type="submit"
                className="login-btn btn-primary w-100 theme-btn mx-auto"
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
