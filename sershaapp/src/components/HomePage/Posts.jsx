import { useEffect } from 'react';
import like from '../../assets/images/posts/like.png'
import { useGlobalContext } from '../../context/context';

const Posts = ({ posts }) => {
  const { postsPerStage, baseUrlImage, isAuthenticated, randomPosts, isPostLoading, setRandomPosts, getPostsPerStage } = useGlobalContext();

  useEffect(() => {
    if (isAuthenticated) {

      getPostsPerStage();
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
    const shuffled = posts.slice().sort(() => 0.5 - Math.random()); // Create a copy of posts array to avoid mutating the original array
    return shuffled.slice(0, count);
  };

  console.log(randomPosts)



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
              <p>{post.authorName}</p>
            </div>
            <div className='postBy' >
              <img src={like} alt="likebtn" />
            </div>
          </div>
        </div>

      ))}
      <audio loop autoPlay>
        <source src="public/music/Music/SershaThemesongMediumoptimal310520241122.mp3" type="audio/mpeg" />
      </audio>
    </>
  );
};

export default Posts