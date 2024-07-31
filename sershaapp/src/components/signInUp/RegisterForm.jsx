import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { heart } from '../../assets/images/customization/items/index.js';
import logo from '../../assets/images/login/logo.png';
import signUp from '../../assets/images/login/signup.png';
import circleLoginOrange from '../../assets/images/login/circleLoginOrange.png';
import visible from '../../assets/images/login/visible.png';
import { useGlobalContext } from '../../context/context.jsx';
import './registerForm.css';

const RegisterForm = () => {
  const {
    baseUrl,
    baseUrlImage,
    registerNameOfParent,
    setRegisterNameOfParent,
    registerNameOfChild,
    setRegisterNameOfChild,
    registerDateOfBirth,
    setRegisterDateOfBirth,
    registerPhoneNumber,
    setRegisterPhoneNumber,
    registerEmail,
    setRegisterEmail,
    registerPassword,
    setRegisterPassword,
    registerRePassword,
    setRegisterRePassword,
    registerShowPassword,
    setRegisterShowPassword,
    logIn,
    setLogIn,
  } = useGlobalContext();

  const [errorMessage, setErrorMessage] = useState('');
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [parentNameError, setParentNameError] = useState();
  const [childNameError, setChildNameError] = useState();
  const [ageError, setAgeError] = useState();
  const [phoneNumberError, setPhoneNumberError] = useState();
  const [emailError, setEmailError] = useState();
  const [selectedAvatarImage, setSelectedAvatarImage] = useState();

  console.log(`sel ${selectedAvatarImage?.imagePath}`)

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const response = await axios.get(`${baseUrl}/avatar`);
        setAvatars(response.data);
      } catch (error) {
        console.log('Error fetching avatars:', error);
      }
    };

    fetchAvatars();
  }, [baseUrl]);
  console.log(selectedAvatar)

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar.id);
    setSelectedAvatarImage(avatar);
    setShowAvatarModal(false);
  };

  const resetFormFields = () => {
    setRegisterNameOfParent('');
    setRegisterNameOfChild('');
    setRegisterDateOfBirth('');
    setRegisterPhoneNumber('');
    setRegisterEmail('');
    setRegisterPassword('');
    setRegisterRePassword('');
    setSelectedAvatar(null);
    setErrorMessage('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();


    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/;

    console.log(passwordRegex, registerPassword)

    if (!passwordRegex.test(registerPassword)) {
      setErrorMessage('Password must contain minimum 8 letters: 1 uppercase letter 1 lowercase letter, 1 number, and 1 special character.');
      return;
    }

    if (registerPassword !== registerRePassword) {
      setErrorMessage('Passwords do not match');
      return;
    }


    const formattedDateOfBirth = new Date(registerDateOfBirth).toISOString();

    const userData = {
      fullName: registerNameOfChild,
      email: registerEmail,
      password: registerPassword,
      parentsFullName: registerNameOfParent,
      parentPhoneNumber: registerPhoneNumber,
      userBirthDate: formattedDateOfBirth,
      avatarImageId: selectedAvatar,
    };

    try {
      const response = await fetch(`${baseUrl}/User/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log('Registration successful');
        resetFormFields();
        setLogIn(true);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Registration failed');
      }
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred');
    }
  };


  //  ERROR HANDLE //

  const parentNameHandle = (e) => {
    let parName = e;
    if (parName.length < 2) {
      setParentNameError('Name must have at least 2 letters!')
    } else {
      setParentNameError('')
    }
    setRegisterNameOfParent(e);
  }

  const childNameHandle = (e) => {
    let childName = e;
    if (childName.length < 2) {
      setChildNameError('Name must have at least 2 letters!')
    } else {
      setChildNameError('')
    }
    setRegisterNameOfChild(e);
  }

  const dateHandle = (dateString) => {
    const dateNum = new Date(dateString);
    if (isNaN(dateNum.getTime())) {
      setAgeError('Date is not valid! Please enter a valid date.');
    } else {
      setAgeError('');
    }
    setRegisterDateOfBirth(dateString);
  };

  const phoneHandle = (e) => {
    let reg = /^\+?([0-9]{10,15})$/;
    let phoneNum = e;
    if (!phoneNum.match(reg)) {
      setPhoneNumberError('Phone number is not valid!')
    } else {
      setPhoneNumberError('')
    }
    setRegisterPhoneNumber(e);
  }

  const emailHandle = (e) => {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    let emailCurr = e;
    if (reg.test(emailCurr) == false) {
      setEmailError('Email is not valid! Please enter your email!')
    } else {
      setEmailError('')
    }
    setRegisterEmail(e);
  }
  // ERROR HANDLE END //

  return (
    <>
      <div className='registerHeaderWrapper'>
        <div>
          <img src={logo} alt="sershalogo" />
        </div>
        {window.innerWidth > 1000 &&
          <div className='registerHeaderRightSide'>
            <p>Have an account?</p>
            <img src={circleLoginOrange} alt="login" />
            <p className='registerButton' onClick={() => setLogIn(true)}>Log In</p>
          </div>
        }
      </div>

      <div className='registerFormWrapper'>
        <h1>Sign Up</h1>
        <div className='regFormWrapper'>
          <form onSubmit={handleRegister}>
            <div className='namesFieldWrapper'>
              <div className="parentName mb-3">
                <label>
                  Name of parent
                  <input
                    type="text"
                    className={`form-control`}
                    id="parentName"
                    name="parentName"
                    value={registerNameOfParent}
                    placeholder="Name of parent"
                    onChange={(e) => parentNameHandle(e.target.value)}
                  />
                </label>
                <div className={`invalid-feedback text-start`}>{parentNameError}</div>
              </div>

              <div className="childName mb-3">
                <label>
                  Name of child
                  <input
                    type="text"
                    className={`form-control`}
                    id="childName"
                    name="childName"
                    value={registerNameOfChild}
                    placeholder="Name of child"
                    onChange={(e) => childNameHandle(e.target.value)}
                  />
                </label>
                <div className={`invalid-feedback text-start`}>{childNameError}</div>
              </div>
            </div>

            <div className='agePhoneWrapper'>
              <div className="childAge mb-3">
                <label>
                  Age of child
                  <input
                    type="date"
                    className={`form-control`}
                    id="childAge"
                    name="childAge"
                    value={registerDateOfBirth}
                    placeholder="Age of child"
                    onChange={(e) => dateHandle(e.target.value)}
                  />
                </label>
                <div className={`invalid-feedback text-start`}>{ageError}</div>
              </div>

              <div className="phone mb-3">
                <label>
                  Phone number
                  <input
                    type="text"
                    className={`form-control`}
                    id="phone"
                    name="phone"
                    value={registerPhoneNumber}
                    placeholder="Phone number"
                    onChange={(e) => phoneHandle(e.target.value)}
                  />
                </label>
                <div className={`invalid-feedback text-start`}>{phoneNumberError}</div>
              </div>
            </div>

            <div className="email mb-3">
              <label>
                Email
                <input
                  type="email"
                  className={`form-control`}
                  id="email"
                  name="email"
                  value={registerEmail}
                  placeholder="Email"
                  onChange={(e) => emailHandle(e.target.value)}
                />
              </label>
              <div className={`invalid-feedback text-start`}>{emailError}</div>
            </div>

            <div className='passwordWrapper'>
              <div className="regPassword mb-3">
                <div className="input-group passReg1">
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
                  <button
                    type="button"
                    className=" btnShowHideRegister1"
                    onClick={() => setRegisterShowPassword(!registerShowPassword)}
                  >
                    <img src={visible} alt="toggle visibility" />
                  </button>
                  <div className={`invalid-feedback text-start`}></div>
                </div>
              </div>

              <div className="regRePassword mb-3">
                <div className="input-group passReg2">
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
                  <button
                    type="button"
                    className=" btnShowHideRegister2"
                    onClick={() => setRegisterShowPassword(!registerShowPassword)}
                  >
                    <img src={visible} alt="toggle visibility" />
                  </button>
                  <div className={`invalid-feedback text-start`}></div>
                </div>
              </div>
            </div>

            <div className="avatarWrapperReg mb-3">
              <label>
                Avatar
                <div className="avatar-selection" onClick={() => setShowAvatarModal(true)}>
                  {selectedAvatar ? (
                    <img src={`${baseUrlImage}${selectedAvatarImage?.imagePath}`} alt="Selected Avatar" />
                  ) : (
                    <p>Choose Avatar</p>
                  )}
                </div>
              </label>
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="text-center">
              <button
                type="submit"
                className="regBtn btn-primary w-100 theme-btn mx-auto"
              >
                <img src={signUp} alt="signUp" /> Sign Up
              </button>
            </div>

            {window.innerWidth < 1000 &&
              <div className='registerHeaderRightSide'>
                <p>Have an account?</p>
                <img src={circleLoginOrange} alt="login" />
                <p className='registerButton' onClick={() => setLogIn(true)}>Log In</p>
              </div>
            }
          </form>
        </div>
      </div>

      {showAvatarModal && (
        <div className="avatar-modal">
          <div className="avatar-modal-content">
            <h2>Select Avatar</h2>
            <div className="avatar-list">
              {avatars.map(avatar => (
                <div
                  key={avatar.id}
                  className="avatar-item"
                  onClick={() => handleAvatarSelect(avatar)}
                >
                  <img src={`${baseUrlImage}${avatar.imagePath}`} alt={avatar.name} />
                  <p>{avatar.name}</p>
                </div>
              ))}
            </div>
            <button onClick={() => setShowAvatarModal(false)}>Close</button>
          </div>
        </div>
      )}


    </>
  );
}

export default RegisterForm;
