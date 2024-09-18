import postimg from '../../assets/images/posts/postimg.png'
import postimg2 from '../../assets/images/posts/postImg2.png'
import authorImg from '../../assets/images/posts/authorimg.png'
import Posts from '../../components/HomePage/Posts'

import './homepage.css'
import HeaderResponsive from '../../components/HeaderResponsive/HeaderResponsive'
import { useContext, useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/context'
import MusicContext from '../../context/MusicContext'
import Tutorial from '../../components/Tutorial/Tutorial'
import { useNavigate } from 'react-router-dom';
import Slideshow from '../../components/SlideShow/SlideShow'
import axios from 'axios'


const HomePage = () => {
  const { baseUrl, baseUrlImage, newMessage, setNewMessage, setUser, user, canPlayAnotherQuizToday, isTutorialActive, handleIsSlideshowShowed, fetchSlideshowByLevel, isSlideshowShowed, slideshowByLevel } = useGlobalContext();
  const { toggleMusic, currentPlaying, setCurrentPlaying, changeMusic, isPlaying } = useContext(MusicContext);
  const music = '/music/Music/SershaThemesongMediumoptimal310520241122.mp3'
  const navigate = useNavigate();
  const showedSlideLS = localStorage.getItem('showedSlideshow') === 'true';
  const [updatedUser, setUpdatedUser] = useState();



  useEffect(() => {
    if (currentPlaying !== music) {
      changeMusic('/music/Music/SershaThemesongMediumoptimal310520241122.mp3');
    }
  }, [changeMusic, music]);


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

  // useEffect(() => {
  //   if (canPlayAnotherQuizToday() && !newMessage) {
  //     const newMessageTimer = setTimeout(() => {
  //       setNewMessageSound(true);
  //       setNewMessage(1);
  //       localStorage.setItem('New Message', 1);
  //     }, 4000);
  //     return () => clearTimeout(newMessageTimer);
  //   }
  // }, [canPlayAnotherQuizToday, newMessage, setNewMessage]);

  const userUpdate = async () => {
    try {
      const response = await axios.get(`${baseUrl}/user/${user?.email}`);
      if (response.status === 200) {
        setUpdatedUser(response.data);
        setUser({ ...user, stage: updatedUser?.stage });
        localStorage.setItem('userData', JSON.stringify(user));
      }
    } catch (error) {
      console.error(error);
    }
  };



  // useEffect(() => {
  //   const updateUserFirstTimeLogin = async () => {
  //     if (user && user.isFirstTimeLoggedIn === true) {
  //       setUser(prevUser => ({ ...prevUser, isFirstTimeLoggedIn: false }));

  //       try {
  //         await axios.put(`${baseUrl}/User/${user.email}`, { ...user, isFirstTimeLoggedIn: false }, {
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         });
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   };

  //   updateUserFirstTimeLogin();
  // }, [user, setUser]);

  useEffect(() => {
    userUpdate()
    handleIsSlideshowShowed()
  }, [handleIsSlideshowShowed])

  useEffect(() => {
    if (!isSlideshowShowed && user?.stage > 0 && !showedSlideLS) {
      fetchSlideshowByLevel(user?.stage);
    }
  }, [isSlideshowShowed, user, showedSlideLS, fetchSlideshowByLevel]);

  useEffect(() => {
    if (slideshowByLevel?.length > 0) {
      localStorage.setItem('showedSlideshow', 'true');
    }
  }, [slideshowByLevel]);


  if (user?.stage > 0 && !showedSlideLS && slideshowByLevel?.length > 0) {
    return <div className='slideshowWrap'><Slideshow lvl={user?.stage} /></div>;
  }



  return (
    <div className='homePageWrapper'>
      {window.innerWidth < 1000 && <HeaderResponsive />}
      <div className='homePageContainer'>
        <div className='posts'>
          {window.innerWidth > 1000 && isTutorialActive &&
            <Tutorial />
          }
          <Posts posts={posts} />
          <div onClick={() => navigate('/minigames')}>
            <button className="play-button">Let's Play!</button>
          </div>
        </div>

      </div>

      {/* <audio loop autoPlay>
        <source src="/music/Music/SershaThemesongMediumoptimal310520241122.mp3" type="audio/mpeg" />
      </audio> */}
    </div>
  )
}

export default HomePage