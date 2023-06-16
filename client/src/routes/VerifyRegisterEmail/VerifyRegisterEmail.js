import React, { useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { verifyRegisterEmail } from '../../actions/verifyEmails'
import "./verify-register-email.css"

function VerifyRegisterEmail() {
    const { id, token } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { success } = useSelector(state => state.verifyEmails)

    useEffect(() => {
        dispatch(verifyRegisterEmail(id, token))
        localStorage.removeItem("email")
    }, [])

  return (
    <section className='verify-register-email'>
        { success ? (
            <div className='verify-register-email__container'>
                <h2 className='verify-register-email__container-title'>Rejestracja potwierdzona</h2>
                <p className='verify-register-email__container-text'>Dziękujemy za rejestrację w naszym systemie. Teraz możesz się zalogować</p>
                <div className='verify-register-email__container-btn-box'>
                    <button className='verify-register-email__container-btn' onClick={() => navigate("/login")}>Zaloguj się</button>
                </div>
            </div>
        ) : (
            <div className='verify-register-email__container'>
                <h2 className='verify-register-email__container-title'>404</h2>
                <p className='verify-register-email__container-text'>Przykro nam ale podany link jest nieprawidłowy</p>
            </div>
        )}
    </section>
  )
}

export default VerifyRegisterEmail