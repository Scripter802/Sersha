import postimg from '../assets/images/posts/postimg.png'
import postimg2 from '../assets/images/posts/postImg2.png'
import authorImg from '../assets/images/posts/authorimg.png'
import like from '../assets/images/posts/like.png'

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
      {posts.map((post) => (
      <div className='postWrapper'>
        <div><p className='postTitle'>{post.title}</p></div>
        <img src={post.img ? post.img : ''} alt={post.img ? 'post' : ''} className='postImg' />
        <div className='postLikeWrapper'>
          <div className='postBy'>
            <img src={post.authorImg} alt="postbyimg" />
            <p>{post.authorName}</p>
          </div>
          <div>
            <img src={like} alt="likebtn" />
          </div>
        </div>
      </div>

      ))}
    </div>
  )
}

export default HomePage