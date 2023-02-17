import React from 'react';

function Comments({ post }) {
  console.log(post)

  return (
    post.comments.map((c, i) => (
        <div className='post-details__comment' key={i}>
            <a href={`/profile/${c.commentCreator}`} className='post-details__link'><strong>{c.commentCreator}: </strong></a>
            {c.value}
        </div>
    ))
  )
}

export default Comments