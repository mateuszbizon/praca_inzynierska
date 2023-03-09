import React, { useState } from 'react'
import Post from './Post';
import '../sass/css/posts.css';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import DeleteConfirm from './DeleteConfirm';

function posts({currentId, setCurrentId}) {
  const { posts } = useSelector((state) => state.posts);
  const { isLoading } = useSelector(state => state.loaders)
  const [currentPostId, setCurrentPostId] = useState(null);

  if (!posts.length && !isLoading) return 'Brak postów';

  return (
    <>
      <DeleteConfirm currentId={currentId} setCurrentId={setCurrentId} currentPostId={currentPostId} setCurrentPostId={setCurrentPostId} />
      {isLoading ? <CircularProgress /> : (
        <div className="posts">
            {posts.map((post) => (
              <>
                  <Post post={post} setCurrentId={setCurrentId} setCurrentPostId={setCurrentPostId}/>
              </>
            ))}
        </div>
      )}
    </>
  )
}

export default posts