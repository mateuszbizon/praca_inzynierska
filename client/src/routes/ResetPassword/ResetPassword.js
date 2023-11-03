import React, { useState, useEffect } from 'react';
import "./reset-password.css";
import resetPasswordValid from '../../validations/ResetPasswordValid';
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, reset } from '../../actions/auth';
import { CircularProgress } from "@mui/material";

function ResetPassword() {
    const [form, setForm] = useState({ email: "" });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const { authData, success, loading } = useSelector(state => state.auth);

    function onChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    function handleSubmit() {
        setErrors(resetPasswordValid(form));
    }

    useEffect(() => {
        if (Object.keys(errors).length == 0 && form.email !== "") {
            dispatch(resetPassword(form));
        }
    }, [errors]);

    useEffect(() => {
        dispatch(reset());
    }, [])

  return (
    <section className='reset-password'>
        <div className='reset-password__form'>
            <h1 className='reset-password__heading'>Reset hasła</h1>
            <div className='reset-password__box'>
                <input type='text' id="email" name='email' onChange={onChange} required/>
                <label htmlFor='email'>Adres email</label>
                <p 
                    className={errors.email ? "reset-password__text-error reset-password__show-text-error" : "reset-password__text-error"}>
                    {errors.email ? errors.email : "error"}
                </p>
            </div>
            <p className={success ? "reset-password__submit-message reset-password__submit-message--success" : "reset-password__submit-message"}>
                {!success && authData}
                {success && authData}
            </p>
            <div className='reset-password__btn-box'>
                <button className='reset-password__submit-btn' onClick={handleSubmit} disabled={loading}>
                    Resetuj 
                    {loading && (
                        <CircularProgress size='25px' style={{ color: "#fff" }} />
                    )}
                </button>
            </div>
        </div>
    </section>
  )
}

export default ResetPassword