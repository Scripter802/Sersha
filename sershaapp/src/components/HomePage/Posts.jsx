import like from '../../assets/images/posts/like.png'

const Posts = ({posts}) => {
  return (
    <>
    {posts.map((post, index) => (
        <div className='postWrapper' key={index}>
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
        </>
  )
}

export default Posts