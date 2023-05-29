import React from 'react';
import "./tutorial.css";

function tutorial({tutorial, setShadowActive, setCurrentId}) {
    function handleDeleteData() {
        setShadowActive(true)
        setCurrentId(tutorial._id)
    }

  return (
    <div className='tutorial'>
        <div className='tutorial__title'>
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