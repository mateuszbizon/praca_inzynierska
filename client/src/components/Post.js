import React from 'react'
import '../sass/css/post.css';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DeleteConfirm from './DeleteConfirm';

function post({post, currentId, setCurrentId}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

  return (
    <>
        <DeleteConfirm currentId={currentId} setCurrentId={setCurrentId} post={post}/>
        <div className="post">
            <a href={`/posts/${post._id}`}><img src={post.selectedFile} alt="" className='post__img'/></a>
            {(user.result._id === post.creator) && (
                <div className='post__button-box' >
                    <DeleteOutlineIcon fontSize='medium' className='post__icon' onClick={() => setCurrentId(true)} />
                    <p className='post__text'> Usuń</p>
                </div>
            )}
        </div>
    </>
  )
}

export default post