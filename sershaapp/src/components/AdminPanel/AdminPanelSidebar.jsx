import React from 'react'
import friendorfoe from '../../assets/images/friendorfoe.svg'
import {
    BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
    BsListCheck, BsMenuButtonWideFill, BsFillGearFill
}
    from 'react-icons/bs'
import sershafox from '../../assets/images/quiz/sershafox.png'
import socialpost from '../../assets/images/socialpost.svg'
import author from '../../assets/images/adminPanel/author.png'
import newPost from '../../assets/images/newpost.svg'
import users from '../../assets/images/users.svg'
import correctIncorrectQuiz from '../../assets/images/adminPanel/correctIncorrectQuiz.png'
import fillInTheBlankIcon from '../../assets/images/adminPanel/fillInTheBlankIcon.png'
import groupingIcon from '../../assets/images/adminPanel/groupingIcon.png'
import miniGames from '../../assets/images/adminPanel/minigames.png'
import { useGlobalContext } from '../../context/context';

function AdminPanelSidebar({ openSidebarToggle, OpenSidebar }) {
    const { activeTab, setActiveTab, quizzesActiveTab, setQuizzesActiveTab, miniGamesActiveTab, setMiniGamesActiveTab, } = useGlobalContext();

    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand' >
                    <img src={sershafox} alt="sershafox" /> ADMIN PANEL
                </div>
                <span className='icon close_icon' onClick={OpenSidebar}>X</span>
            </div>

            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                    <div onClick={() => { setActiveTab('Dashboard'); OpenSidebar() }} style={{ backgroundColor: `${activeTab === "Dashboard" ? "#C26F4D" : ""}` }}>
                        <span>🏠</span> Dashboard
                    </div>

                </li>
                <li className='sidebar-list-item'>
                    <div onClick={() => { setActiveTab('Users'); OpenSidebar() }} style={{ backgroundColor: `${activeTab === "Users" ? "#C26F4D" : ""}` }}>
                        <img style={{ width: "20px" }} src={users} alt="" />Users
                    </div>
                </li>
                <li className='sidebar-list-item'>
                    <div onClick={() => { setActiveTab('Author'); OpenSidebar() }} style={{ backgroundColor: `${activeTab === "Author" ? "#C26F4D" : ""}` }}>
                        <img style={{ width: "20px" }} src={author} alt="author" /> Author
                    </div>
                </li>
                <li className='sidebar-list-item'>
                    <div onClick={() => { setActiveTab('Posts'); OpenSidebar() }} style={{ backgroundColor: `${activeTab === "Posts" ? "#C26F4D" : ""}` }}>
                        <img style={{ width: "20px" }} src={newPost} alt="post image" /> Posts
                    </div>
                </li>
                <li className='sidebar-list-item'>
                    <div onClick={() => { setActiveTab('Dm'); OpenSidebar() }} style={{ backgroundColor: `${activeTab === "Dm" ? "#C26F4D" : ""}` }}>
                        <span>💬</span> DMs
                    </div>
                </li>
                <li className='sidebar-list-item'>
                    <div onClick={() => { setActiveTab('Quizzes'); OpenSidebar() }} style={{ backgroundColor: `${activeTab === "Quizzes" ? "#C26F4D" : ""}` }}>
                        <span>❓</span>  Quizzes
                    </div>
                </li>

                <li className='sidebar-list-item'>
                    <div onClick={() => { setActiveTab('Mini-Games'); OpenSidebar() }} style={{ backgroundColor: `${activeTab === "Mini-Games" ? "#C26F4D" : ""}` }}>
                        <span><img style={{ height: "20px" }} className='fillInTheBlankIcon' src={miniGames} alt="fillInTheBlankIcon" /></span>  Mini-Games
                    </div>
                </li>


                <li className='sidebar-list-item'>
                    <div onClick={() => { setActiveTab('Slideshows'); OpenSidebar() }} style={{ backgroundColor: `${activeTab === "Slideshows" ? "#C26F4D" : ""}` }}>
                        <span>🎞</span>  Slideshows
                    </div>
                </li>
                <li className='sidebar-list-item'>
                    <div onClick={() => { setActiveTab('Clothing'); OpenSidebar() }} style={{ backgroundColor: `${activeTab === "Clothing" ? "#C26F4D" : ""}` }}>
                        <span>🦊</span>  Clothing
                    </div>
                </li>
            </ul>
        </aside>
    )
}

export default AdminPanelSidebar