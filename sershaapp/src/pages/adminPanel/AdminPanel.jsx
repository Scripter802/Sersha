import { useState } from 'react'
import Header from '../../components/AdminPanel/AdminPanelHeader'
import Sidebar from '../../components/AdminPanel/AdminPanelSidebar'
import Home from '../../components/AdminPanel/AdminPanelHome'

import './adminpanel.css'
import { useGlobalContext } from '../../context/context'


const AdminPanel = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const { activeTab } = useGlobalContext();


  const OpenSidebar = () => {
    if (window.innerWidth < 768) {
      setOpenSidebarToggle(!openSidebarToggle)
    }
  }

  return (
    <div className='adminBackground'>
      <div className={`${activeTab == 'Quizzes' || activeTab == 'Mini-Games' || activeTab == 'Clothing' ? 'grid-container-quizzes' : 'grid-container'}`}>
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <Home />
      </div>
    </div>
  )
}

export default AdminPanel