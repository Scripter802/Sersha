import React from 'react'
import foxbg from '../../assets/images/customization/fox.png'
import './home.css'
import { useGlobalContext } from '../../context/context'
import ListOfPosts from './Posts/ListOfPosts'
import Users from './Users/Users'
import ClothingPage from './Clothing/ClothingPage'

function Home() {
const { activeTab, createNewPost } = useGlobalContext()
  
  
  return (
        <main className='tabsWrapper'>
            {activeTab === 'Users' && <Users />}
            {activeTab === 'Posts' && <ListOfPosts />}
            {activeTab === 'Clothing' && <ClothingPage />}
        </main>
        
  )
}

export default Home