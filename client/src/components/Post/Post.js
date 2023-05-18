import React from 'react'
import './post.css';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from 'react-router-dom';

function post({post, setCurrentId, setCurrentPostId}) {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    function handleDeleteData(){
        setCurrentId(true);
        setCurrentPostId(post._id);
    }

  return (
    <>
        <div className="post">
            <img src={post.selectedFile} alt="" className='post__img' onClick={() => navigate(`/posts/${post._id}`)}/>
            {(user.result._id === post.creator) && (
                <div className='post__button-box' >
                    <DeleteOutlineIcon fontSize='medium' className='post__icon' onClick={handleDeleteData} />
                    <p className='post__text'> Usuń</p>
                </div>
            )}
        </div>
    </>
  )
}

export default post