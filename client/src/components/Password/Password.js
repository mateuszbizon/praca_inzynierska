import React, { useRef, useState, useEffect } from 'react'
import './password.css'
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import editPasswordValid from '../../validations/EditPasswordValid';
import checkAreInputsEmpty from "../../validations/CheckAreInputsEmpty"
import { useDispatch, useSelector } from 'react-redux';
import { editPassword } from '../../actions/auth';
import { CircularProgress } from "@mui/material";

function Password() {
  const [form, setForm] = useState({ oldPassword: "", newPassword: "", repeatPassword: "" })
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()
  const { passwordMessage, successPassword, loading } = useSelector(state => state.auth)
  const user = JSON.parse(localStorage.getItem("user"))
  console.log(user.result._id)

  const oldPass = useRef()
  const oldPassShow = useRef()
  const oldPassHide = useRef()

  const newPass = useRef()
  const newPassShow = useRef()
  const newPassHide = useRef()

  const repeatPass = useRef()
  const repeatPassShow = useRef()
  const repeatPassHide = useRef()

  function showPassword(password, showPassword, hidePassword) {
    if (password.current.type === "password") {
			password.current.type = "text";
			showPassword.current.style.display = "block";
			hidePassword.current.style.display = "none";
		} else {
			password.current.type = "password";
			showPassword.current.style.display = "none";
			hidePassword.current.style.display = "block";
		}
  }

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()

    setErrors(editPasswordValid(form))
  }

  useEffect(() => {
    if (Object.keys(errors).length == 0 && !checkAreInputsEmpty(form)) {
      console.log('wyslano')
      dispatch(editPassword({ password: form.oldPassword, newPassword: form.newPassword }, user.result._id))
    }
  }, [errors])

  return (
    <form className='password' noValidate>
      <h1 className='password__heading'>Zmień hasło</h1>
      <div className='password__box'>
        <input id='oldPassword' className='password__input' name="oldPassword" type="password" onChange={onChange} value={form.oldPassword} ref={oldPass} required/>
        <label htmlFor="oldPassword" className='password__label'>Stare hasło</label>
        <span className='password__icons' onClick={() => showPassword(oldPass, oldPassShow, oldPassHide)}>
          <VisibilityOffIcon className='hide-password' ref={oldPassHide} />
          <VisibilityIcon className='show-password' ref={oldPassShow} />
        </span>
        <p className={errors.oldPassword ? "password__error-text password__show-input-error" : "password__error-text"}>{errors.oldPassword ? errors.oldPassword : "error"}</p>
      </div>
      <div className='password__box'>
        <input id='newPassword' className='password__input' name="newPassword" type="password" onChange={onChange} value={form.newPassword} ref={newPass} required/>
        <label htmlFor="newPassword" className='password__label'>Nowe hasło</label>
        <span className='password__icons' onClick={() => showPassword(newPass, newPassShow, newPassHide)}>
          <VisibilityOffIcon className='hide-password' ref={newPassHide} />
          <VisibilityIcon className='show-password' ref={newPassShow} />
        </span>
        <p className={errors.newPassword ? "password__error-text password__show-input-error" : "password__error-text"}>{errors.newPassword ? errors.newPassword : "error"}</p>
      </div>
      <div className='password__box'>
        <input id='repeatPassword' className='password__input' name="repeatPassword" type="password" onChange={onChange} value={form.repeatPassword} ref={repeatPass} required/>
        <label htmlFor="repeatPassword" className='password__label'>Powtórz hasło</label>
        <span className='password__icons' onClick={() => showPassword(repeatPass, repeatPassShow, repeatPassHide)}>
          <VisibilityOffIcon className='hide-password' ref={repeatPassHide} />
          <VisibilityIcon className='show-password' ref={repeatPassShow} />
        </span>
        <p className={errors.repeatPassword ? "password__error-text password__show-input-error" : "password__error-text"}>{errors.repeatPassword ? errors.repeatPassword : "error"}</p>
      </div>
      <p className={successPassword ? 'password__submit-message success' : 'password__submit-message'}>
          {!successPassword && passwordMessage}
          {successPassword && passwordMessage}
      </p>
      <div className='password__btn-box'>
        <button type="submit" className='password__submit' onClick={handleSubmit}>Zapisz {loading && <CircularProgress size='20px' style={{ color: "#fff" }} />}</button>
      </div>
    </form>
  )
}

export default Password