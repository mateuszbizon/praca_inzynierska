import React, { useState } from 'react';
import '../sass/css/editAccount.css';
import MainData from '../components/MainData';
import Password from '../components/Password';

function EditAccount() {
    const [changeView, setChangeView] = useState("no-password");
  return (
    <section className='edit-account'>
        <div className="edit-account__container">
            <div className="edit-account__main-buttons">
                <button onClick={() => setChangeView("no-password")}>Edytuj Profil</button>
                <button onClick={() => setChangeView("password")}>Zmień hasło</button>
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