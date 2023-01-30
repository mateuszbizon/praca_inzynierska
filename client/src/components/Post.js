import React from 'react'
import '../sass/css/post.css';
import CardMedia from '@mui/material/CardMedia';
import logo from "../img/logo.png";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function post() {
  return (
    <>
        <div className="post">
            <div className="post__header">
                <div className="post__creator">mateuszbizon</div>
                <div className="post__date">1 dzień temu</div>
            </div>
            <CardMedia className='post__img' image={logo || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} />
            <div className="post__msg">
                <p>Nowy post nowy ja. Zapraszam do odwiedzenia mojej strony internetowej</p>
            </div>
            <div className="post__tags">
                <p>#nowy, #nowyja</p>
            </div>
            <div className="post__buttons">
                <div><ThumbUpOffAltIcon fontSize='large' className='post__icons'/></div>
                <div>
                    <button className='post__edit'>EDIT</button>
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