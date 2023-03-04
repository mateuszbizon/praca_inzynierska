import React, { useState} from 'react';
import '../sass/css/confirmTimeAction.css';
import { useDispatch } from 'react-redux';
import { deleteTime, setDnf } from '../actions/times';

function ConfirmTimeAction({ currentTimeId, setCurrentTimeId, isShadowActive, setIsShadowActive }) {
    const [changeView, setChangeView] = useState("delete-time");
    const dispatch = useDispatch();

    function handleNoAnswer() {
        setCurrentTimeId(null);
        setIsShadowActive(false);
    }

    function handleDeleteYesAnswer() {
        dispatch(deleteTime(currentTimeId));
        setIsShadowActive(false);
    }

    function handleSetDnfYesAnswer() {
        dispatch(setDnf(currentTimeId));
        setIsShadowActive(false);
    }

    function handleChangeView(view) {
        setChangeView(view)
    }

    return (
        <div className={!isShadowActive ? "confirm-time-action" : "confirm-time-action active"}>
            <p className="confirm-time-action__title">Czas nr. {currentTimeId}</p>
            <div className="confirm-time-action__main-buttons">
                <button onClick={() => handleChangeView("delete-time")}>Usuń czas</button>
                <button onClick={() => handleChangeView("set-dnf")}>Ustaw DNF</button>
            </div>
            {changeView === "delete-time" && (
                <>
                    <p className="confirm-time-action__second-title">Czy na pewno chcesz usunąć ten czas?</p>
                    <div className="confirm-time-action__buttons">
                        <button onClick={handleDeleteYesAnswer}>Tak</button>
                        <button onClick={handleNoAnswer}>Nie</button>
                    </div>
                </>
            )}
            {changeView === "set-dnf" && (
                <>
                    <p className="confirm-time-action__second-title">Czy na pewno chcesz ustawić DNF na ten czas?</p>
                    <div className="confirm-time-action__buttons">
                        <button onClick={handleSetDnfYesAnswer}>Tak</button>
                        <button onClick={handleNoAnswer}>Nie</button>
                    </div>
                </>
            )}
        </div>
      )
}

export default ConfirmTimeAction