import React from 'react';
import { useDispatch } from 'react-redux';
import "./deleteSessionConfirm.css";
import { deleteSession } from '../../actions/sessions';

function DeleteSessionConfirm(props) {
    const dispatch = useDispatch();

    function handleDeleteSession() {
        dispatch(deleteSession(props.sessionId))
        props.setIsShadowActive(false)
    }

  return (
    <>
        <div className={props.isShadowActive ? "delete-session-confirm active" : "delete-session-confirm"}>
            <p className='delete-session-confirm__title'>Czy na pewno chcesz usunąć tę sesję?</p>
            <div className='delete-session-confirm__main-buttons'>
                <button onClick={handleDeleteSession}>Tak</button>
                <button onClick={() => props.setIsShadowActive(false)}>Nie</button>
            </div>
        </div>
    </>
  )
}

export default DeleteSessionConfirm