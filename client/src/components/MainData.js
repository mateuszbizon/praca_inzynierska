import React, { useState, useEffect, useRef } from 'react';
import FileBase from 'react-file-base64';
import userImg from '../img/user.png';
import { useDispatch, useSelector } from "react-redux";
import { editAccount } from '../actions/auth';

function MainData() {
    const [form, setForm] = useState({ name: "", email: "", username: "", selectedFile: "" });
    const user = JSON.parse(localStorage.getItem("user"));
    const dispatch = useDispatch();
    const { authData, error, success } = useSelector(state => state.auth)
    const emailError = useRef();
    const nameError = useRef();
    const usernameError = useRef();
    
    useEffect(() => {
        setForm(user.result)
    }, [])

    function checkEmail(){
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(form.email.length == 0){
            emailError.current.textContent = 'Email nie może być pusty';
			emailError.current.style.visibility = 'visible';
            return false;
        }

        if(!form.email.match(emailRegex)){
            emailError.current.textContent = 'Nieprawidłowy email';
			emailError.current.style.visibility = 'visible';
            return false;
        }

		emailError.current.style.visibility = 'hidden';
        return true;
    }

    function checkName(){
        if(form.name.length == 0){
            nameError.current.textContent = 'Imię nie może być puste';
			nameError.current.style.visibility = 'visible';
            return false;
        }

		nameError.current.style.visibility = 'hidden';
		return true;
    }

    function checkUsername(){
        if(form.username.length == 0){
            usernameError.current.textContent = 'Nazwa użytkownika nie może być pusta';
			usernameError.current.style.visibility = 'visible';
            return false;
        }

		usernameError.current.style.visibility = 'hidden';
		return true;
    }
    
    function onChange(e){
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e){
        e.preventDefault();

        if(!checkEmail() || !checkName() || !checkUsername()) return false;

        dispatch(editAccount(form));
    }

  return (
    <>
        {!user ? (
            <div className='no-user'>Nie znaleziono danego użytkownika</div>
        ) : (
            <form onSubmit={handleSubmit} noValidate>
                <p className="edit-account__change-img">Zdjęcie profilowe</p>
                <div className="edit-account__img-box">
                    <img src={user.result.selectedFile === "" ? userImg : user.result.selectedFile} alt="" />
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setForm({ ...form, selectedFile: base64 })} />
                </div>
                <div className="edit-account__box">
                    <input type="text" id="name" name="name" value={form.name} onChange={onChange} required/>
                    <label htmlFor="name">Imię i nazwisko</label>
                    <p className="edit-account__text-error" ref={nameError}>error</p>
                </div>
                <div className="edit-account__box">
                    <input type="text" id="email" name="email" value={form.email} onChange={onChange} required/>
                    <label htmlFor="email">Adres email</label>
                    <p className="edit-account__text-error" ref={emailError}>error</p>
                </div>
                <div className="edit-account__box">
                    <input type="text" id="username" name="username" value={form.username} onChange={onChange} required/>
                    <label htmlFor="username">Nazwa użytkownika</label>
                    <p className="edit-account__text-error" ref={usernameError}>error</p>
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