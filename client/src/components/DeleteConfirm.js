import React from 'react';
import '../sass/css/deleteConfirm.css';
import { deletePost } from '../actions/posts';
import { useDispatch } from 'react-redux';

function DeleteConfirm({currentId, setCurrentId, post}) {
    const dispatch = useDispatch();

    function deleteCurrentPost(){
        dispatch(deletePost(post._id))
        setCurrentId(false);
    }

  return (
    <div className={currentId ? "delete-confirm active" : "delete-confirm"}>
        <p className="delete-confirm__title">Czy na pewno chcesz usunąć ten post?</p>
        <div className="delete-confirm__buttons">
            <button onClick={deleteCurrentPost}>Tak</button>
            <button onClick={() => setCurrentId(false)}>Nie</button>
        </div>
    </div>
  )
}

export default DeleteConfirm