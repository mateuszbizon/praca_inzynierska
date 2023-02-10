import React from 'react'
import '../sass/css/post.css';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch } from 'react-redux';
import { deletePost, clearData} from '../actions/posts';
import { useNavigate } from 'react-router-dom';

function post({post}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    function goToPostDetails(){
        dispatch(clearData());
        navigate(`/posts/${post._id}`)
    }

  return (
    <>
        <div className="post">
            <img src={post.selectedFile} alt="" className='post__img' onClick={goToPostDetails} />
            {(user.result._id === post.creator) && (
                <div className='post__button-box' >
                    <DeleteOutlineIcon fontSize='medium' className='post__icon' onClick={() => dispatch(deletePost(post._id))} />
                    <p className='post__text'> Usuń</p>
                </div>
            )}
        </div>
    </>
  )
}

export default post