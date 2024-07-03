import postimg from '../../assets/images/posts/postimg.png'
import postimg2 from '../../assets/images/posts/postImg2.png'
import authorImg from '../../assets/images/posts/authorimg.png'
import Posts from '../../components/HomePage/Posts'

import './homepage.css'
import HeaderResponsive from '../../components/HeaderResponsive/HeaderResponsive'
import { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/context'


const HomePage = () => {
  const { newMessage, setNewMessage, setUser, user } = useGlobalContext();
  const [newMessageSound, setNewMessageSound] = useState(false);


  const posts = [
    {
      title: 'Pre-teens now spending thousands on skincare to keep up with trends.',
      img: postimg,
      authorImg: authorImg,
      authorName: 'Sersha',
    },
    {
      title: 'Pre-teens now spending thousands on skincare to keep up with trends.',
      authorImg: authorImg,
      authorName: 'Sersha',
    },
    {
      title: 'Pre-teens now spending thousands on skincare to keep up with trends.',
      img: postimg2,
      authorImg: authorImg,
      authorName: 'Sersha',
    },
  ]

  useEffect(() => {
    const newMessageTimer = setTimeout(() => {
      setNewMessageSound(true);
      setNewMessage(1);
      localStorage.setItem('New Message', 1)
    }, 4000);

    return () => clearTimeout(newMessageTimer);
  }, []);



  return (
    <div className='homePageWrapper'>
      {window.innerWidth < 1000 && <HeaderResponsive />}
      <div className='homePageContainer'>
        <div className='posts'>
          <Posts posts={posts} />
        </div>
      </div>
      {newMessageSound == true && (
        <audio autoPlay>
          <source src="/music/SFX/DMs/esmmessagepingx2notificationsynthelectroniccartoon.mp3" type="audio/mpeg" />
        </audio>
      )}
      <audio loop autoPlay>
        <source src="/music/Music/SershaThemesongMediumoptimal310520241122.mp3" type="audio/mpeg" />
      </audio>
    </div>
  )
}

export default HomePage