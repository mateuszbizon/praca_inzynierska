import React from 'react'
import Post from './Post';
import '../sass/css/posts.css';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';

function posts() {
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (!posts.length && !isLoading) return 'Brak postów';

  return (
      isLoading ? <CircularProgress /> : (
        <div className="posts">
            {posts.map((post) => (
              <>
                  <Post post={post} />
              </>
            ))}
        </div>
      )
  )
}

export default posts