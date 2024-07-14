import React from 'react'
import foxbg from '../../assets/images/customization/fox.png'
import './adminPanelHome.css'
import { useGlobalContext } from '../../context/context'
import AdminPanelListOfPosts from './Posts/AdminPanelListOfPosts'
import AdminPanelUsers from './Users/AdminPanelUsers'
import AdminPanelClothingPage from './Clothing/AdminPanelClothingPage'
import AdminPanelQuizzes from './Quizzes/AdminPanelQuizzes'
import PostAuthorList from './Author/CreateNewPostAuthor/PostAuthorList'
import AdminPanelDm from './DM/AdminPanelDm'
import AdminPanelMiniGames from './MiniGames/AdminPanelMiniGames'
import AdminPanelAvatar from './Avatar/AdminPanelAvatar'

function AdminPanelHome() {
  const { activeTab } = useGlobalContext()


  return (
    <main className='tabsWrapper'>
      {activeTab === 'Users' && <AdminPanelUsers />}
      {activeTab === 'Author' && <PostAuthorList />}
      {activeTab === 'Posts' && <AdminPanelListOfPosts />}
      {activeTab === 'Dm' && <AdminPanelDm />}
      {activeTab === 'Clothing' && <AdminPanelClothingPage />}
      {activeTab === 'Avatar' && <AdminPanelAvatar />}
      {activeTab === 'Quizzes' && <AdminPanelQuizzes />}
      {activeTab === 'Mini-Games' && <AdminPanelMiniGames />}
    </main>

  )
}

export default AdminPanelHome