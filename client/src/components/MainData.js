import React, { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import userImg from '../img/user.png';
import { useDispatch, useSelector } from "react-redux";
import { editAccount } from '../actions/auth';

function MainData() {
    const [form, setForm] = useState({ name: "", email: "", username: "", selectedFile: "" });
    const user = JSON.parse(localStorage.getItem("user"));
    const dispatch = useDispatch();
    const { authData, error, success } = useSelector(state => state.auth)
    
    useEffect(() => {
        setForm(user.result)
    }, [])
    
    function onChange(e){
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(editAccount(form));
    }

  return (
    <>
        {!user ? (
            <div className='no-user'>Nie znaleziono danego użytkownika</div>
        ) : (
            <form onSubmit={handleSubmit} noValidate>
                <div className="edit-account__img-box">
                    <img src={userImg} alt="" />
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setForm({ ...form, selectedFile: base64 })} />
                </div>
                <div className="edit-account__box">
                    <input type="text" id="name" name="name" value={form.name} onChange={onChange} required/>
                    <label htmlFor="name">Imię i nazwisko</label>
                    <p className="edit-account__text-error">error</p>
                </div>
                <div className="edit-account__box">
                    <input type="text" id="email" name="email" value={form.email} onChange={onChange} required/>
                    <label htmlFor="email">Adres email</label>
                    <p className="edit-account__text-error">error</p>
                </div>
                <div className="edit-account__box">
                    <input type="text" id="username" name="username" value={form.username} onChange={onChange} required/>
                    <label htmlFor="username">Nazwa użytkownika</label>
                    <p className="edit-account__text-error">error</p>
                </div>
                <div className="edit-account__submit-btn">
                    <button type="submit">Edytuj profil</button>
                </div>
                <p className={success ? "edit-account__submit-message success" : "edit-account__submit-message"}>
                    {error ? authData : ""}
                    {success ? authData : ""}
                </p>
            </form>
        )}
    </>
  )
}

export default MainData