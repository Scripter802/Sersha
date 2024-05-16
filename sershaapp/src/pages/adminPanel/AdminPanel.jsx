import { useState } from 'react'
import Header from '../../components/AdminPanel/AdminPanelHeader'
import Sidebar from '../../components/AdminPanel/AdminPanelSidebar'
import Home from '../../components/AdminPanel/AdminPanelHome'

import './adminpanel.css'
import { useGlobalContext } from '../../context/context'


const AdminPanel = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const { fillInTheBlankCreateNew } = useGlobalContext();


  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='adminBackground'>
      <div className={fillInTheBlankCreateNew ? 'grid-fillInTheBlank' : `grid-container`}>
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <Home />
      </div>
    </div>
  )
}

export default AdminPanel