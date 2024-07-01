import React from 'react';
import './userDetailsPopup.css';

const UserDetailsPopup = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="popupOverlay" onClick={onClose}>
      <div className="popupContent" onClick={(e) => e.stopPropagation()}>
        <button className="closeButton" onClick={onClose}>X</button>
        <div className="popupUserDetails">
          <img src={user.userImagePath} alt={`${user.fullName}`} className="userImage" />
          <h3>{user.fullName}</h3>
          <p><strong>Parents' Full Name:</strong> {user.parentsFullName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Parent's Phone Number:</strong> {user.parentPhoneNumber}</p>
          <p><strong>User Birth Date:</strong> {user.userBirthDate}</p>
          <p><strong>Current Level:</strong> {user.level}</p>
          <p><strong>Coin Balance:</strong> {user.coinBalance}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPopup;
