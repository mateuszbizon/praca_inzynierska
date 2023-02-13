import React from 'react';

function Comments({ post }) {

  return (
    post.comments.map((c, i) => (
        <div className='post-details__comment' key={i}>
            <a href={`/profile/${c.split(':')[0]}`} className='post-details__link'><strong>{c.split(':')[0]}:</strong></a>
            {c.split(':')[1]}
        </div>
    ))
  )
}

export default Comments