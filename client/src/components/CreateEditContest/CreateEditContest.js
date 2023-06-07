import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import "./create-edit-contest.css"
import createContestValid from '../../validations/CreateContestValid'
import checkAreInputsEmpty from '../../validations/CheckAreInputsEmpty'

function CreateEditContest({headingText, isEditing, dispatchFunc}) {
    const [form, setForm] = useState({ name: "", startRegistration: "", endRegistration: "", startContest: "", endContest: "", typeContest: "default", city: "" })
    const [errors, setErrors] = useState({})
    const { isLoading } = useSelector(state => state.loaders)
    const { contest } = useSelector(state => state.contests)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function onChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()
    }

    function handleSubmit(e) {
        e.preventDefault()

        setErrors(createContestValid(form))
    }

    useEffect(() => {
        if (Object.keys(errors).length == 0 && !checkAreInputsEmpty(form)) {
            dispatch(dispatchFunc(form, navigate, contest._id))
        }
    }, [errors])

    useEffect(() => {
        if (Object.keys(contest).length > 0 && isEditing) {
            setForm(contest)
        }
    }, [contest])

  return (
    <section className='create-edit-contest'>
        <div className='create-edit-contest__form-container'>
            <h1 className='create-edit-contest__heading'>{headingText}</h1>
            <form onSubmit={handleSubmit} noValidate>
                <div className='create-edit-contest__box'>
                    <input id="name" type='text' name="name" value={form.name} onChange={onChange} required/>
                    <label htmlFor='name'>Nazwa</label>
                    <p className={errors.name ? "create-edit-contest__text-error create-edit-contest__show-input-error" : "create-edit-contest__text-error"} >
                        {errors.name ? errors.name : "error"}
                    </p>
                </div>
                <div className='create-edit-contest__box'>
                    <input id="startRegistration" type='text' name="startRegistration" value={form.startRegistration} onChange={onChange} onFocus={(e) => (e.target.type = "datetime-local")} onBlur={(e) => (e.target.type = "text")} required/>
                    <label htmlFor='startRegistration'>Początek rejestracji</label>
                    <p className={errors.startRegistration ? "create-edit-contest__text-error create-edit-contest__show-input-error" : "create-edit-contest__text-error"} >
                        {errors.startRegistration ? errors.startRegistration : "error"}
                    </p>
                </div>
                <div className='create-edit-contest__box'>
                    <input id="endRegistration" type='text' name="endRegistration" value={form.endRegistration} onChange={onChange} onFocus={(e) => (e.target.type = "datetime-local")} onBlur={(e) => (e.target.type = "text")} required/>
                    <label htmlFor='endRegistration'>Koniec rejestracji</label>
                    <p className={errors.endRegistration ? "create-edit-contest__text-error create-edit-contest__show-input-error" : "create-edit-contest__text-error"} >
                        {errors.endRegistration ? errors.endRegistration : "error"}
                    </p>
                </div>
                <div className='create-edit-contest__box'>
                    <input id="startContest" type='text' name="startContest" value={form.startContest} onChange={onChange} onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")} required/>
                    <label htmlFor='startContest'>Początek zawodów</label>
                    <p className={errors.startContest ? "create-edit-contest__text-error create-edit-contest__show-input-error" : "create-edit-contest__text-error"} >
                        {errors.startContest ? errors.startContest : "error"}
                    </p>
                </div>
                <div className='create-edit-contest__box'>
                    <input id="endContest" type='text' name="endContest" value={form.endContest} onChange={onChange} onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")} required/>
                    <label htmlFor='endContest'>Koniec zawodów</label>
                    <p className={errors.endContest ? "create-edit-contest__text-error create-edit-contest__show-input-error" : "create-edit-contest__text-error"} >
                        {errors.endContest ? errors.endContest : "error"}
                    </p>
                </div>
                <div className='create-edit-contest__box'>
                    <select name="typeContest" value={form.typeContest} onChange={onChange}>
                        <option value="default" disabled>Wybierz rodzaj zawodów</option>
                        <option value="on-line">on-line</option>
                        <option value="stationary">stacjonarnie</option>
                    </select>
                    <p className={errors.typeContest ? "create-edit-contest__text-error create-edit-contest__show-input-error" : "create-edit-contest__text-error"} >
                        {errors.typeContest ? errors.typeContest : "error"}
                    </p>
                </div>
                {form.typeContest === "stationary" && (
                    <div className='create-edit-contest__box'>
                        <input id="city" type='text' name="city" value={form.city} onChange={onChange} required/>
                        <label htmlFor='city'>Miasto</label>
                        <p className={errors.city ? "create-edit-contest__text-error create-edit-contest__show-input-error" : "create-edit-contest__text-error"} >
                        {errors.city ? errors.city : "error"}
                    </p>
                    </div>
                )}
                <div className='create-edit-contest__btn-box'>
                    <button type='submit' className='create-edit-contest__submit-btn' disabled={isLoading}>
                        {headingText}
                    </button>
                </div>
            </form>
        </div>
    </section>
  )
}

export default CreateEditContest