import { useState } from 'react'
import Header from '../../components/AdminPanel/Header'
import Sidebar from '../../components/AdminPanel/Sidebar'
import Home from '../../components/AdminPanel/Home'

import './adminpanel.css'


const AdminPanel = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <Home />
    </div>
  )
}

export default AdminPanel