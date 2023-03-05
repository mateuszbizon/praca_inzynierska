import React, { useState} from 'react';
import '../sass/css/confirmTimeAction.css';
import { useDispatch } from 'react-redux';
import { deleteTime, setDnf, setTimeOk } from '../actions/times';

function ConfirmTimeAction({ currentTimeId, currentTime, isShadowActive, setIsShadowActive }) {
    const [showDeleteTime, setShowDeleteTime] = useState(false);
    const dispatch = useDispatch();

    function handleCloseModal() {
        setIsShadowActive(false);
    }

    function handleDelete() {
        dispatch(deleteTime(currentTimeId));
        setIsShadowActive(false);
        setShowDeleteTime(false)
    }

    function handleSetDnf() {
        dispatch(setDnf(currentTimeId));
        setIsShadowActive(false);
    }

    function handleTimeOk() {
        dispatch(setTimeOk(currentTimeId))
        setIsShadowActive(false);
    }

    return (
        <div className={!isShadowActive ? "confirm-time-action" : "confirm-time-action active"}>
            <p className="confirm-time-action__title">Czas nr. {currentTimeId}</p>
            <p className="confirm-time-action__time">{currentTime}</p>
            <div className="confirm-time-action__main-buttons">
                <button onClick={() => setShowDeleteTime(true)}>X</button>
                <button onClick={handleSetDnf}>DNF</button>
                <button>+2</button>
                <button onClick={handleTimeOk}>Czas OK</button>
            </div>
            {showDeleteTime && (
                <>
                    <p className="confirm-time-action__delete-title">Czy na pewno chcesz usunąć czas?</p>
                    <div className="confirm-time-action__delete-buttons">
                        <button onClick={handleDelete}>Tak</button>
                        <button onClick={() => setShowDeleteTime(false)}>Nie</button>
                    </div>
                </>
            )}
            <div className="confirm-time-action__ok-btn-box">
                <button onClick={handleCloseModal}>Zamknij</button>
            </div>
        </div>
      )
}

export default ConfirmTimeAction