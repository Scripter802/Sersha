import './settingsPage.css';
import avatarImage from '../../assets/images/dms/userpick.png';
import homePageBackground from '../../assets/images/home/homePageBackground.png';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/context.jsx';
import exchange from '../../assets/images/settingsPage/exchange.png'
import axios from 'axios';
import HeaderResponsive from '../../components/HeaderResponsive/HeaderResponsive.jsx';
import visible from '../../assets/images/login/visible.png';

const SettingsPage = () => {
  const { user, setUser, baseUrlImage, baseUrl } = useGlobalContext();
  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarPopup, setShowAvatarPopup] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...user });
  const [avatars, setAvatars] = useState([]);
  const [userByEmail, setUserByEmail] = useState();
  const [isSettingsShowPassword, setIsSettingsShowPassword] = useState(false);

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const response = await axios.get(`${baseUrl}/avatar`);
        setAvatars(response.data);
      } catch (error) {
        console.log('Error fetching avatars:', error);
      }
    }
    // const fetchUserByEmail = async () => {
    //   try {
    //     const response = await axios.get(`${baseUrl}/user/${user.email}`);
    //     setUserByEmail(response.data)
    //     console.log(userByEmail)
    //   } catch (error) {
    //     console.log('Error fetching avatars:', error);
    //   }
    // };

    fetchAvatars();
    // fetchUserByEmail();

  }, [baseUrl]);

  // useEffect(() => {
  //   setUser({ ...user, parentPhoneNumber: userByEmail?.parentPhoneNumber, parentsFullName: userByEmail?.parentsFullName })

  // }, [userByEmail]);

  useEffect(() => {
    if (user) {
      setUpdatedUser({ ...user });
    }


  }, [user]);

  console.log(user, updatedUser)

  const handleInputChange = (e) => {
    console.log(e.target)
    const { name, value } = e.target;
    setUpdatedUser(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const toggleEditing = () => {
    if (isEditing) {
      setUser(updatedUser);
    }
    setIsEditing(!isEditing);
  };

  const handleAvatarClick = () => {
    setShowAvatarPopup(true);
  };

  const handleAvatarSelect = (newAvatar) => {
    setUpdatedUser(prevState => ({
      ...prevState,
      image: newAvatar,
      avatarImageId: newAvatar.id,
    }));
    setShowAvatarPopup(false);
  };

  const formatBirthdateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSave = async () => {
    localStorage.setItem('userData', JSON.stringify(updatedUser));
    let userChanges = {
      fullName: updatedUser.fullName,
      parentsFullName: updatedUser.parentsFullName,
      parentPhoneNumber: updatedUser.parentPhoneNumber,
      userBirthDate: updatedUser.birthdate,
      image: updatedUser?.image?.imagePath ? updatedUser?.image?.imagePath : updatedUser.image,
    };

    let updatingUser = { ...updatedUser, image: userChanges.image };

    try {
      const response = await axios.put(`${baseUrl}/User/${user.email}`, updatingUser);
      toggleEditing();
    } catch (error) {
      console.log(error);
    }
  };



  const birthdate = updatedUser?.userBirthDate ? formatBirthdateForInput(updatedUser.userBirthDate) : '';



  return (
    <div className="settingsPageWrapper" style={{ backgroundImage: `url(${homePageBackground})` }}>
      {window.innerWidth < 1000 && <HeaderResponsive />}
      <div className="settingsContainer">
        <h1>Profile Settings</h1>
        <div className="avatarContainer" onClick={handleAvatarClick}>
          <img src={updatedUser?.image?.imagePath ? `${baseUrlImage}${updatedUser?.image.imagePath}` : updatedUser?.image ? `${baseUrlImage}${updatedUser?.image}` : avatarImage} alt="avatar" className="avatarImage" />
          <div className='exchange-overlay'><img src={exchange} alt="exchange icon" /></div>
        </div>
        <div className="formContainer">
          <div className="formRow">
            <label>Full name</label>
            <input className='fullNameChange' type="text" name="fullName" value={updatedUser?.fullName} onChange={handleInputChange} disabled={!isEditing} style={{ color: isEditing && 'black' }} />
          </div>
          <div className="formGrid">
            <div className="formColumn a">
              <label>Parent's name</label>
              <input className='parentsFullNameChange' type="text" name="parentsFullName" value={updatedUser?.parentsFullName == null ? '' : updatedUser.parentsFullName} onChange={handleInputChange} disabled={!isEditing} style={{ color: isEditing && 'black' }} />
            </div>
            <div className="formColumn b">
              <label>Parent's phone number</label>
              <input className='parentPhoneNumberChange' type="text" name="parentPhoneNumber" value={updatedUser?.parentPhoneNumber == null ? '' : updatedUser.parentPhoneNumber} onChange={handleInputChange} disabled={!isEditing} style={{ color: isEditing && 'black' }} />
            </div>
            <div className="formColumn c">
              <label>Email</label>
              <input className='emailChange' type="email" name="email" value={updatedUser?.email == null ? '' : updatedUser.email} onChange={handleInputChange} disabled style={{ color: isEditing && 'black' }} />
            </div>
            <div className="formColumn d">
              <label>Birthdate</label>
              <input className='birthdateChange' type="date" name="userBirthDate" value={birthdate} onChange={handleInputChange} disabled={!isEditing} style={{ color: isEditing && 'black' }} />
            </div>

            <div className='passwordChangeWrapper e '>

              <div className="formColumn">
                <label>Old Password</label>
                <div className='passwordInputField'>
                  <input className='passwordChange' type={isSettingsShowPassword ? "text" : "password"} name="oldPassword" value={updatedUser?.oldPassword == null ? '' : updatedUser.oldPassword} onChange={handleInputChange} disabled={!isEditing} style={{ color: isEditing && 'black' }} />
                  <button
                    type="button"
                    className=" settingsBtnShowHide"
                    onClick={() => setIsSettingsShowPassword(!isSettingsShowPassword)}
                  >
                    {isSettingsShowPassword ? <img src={visible} /> : <img src={visible} />}
                  </button>

                </div>
              </div>
              <div className="formColumn">
                <label>New Password</label>
                <div className='passwordInputField'>
                  <input className='passwordChange' type={isSettingsShowPassword ? "text" : "password"} name="newPassword" value={updatedUser?.newPassword == null ? '' : updatedUser.newPassword} onChange={handleInputChange} disabled={!isEditing} style={{ color: isEditing && 'black' }} />
                  <button
                    type="button"
                    className=" settingsBtnShowHide"
                    onClick={() => setIsSettingsShowPassword(!isSettingsShowPassword)}
                  >
                    {isSettingsShowPassword ? <img src={visible} /> : <img src={visible} />}
                  </button>

                </div>
              </div>
            </div>
          </div>
          {!isEditing && <button onClick={toggleEditing}>Change profile info</button>}
          {isEditing && <button onClick={handleSave}>Save</button>}
        </div>
        <p className='contact'>Contact ruth@sersha.ai for any concerns or questions.</p>
      </div>
      {showAvatarPopup && (
        <div className="avatarPopup">
          <div className="popupContent">
            <h2>Select Avatar</h2>
            <div className="avatarOptions">
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
            <button onClick={() => setShowAvatarPopup(false)}>Close</button>
          </div>
        </div>
      )
      }
    </div >
  );
}

export default SettingsPage;
