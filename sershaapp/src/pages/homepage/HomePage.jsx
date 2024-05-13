import postimg from '../../assets/images/posts/postimg.png'
import postimg2 from '../../assets/images/posts/postImg2.png'
import authorImg from '../../assets/images/posts/authorimg.png'
import Posts from '../../components/HomePage/Posts'

import './homepage.css'


const HomePage = () => {
  
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

  return (
    <div className='posts'>
      <Posts posts={posts} />
    </div>
  )
}

export default HomePage