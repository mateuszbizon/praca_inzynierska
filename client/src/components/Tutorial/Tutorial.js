import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./tutorial.css";

function tutorial({tutorial, setShadowActive, setCurrentId}) {
    const navigate = useNavigate()

    function handleDeleteData() {
        setShadowActive(true)
        setCurrentId(tutorial._id)
    }

  return (
    <div className='tutorial'>
        <div className='tutorial__title' onClick={() => navigate(`/tutorials/${tutorial._id}`)}>
            {tutorial.title}
        </div>
        <div className='tutorial__btns'>
            <button className='tutorial__btn'>
                Edytuj
            </button>
        </div>
        <div className='tutorial__btns'>
            <button className='tutorial__btn' onClick={handleDeleteData}>
                Usuń
            </button>
        </div>
    </div>
  )
}

export default tutorial