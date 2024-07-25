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
import { useNavigate } from 'react-router-dom'

function AdminPanelSidebar({ openSidebarToggle, OpenSidebar }) {
    const { activeTab, setActiveTab, quizzesActiveTab, setQuizzesActiveTab, miniGamesActiveTab, setMiniGamesActiveTab, } = useGlobalContext();
    const navigate = useNavigate();

    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand' onClick={() => navigate('/')}>
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
                {/* <li className='sidebar-list-item'>
                    <div onClick={() => { setActiveTab('Dm'); OpenSidebar() }} style={{ backgroundColor: `${activeTab === "Dm" ? "#C26F4D" : ""}` }}>
                        <span>💬</span> DMs
                    </div>
                </li> */}
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


                {activeTab === 'Mini-Games' && (
                    <div className='adminMiniGamesSubMenu'>
                        <li className='sidebar-list-item'>
                            <div onClick={() => { setMiniGamesActiveTab('Snap Judgment'); OpenSidebar() }} style={{ backgroundColor: `${miniGamesActiveTab === "Snap Judgment" ? "#C26F4D" : ""}` }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="finger"><path fill="#f7caa5" d="M377.63,180.99h41.09a23.345,23.345,0,0,1,23.34,23.3c.1,50.11.02,52.19-.07,133.88-.04,45.68-34.35,83.75-78.46,89.76v.04H232.26v-.04a90.73,90.73,0,0,1-66.83-45.75L69.89,210.65l9.98-7.66a49.764,49.764,0,0,1,69.74,5.03l26.73,30.66.15-195.67A32.926,32.926,0,0,1,209.41,10.1h.01a32.924,32.924,0,0,1,32.93,32.98c-.04,21.84-.11,51.6-.17,80.83h44.36a23.349,23.349,0,0,1,23.34,23.35v5.89h44.41a23.349,23.349,0,0,1,23.34,23.35Z"></path><polygon fill="#00acea" points="414.74 427.97 414.74 501.9 185.97 501.9 185.97 427.97 232.26 427.97 363.53 427.97 414.74 427.97"></polygon><path fill="#edb288" d="M226.83,35.12V70.13a52.167,52.167,0,0,1-35.04,0V35.12Z"></path></svg> Snap Judgment
                            </div>
                        </li>
                        <li className='sidebar-list-item'>
                            <div onClick={() => { setMiniGamesActiveTab('Emoji Emotions'); OpenSidebar() }} style={{ backgroundColor: `${miniGamesActiveTab === "Emoji Emotions" ? "#C26F4D" : ""}` }}>
                                <span>😀</span>  Emoji Emotions
                            </div>
                        </li>
                        <li className='sidebar-list-item'>
                            <div onClick={() => { setMiniGamesActiveTab('Posting Challenge'); OpenSidebar() }} style={{ backgroundColor: `${miniGamesActiveTab === "Posting Challenge" ? "#C26F4D" : ""}` }}>
                                <span>📷</span>  Posting Challenge
                            </div>
                        </li>
                        <li className='sidebar-list-item'>
                            <div onClick={() => { setMiniGamesActiveTab('Friend Or Foe'); OpenSidebar() }} style={{ backgroundColor: `${miniGamesActiveTab === "Friend Or Foe" ? "#C26F4D" : ""}` }}>
                                <img style={{ height: "20px" }} src={friendorfoe} alt="Friend or Foe" /> Friend Or Foe
                            </div>
                        </li>
                    </div>
                )
                }


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
                <li className='sidebar-list-item'>
                    <div onClick={() => { setActiveTab('Avatar'); OpenSidebar() }} style={{ backgroundColor: `${activeTab === "Avatar" ? "#C26F4D" : ""}` }}>
                        <span>🦊</span>  Avatar
                    </div>
                </li>
            </ul>
        </aside>
    )
}

export default AdminPanelSidebar