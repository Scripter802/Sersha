import { useEffect, useState } from 'react';
import Header from '../../components/AdminPanel/AdminPanelHeader';
import Sidebar from '../../components/AdminPanel/AdminPanelSidebar';
import Home from '../../components/AdminPanel/AdminPanelHome';
import { useNavigate } from 'react-router-dom';

import './adminpanel.css';
import { useGlobalContext } from '../../context/context';
import axios from 'axios';

const AdminPanel = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { baseUrl, user, setUser } = useGlobalContext();
  const navigate = useNavigate();

  const OpenSidebar = () => {
    if (window.innerWidth < 768) {
      setOpenSidebarToggle(!openSidebarToggle);
    }
  };

  const userUpdate = async (parsedUser) => {
    try {
      const response = await axios.get(`${baseUrl}/User/${parsedUser.email}`);
      const fetchedUserType = response.data.type;

      const updatedUserData = {
        ...parsedUser,
        type: fetchedUserType,
        level: fetchedUser.level,
        coinBalance: fetchedUser.coinBalance
      };

      setUser(updatedUserData);

      localStorage.setItem('userData', JSON.stringify(updatedUserData));
      setIsLoading(false);
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');

    if (storedUser && storedUser !== 'undefined') {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      if (parsedUser?.email) {
        userUpdate(parsedUser);
      }
    } else {
      localStorage.removeItem("token");
    }
  }, []);

  useEffect(() => {
    if (!isLoading && user?.type !== "Admin") {
      navigate('/');
    }
  }, [isLoading, user]);

  return (
    <div className='adminBackground'>
      <div className={`grid-container`}>
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <Home />
      </div>
    </div>
  );
};

export default AdminPanel;
