import React from 'react'
import '../sass/css/post.css';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function post({post, setCurrentId, setCurrentPostId}) {
    const user = JSON.parse(localStorage.getItem('user'));

    function handleDeleteData(){
        setCurrentId(true);
        setCurrentPostId(post._id);
    }

  return (
    <>
        <div className="post">
            <a href={`/posts/${post._id}`}><img src={post.selectedFile} alt="" className='post__img'/></a>
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