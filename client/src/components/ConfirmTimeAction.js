import React, { useState, useRef } from 'react';
import '../sass/css/confirmTimeAction.css';
import { useDispatch } from 'react-redux';
import { deleteTime, setDnf, setTimeOk, setPlusTwo, deleteAllTimes } from '../actions/times';

function ConfirmTimeAction({ currentTimeId, currentTime, isShadowActive, setIsShadowActive, timeAction }) {
    const [showDeleteTime, setShowDeleteTime] = useState(false);
    const [nameSession, setNameSession] = useState('');
    const nameSessionError = useRef();
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
        dispatch(setTimeOk(currentTimeId));
        setIsShadowActive(false);
    }

    function handlePlusTwoTime() {
        dispatch(setPlusTwo(currentTimeId));
        setIsShadowActive(false);
    }

    function handleDeleteAllTimes() {
        dispatch(deleteAllTimes());
        setIsShadowActive(false);
    }

    function checkNameSession() {
        if(nameSession === "") {
            nameSessionError.current.textContent = "Nazwa nie może być pusta";
            nameSessionError.current.style.visibility = "visible";
            return false;
        }

        if(nameSession.length > 15) {
            nameSessionError.current.textContent = "Nazwa nie może mieć więcej niż 15 znaków";
            nameSessionError.current.style.visibility = "visible";
            return false;
        }

        nameSessionError.current.style.visibility = "hidden";
        return true;
    }

    function handleSubmit(e) {
        e.preventDefault();

        if(!checkNameSession()) {
            return false;
        }

        return true;
    }

    return (
        <div className={!isShadowActive ? "confirm-time-action" : "confirm-time-action active"}>
            {timeAction === "delete-all-times" && (
                <>
                    <p className="confirm-time-action__title">Czy na pewno chcesz usunąć wszystkie czasy?</p>
                    <div className="confirm-time-action__delete-buttons">
                        <button onClick={handleDeleteAllTimes}>Tak</button>
                        <button onClick={handleCloseModal}>Nie</button>
                    </div>
                </>
            )}
            {timeAction === "choose-time-action" && (
                <>
                    <p className="confirm-time-action__title">Czas nr. {currentTimeId}</p>
                    <p className="confirm-time-action__time">{currentTime}</p>
                    <div className="confirm-time-action__main-buttons">
                        <button onClick={() => setShowDeleteTime(true)}>Usuń</button>
                        <button onClick={handleSetDnf}>DNF</button>
                        <button onClick={handlePlusTwoTime}>+2</button>
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
                </>
            )}
            {timeAction === "save-session" && (
                <>
                    <div className="confirm-time-action__form-heading">Zapisz czasy</div>  
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="confirm-time-action__form-box">
                            <input id='session-name' type="text" onChange={(e) => setNameSession(e.target.value)} required/>
                            <label htmlFor="session-name">Nazwa sesji</label>
                            <p className="confirm-time-action__text-error" ref={nameSessionError} >error</p>
                        </div>  
                        <div className="confirm-time-action__btn-box">
                            <button type="submit">Zapisz</button>               
                        </div> 
                    </form>                
                </>
            )}
        </div>
      )
}

export default ConfirmTimeAction