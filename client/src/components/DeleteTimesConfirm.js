import React from 'react';
import '../sass/css/deleteTimesConfirm.css';
import { useDispatch } from 'react-redux';
import { deleteTime } from '../actions/times';

function DeleteTimesConfirm({ currentTimeId, setCurrentTimeId, isShadowActive, setIsShadowActive }) {
    const dispatch = useDispatch();

    function handleNoAnswer() {
        setCurrentTimeId(null);
        setIsShadowActive(false);
    }

    function handleYesAnswer() {
        dispatch(deleteTime(currentTimeId));
        setIsShadowActive(false);
    }

    return (
        <div className={!isShadowActive ? "delete-times-confirm" : "delete-times-confirm active"}>
            <p className="delete-confirm__title">Czy na pewno chcesz usunąć czas nr. {currentTimeId}?</p>
            <div className="delete-confirm__buttons">
                <button onClick={handleYesAnswer}>Tak</button>
                <button onClick={handleNoAnswer}>Nie</button>
            </div>
        </div>
      )
}

export default DeleteTimesConfirm