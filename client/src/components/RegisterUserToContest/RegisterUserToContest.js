import React, { useState, useEffect } from 'react'
import Select from "react-select"
import "./register-user-contest.css"
import registerUserContestValid from '../../validations/RegisterUserContestvalid'
import checkAreInputsEmpty from "../../validations/CheckAreInputsEmpty"
import { useDispatch, useSelector } from "react-redux"
import { addUserToContest, resetContest } from '../../actions/contests'

function RegisterUserToContest({ startRegistration, endRegistration, id, events }) {
  const [form, setForm] = useState({ email: "", place: "", events: [] })
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()
  const { isLoading } = useSelector(state => state.loaders)
  const { isBadRequest, badMessage } = useSelector(state => state.badRequest)
  const { message } = useSelector(state => state.contests)

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()    

    setErrors(registerUserContestValid(form))
  }

  useEffect(() => {
    if (Object.keys(errors).length == 0 && !checkAreInputsEmpty(form) && form.events.length > 0) {
      dispatch(addUserToContest(form, id))
    }
  }, [errors])

  useEffect(() => {
    dispatch(resetContest());
  }, [])
    
  return (
    <>
      {Date.now() >= Date.parse(startRegistration) && Date.now() < Date.parse(endRegistration) && (
        <>
          <div className='register-info'>
            <p className='register-info__text'>Aby zarejestrować się w zawodach, musisz posiadać konto w naszym systemie. Jeśli nie masz konta <a className='register-info__link' href="/register" target='_blank'>zarejestruj się</a></p>
          </div>
          <div className='register-user-contest-form'>
            <div className='register-user-contest-form__container'>
              <h1 className='register-user-contest-form__heading'>Rejestracja na zawody</h1>
              <form>
                <div className='register-user-contest-form__box'>
                  <input className='register-user-contest-form__input' id="email" type='text' name="email" value={form.email} onChange={onChange} required/>
                  <label className='register-user-contest-form__label' htmlFor='email'>Adres email</label>
                  <p className={errors.email ? "register-user-contest-form__text-error register-user-contest-form__show-input-error" : "register-user-contest-form__text-error"} >
                      {errors.email ? errors.email : "error"}
                  </p>
                </div>
                <div className='register-user-contest-form__box'>
                  <input className='register-user-contest-form__input' id="place" type='text' name="place" value={form.place} onChange={onChange} required/>
                  <label className='register-user-contest-form__label' htmlFor='place'>Miejscowość</label>
                  <p className={errors.place ? "register-user-contest-form__text-error register-user-contest-form__show-input-error" : "register-user-contest-form__text-error"} >
                      {errors.place ? errors.place : "error"}
                  </p>
                </div>
                <div className='register-user-contest-form__box'>
                  <Select className='register-user-contest-form__select' placeholder="Wybierz konkurencje" isMulti options={events} onChange={item => setForm({ ...form, events: item })} closeMenuOnSelect={false} />
                  <p className={errors.events ? "register-user-contest-form__text-error register-user-contest-form__show-input-error" : "register-user-contest-form__text-error"} >
                      {errors.events ? errors.events : "error"}
                  </p>
                </div>
                <p className={isBadRequest ? "register-user-contest-form__submit-message bad-color" : "register-user-contest-form__submit-message good-color"}>{isBadRequest ? badMessage : message}</p>
                <div className='register-user-contest-form__btn-box'>
                  <button type='submit' onClick={handleSubmit} className='register-user-contest-form__submit-btn' disabled={isLoading}>
                      Zarejestruj
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {Date.now() < Date.parse(startRegistration) && (
        <div className='register-user-contest-start'>
          <h3 className='register-user-contest-start__title'>Rejestacja jest obecnie zamknięta.</h3>
          <p className='register-user-contest-start__text'>Start rejestracji nastąpi {new Date(startRegistration).getDate()} {new Date(startRegistration).toLocaleString('default', { month: 'long' })} {new Date(startRegistration).getFullYear()}, {new Date(startRegistration).getHours()}:{new Date(startRegistration).getMinutes()} </p>
        </div>
      )}

      {Date.now() >= Date.parse(endRegistration) && (
        <div className='register-user-contest-end'>
          <h3 className='register-user-contest-end__title'>Rejestracja została zakończona.</h3>
        </div>
      )}
    </>
  )
}

export default RegisterUserToContest