import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./tutorial.css";

function tutorial({tutorial, setShadowActive, setCurrentId}) {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"));

    function handleDeleteData() {
        setShadowActive(true)
        setCurrentId(tutorial._id)
    }

  return (
    <div className='tutorial'>
        <div className='tutorial__title' onClick={() => navigate(`/tutorials/${tutorial._id}`)}>
            {tutorial.title}
        </div>
        {user.result._id === tutorial.creator && (
            <div className='tutorial__btn'>
                <button className='tutorial__btn-delete' onClick={handleDeleteData}>
                    Usuń
                </button>
            </div>
        )}
    </div>
  )
}

export default tutorial