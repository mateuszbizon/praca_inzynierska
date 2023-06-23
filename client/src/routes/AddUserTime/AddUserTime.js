import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from 'react-router-dom'
import './add-user-time.css'
import checkAreInputsEmpty from '../../validations/CheckAreInputsEmpty'
import addUserTimeValid from '../../validations/AddUserTimeValid'
import { addUserTimesToContestEvent, getContestEvent } from '../../actions/contests'
import io from "socket.io-client"
import { apiUrl } from '../../api'

const socket = io.connect(apiUrl)

function AddUserTime() {
    const {id, event } = useParams()
    const [form, setForm] = useState({ email: "", time1: "", time2: "", time3: "", time4: "", time5: "" })
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { contestEvent } = useSelector(state => state.contests)

    function onChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()

        setErrors(addUserTimeValid(form, contestEvent))
    }

    useEffect(() => {
        if (Object.keys(errors).length == 0 && !checkAreInputsEmpty(form)) {
            const times = [form.time1, form.time2, form.time3, form.time4, form.time5]
            dispatch(addUserTimesToContestEvent(id, event, { times, email: form.email }, navigate))
            socket.emit("send_time", { users: contestEvent.users, room: `${id}${event}`, times, email: form.email })
        }
    }, [errors])

    useEffect(() => {
        dispatch(getContestEvent(id, event))
    }, [])

  return (
    <div className='add-user-time'>
        <div className="add-user-time__container">
            <h1 className='add-user-time__heading'>Dodaj czasy</h1>
            <form noValidate>
                <div className='add-user-time__box'>
                    <input id="email" className='add-user-time__input' name="email" type="text" value={form.email} onChange={onChange} required/>
                    <label className='add-user-time__label' htmlFor='time1'>Adres email</label>
                    <p className={errors.email ? 'add-user-time__text-error add-user-time__show-input-error' : 'add-user-time__text-error'}>
                        {errors.email ? errors.email : "error"}
                    </p>
                </div>
                <div className='add-user-time__box'>
                    <input id="time1" className='add-user-time__input' name="time1" type="text" value={form.time1} onChange={onChange} required/>
                    <label className='add-user-time__label' htmlFor='time1'>Czas 1</label>
                    <p className={errors.time1 ? 'add-user-time__text-error add-user-time__show-input-error' : 'add-user-time__text-error'}>
                        {errors.time1 ? errors.time1 : "error"}
                    </p>
                </div>
                <div className='add-user-time__box'>
                    <input id="time2" className='add-user-time__input' name="time2" type="text" value={form.time2} onChange={onChange} required/>
                    <label className='add-user-time__label' htmlFor='time2'>Czas 2</label>
                    <p className={errors.time2 ? 'add-user-time__text-error add-user-time__show-input-error' : 'add-user-time__text-error'}>
                        {errors.time2 ? errors.time2 : "error"}
                    </p>
                </div>
                <div className='add-user-time__box'>
                    <input id="time3" className='add-user-time__input' name="time3" type="text" value={form.time3} onChange={onChange} required/>
                    <label className='add-user-time__label' htmlFor='time1'>Czas 3</label>
                    <p className={errors.time3 ? 'add-user-time__text-error add-user-time__show-input-error' : 'add-user-time__text-error'}>
                        {errors.time3 ? errors.time3 : "error"}
                    </p>
                </div>
                <div className='add-user-time__box'>
                    <input id="time4" className='add-user-time__input' name="time4" type="text" value={form.time4} onChange={onChange} required/>
                    <label className='add-user-time__label' htmlFor='time1'>Czas 4</label>
                    <p className={errors.time4 ? 'add-user-time__text-error add-user-time__show-input-error' : 'add-user-time__text-error'}>
                        {errors.time4 ? errors.time4 : "error"}
                    </p>
                </div>
                <div className='add-user-time__box'>
                    <input id="time5" className='add-user-time__input' name="time5" type="text" value={form.time5} onChange={onChange} required/>
                    <label className='add-user-time__label' htmlFor='time1'>Czas 5</label>
                    <p className={errors.time5 ? 'add-user-time__text-error add-user-time__show-input-error' : 'add-user-time__text-error'}>
                        {errors.time5 ? errors.time5 : "error"}
                    </p>
                </div>
                <div className='add-user-time__btn-box'>
                    <button className='add-user-time__submit-btn' onClick={handleSubmit}>Dodaj</button>
                </div>
            </form>
         </div>
    </div>
  )
}

export default AddUserTime