import React from 'react'
import '../sass/css/post.css';
import CardMedia from '@mui/material/CardMedia';
import moment from 'moment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import postsService from '../services/posts-service';

function post({post, setCurrentId, isLiked, setIsLiked}) {

    function deletePost(){
        postsService.deletePost(post._id).then(response => {
            window.location.reload();
        })
    }

    function likePost(){
        postsService.likePost(post._id).then(response => {
            setIsLiked(!isLiked);
        })
    }

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
                <p>{post.tags.map((tag) => `#${tag} `)}</p>
            </div>
            <div className="post__buttons">
                <div className='post__button-box'>
                    <ThumbUpOffAltIcon fontSize='medium' className='post__icons' onClick={likePost} />
                    <p className='post__text'> Polubień {post.likeCount}</p>
                </div>
                <div className='post__button-box'>
                    <EditIcon fontSize='medium' className='post__icons' onClick={() => setCurrentId(post._id)}/>
                    <p className='post__text'> Edytuj</p>
                </div>
                <div className='post__button-box'>
                    <DeleteOutlineIcon fontSize='medium' className='post__icons' onClick={deletePost}/>
                    <p className='post__text'> Usuń</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default post