import React, {useEffect, useState} from 'react'
import Post from './Post';
import '../sass/css/posts.css';
import postsService from '../services/posts-service';

function posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postsService.getPosts().then(response => {
      setPosts(response);
    });
  }, []);

  return (
      !posts.length ? <div></div> : (
        <div className="posts">
            {posts.map((post) => (
              <>
                <div key={post._id}>
                  <Post post={post}/>
                </div>
              </>
            ))}
        </div>
      )
  )
}

export default posts