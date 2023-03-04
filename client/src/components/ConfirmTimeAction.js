import React, { useState} from 'react';
import '../sass/css/confirmTimeAction.css';
import { useDispatch } from 'react-redux';
import { deleteTime, setDnf } from '../actions/times';

function ConfirmTimeAction({ currentTimeId, currentTime, isShadowActive, setIsShadowActive }) {
    const dispatch = useDispatch();

    function handleCloseModal() {
        setIsShadowActive(false);
    }

    function handleDelete() {
        dispatch(deleteTime(currentTimeId));
        setIsShadowActive(false);
    }

    function handleSetDnf() {
        dispatch(setDnf(currentTimeId));
        setIsShadowActive(false);
    }

    return (
        <div className={!isShadowActive ? "confirm-time-action" : "confirm-time-action active"}>
            <p className="confirm-time-action__title">Czas nr. {currentTimeId}</p>
            <p className="confirm-time-action__time">{currentTime}</p>
            <div className="confirm-time-action__main-buttons">
                <button onClick={handleDelete}>X</button>
                <button onClick={handleSetDnf}>DNF</button>
                <button>+2</button>
                <button>Czas OK</button>
            </div>
            <div className="confirm-time-action__ok-btn-box">
                <button onClick={handleCloseModal}>OK</button>
            </div>
        </div>
      )
}

export default ConfirmTimeAction