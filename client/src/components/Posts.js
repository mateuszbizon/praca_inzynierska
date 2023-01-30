import React from 'react'
import Post from './Post';
import '../sass/css/posts.css';

function posts() {
  return (
    <>
        <div className="posts">
            <Post />
            <Post />
            <Post />
        </div>
    </>
  )
}

export default posts