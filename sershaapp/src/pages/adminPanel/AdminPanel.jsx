import { useState } from 'react'
import Header from '../../components/AdminPanel/AdminPanelHeader'
import Sidebar from '../../components/AdminPanel/AdminPanelSidebar'
import Home from '../../components/AdminPanel/AdminPanelHome'
import { useNavigate } from 'react-router-dom'

import './adminpanel.css'
import { useGlobalContext } from '../../context/context'


const AdminPanel = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const { activeTab, user } = useGlobalContext();
  const navigate = useNavigate();


  const OpenSidebar = () => {
    if (window.innerWidth < 768) {
      setOpenSidebarToggle(!openSidebarToggle)
    }
  }

  if (user?.type !== "Admin") (
    navigate('/')
  );

  return (
    <div className='adminBackground'>
      <div className={`grid-container`}>
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <Home />
      </div>
    </div>
  )
}

export default AdminPanel