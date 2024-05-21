import { useEffect } from 'react';
import like from '../../assets/images/posts/like.png'
import { useGlobalContext } from '../../context/context';

const Posts = ({ posts }) => {
  const { postsPerStage, randomPosts, setRandomPosts, getPostsPerStage } = useGlobalContext();

  useEffect(() => {
    getPostsPerStage();

    const selectedPosts = getRandomPosts(postsPerStage, 5);
    setRandomPosts(selectedPosts);
  }, []);

  const getRandomPosts = (posts, count) => {
    const shuffled = posts.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count)
  }

  console.log(randomPosts)

  return (
    <>
      {randomPosts.map((post, index) => (
        <div className='postWrapper' key={index}>
          {console.log(post)}
          <div><p className='postTitle'>{post.title}</p></div>
          <img src={post.img || ''} alt={post.img ? 'post' : ''} className='postImg' />
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
  );
};

export default Posts