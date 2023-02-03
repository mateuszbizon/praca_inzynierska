import React from 'react'
import '../sass/css/post.css';
import CardMedia from '@mui/material/CardMedia';
import moment from 'moment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch } from 'react-redux';
import { likePost, deletePost} from '../actions/posts';

function post({post, setCurrentId}) {
    const dispatch = useDispatch();

  return (
    <>
        <div className="post">
            <div className="post__header">
                <div className="post__creator">{post.creator}</div>
                <div className="post__date">{moment(post.createdAt).fromNow()}</div>
            </div>
            <CardMedia className='post__img' image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} />
            <div className="post__buttons">
                <div className='post__button-box' onClick={() => dispatch(likePost(post._id))} >
                    <ThumbUpOffAltIcon fontSize='medium' className='post__icons' />
                    <p className='post__text'>Polub</p>
                </div>
                <div className='post__button-box' onClick={() => setCurrentId(post._id)} >
                    <EditIcon fontSize='medium' className='post__icons' />
                    <p className='post__text'> Edytuj</p>
                </div>
                <div className='post__button-box' onClick={() => dispatch(deletePost(post._id))} >
                    <DeleteOutlineIcon fontSize='medium' className='post__icons' />
                    <p className='post__text'> Usuń</p>
                </div>
            </div>
            <div className="post__likes-count">Polubień: {post.likes.length}</div>
            <div className="post__msg">
                <p>{post.message}</p>
            </div>
            <div className="post__tags">
                <p>{post.tags.map((tag) => `#${tag} `)}</p>
            </div>
        </div>
    </>
  )
}

export default post