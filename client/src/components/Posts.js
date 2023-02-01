import React from 'react'
import Post from './Post';
import '../sass/css/posts.css';
import { useSelector } from 'react-redux';

function posts({setCurrentId}) {
  const posts = useSelector((state) => state.posts);

  return (
      !posts.length ? <div></div> : (
        <div className="posts">
            {posts.map((post) => (
              <>
                <div>
                  <Post post={post} setCurrentId={setCurrentId}/>
                </div>
              </>
            ))}
        </div>
      )
  )
}

export default posts