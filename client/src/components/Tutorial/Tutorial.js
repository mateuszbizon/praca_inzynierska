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
        {user.result._id === tutorial.creator || user.result.isAdmin ? (
            <>
                <div className='tutorial__btn-box'>
                    <button className='tutorial__btn' onClick={() => navigate(`/edit-tutorial/${tutorial._id}`)}>
                        Edytuj
                    </button>
                </div>
                <div className='tutorial__btn-box'>
                    <button className='tutorial__btn' onClick={handleDeleteData}>
                        Usuń
                    </button>
                </div>
            </>
        ) : null}
    </div>
  )
}

export default tutorial