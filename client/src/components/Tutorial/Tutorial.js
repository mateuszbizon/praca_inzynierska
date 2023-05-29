import React from 'react';
import "./tutorial.css";

function Tutorial({tutorial, setShadowActive, setCurrentId}) {
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
            <button className='tutorial__btn'>
                Usuń
            </button>
        </div>
    </div>
  )
}

export default Tutorial