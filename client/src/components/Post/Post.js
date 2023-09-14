import React from 'react'
import './post.css';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from 'react-router-dom';

function post({post, setShadowActive, setCurrentId}) {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    function handleDeleteData(){
        setShadowActive(true);
        setCurrentId(post._id);
    }

  return (
    <>
        <div className="post">
            <img src={post.selectedFile} alt="" className='post__img' onClick={() => navigate(`/posts/${post._id}`)}/>
            {user.result._id === post.creator || user.result.isAdmin ? (
                <div className='post__button-box' >
                    <DeleteOutlineIcon fontSize='medium' className='post__icon' onClick={handleDeleteData} />
                    <p className='post__text'> Usuń</p>
                </div>
            ) : null}
        </div>
    </>
  )
}

export default post