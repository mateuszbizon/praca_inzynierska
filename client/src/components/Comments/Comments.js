import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./comments.css"

function Comments({ post }) {
  const navigate = useNavigate();

  return (
    post.comments?.map((c, i) => (
        <div className='comments__comment' key={i}>
            <strong className='comments__link' onClick={() => navigate(`/profile/${c.commentCreator}`)}>{c.commentCreator}: </strong>
            <span className='comments__comment-text'>{c.value}</span>
        </div>
    ))
  )
}

export default Comments