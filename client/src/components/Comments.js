import React from 'react';
import { useNavigate } from 'react-router-dom';

function Comments({ post }) {
  const navigate = useNavigate();

  return (
    post.comments?.map((c, i) => (
        <div className='post-details__comment' key={i}>
            <strong className='post-details__link' onClick={() => navigate(`/profile/${c.commentCreator}`)}>{c.commentCreator}: </strong>
            <span className='post-details__comment-text'>{c.value}</span>
        </div>
    ))
  )
}

export default Comments