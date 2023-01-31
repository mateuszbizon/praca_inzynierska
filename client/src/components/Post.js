import React from 'react'
import '../sass/css/post.css';
import CardMedia from '@mui/material/CardMedia';
import moment from 'moment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function post({post}) {
  return (
    <>
        <div className="post">
            <div className="post__header">
                <div className="post__creator">{post.creator}</div>
                <div className="post__date">{moment(post.createdAt).fromNow()}</div>
            </div>
            <CardMedia className='post__img' image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} />
            <div className="post__msg">
                <p>{post.message}</p>
            </div>
            <div className="post__tags">
                <p>{post.tags.map((tag) => `${tag} `)}</p>
            </div>
            <div className="post__buttons">
                <div><ThumbUpOffAltIcon fontSize='large' className='post__icons'/></div>
                <div>
                    <EditIcon fontSize='large' className='post__icons' />
                </div>
                <div>
                    <DeleteOutlineIcon fontSize='large' className='post__icons'/>
                </div>
            </div>
        </div>
    </>
  )
}

export default post