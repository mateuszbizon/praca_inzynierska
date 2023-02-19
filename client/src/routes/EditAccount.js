import React, { useState, useRef } from 'react';
import '../sass/css/editAccount.css';
import MainData from '../components/MainData';
import Password from '../components/Password';

function EditAccount() {
    const [changeView, setChangeView] = useState("no-password");
    const markerRef = useRef();

    function indicator(e) {
        markerRef.current.style.left = `${e.offsetLeft}px`;
        markerRef.current.style.width = `${e.offsetWidth}px`;
    }

    function changeViewAndMarker(e, viewToChange) {
        setChangeView(viewToChange);
        indicator(e.target);
    }

  return (
    <section className='edit-account'>
        <div className="edit-account__container">
            <div className="edit-account__main-buttons">
                <button onClick={(e) => changeViewAndMarker(e, "no-password")}>Edytuj Profil</button>
                <button onClick={(e) => changeViewAndMarker(e, "password")}>Zmień hasło</button>
                <div className="edit-account__marker" ref={markerRef}></div>
            </div>
            {changeView === "no-password" && (
                <MainData />
            )}
            {changeView === "password" && (
                <Password />
            )}
        </div>
    </section>
  )
}

export default EditAccount