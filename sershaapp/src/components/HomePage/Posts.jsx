import { useEffect } from 'react';
import like from '../../assets/images/posts/like.png'
import liked from '../../assets/images/posts/liked.png'
import { useGlobalContext } from '../../context/context';

const Posts = ({ posts }) => {
  const { postsPerStage, baseUrlImage, isAuthenticated, randomPosts, isPostLoading, setRandomPosts, getPostsPerStage, user } = useGlobalContext();

  useEffect(() => {
    if (isAuthenticated) {

      user?.level <= 13 ? getPostsPerStage('Easy') : user?.level > 13 && user?.level <= 26 ? getPostsPerStage('Medium') : getPostsPerStage('Hard');
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (postsPerStage && postsPerStage.length > 0) {
      const selectedPosts = getRandomPosts(postsPerStage, 5);
      console.log('Selected Posts:', selectedPosts);
      setRandomPosts(selectedPosts);
    }
  }, [postsPerStage]);

  const getRandomPosts = (posts, count) => {
    const shuffled = posts.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  console.log(randomPosts)

  const handleLike = (post, index) => {
    post.liked = true;
    post.likeNum = Math.floor(Math.random() * 100);
    let updatedPosts = [...randomPosts]
    updatedPosts[index] = post
    setRandomPosts(updatedPosts);
    console.log(randomPosts)
  }


  return (
    <>
      {randomPosts.map((post, index) => (
        <div className='postWrapper' key={index}>
          {console.log(`post${post}`)}
          <div><p className='postTitle'>{post.title}</p></div>
          {post?.imagePath != null && <img src={`${baseUrlImage}${post?.imagePath}` || ''} alt={post.img ? 'post' : ''} className='postImg' />
          }
          <div className='postLikeWrapper'>
            <div className='postBy'>
              <img src={`${baseUrlImage}${post.author.authorImagePath}`} alt="postbyimg" />
              <p>{post.author.authorName}</p>
            </div>
            <div className='postBy likeBtn' onClick={() => handleLike(post, index)}>
              {post?.liked ? <div className='likedbtn'><img src={liked} alt="liked" />{post.likeNum}</div> : <img src={like} alt="likebtn" />}
            </div>
          </div>
        </div>

      ))}
    </>
  );
};

export default Posts