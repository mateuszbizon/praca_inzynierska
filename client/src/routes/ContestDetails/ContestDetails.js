import React, { useEffect, useState } from 'react'
import "./contest-details.css"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getContestById } from '../../actions/contests'
import RegisterUserToContest from '../../components/RegisterUserToContest/RegisterUserToContest'

function ContestDetails() {
    const [changeView, setChangeView] = useState("register")
    const { id } = useParams()
    const dispatch = useDispatch()
    const { contest } = useSelector(state => state.contests)

    useEffect(() => {
        dispatch(getContestById(id))
    }, [])

  return (
    <section className='contest-details'>
        <div className='contest-details__box'>
            <div className='contest-details__box-item'>
                <h3 className='contest-details__title'>Data</h3>
                <p className='contest-details__text'>{new Date(contest.startContest).getDate()} - {new Date(contest.endContest).getDate()} {new Date(contest.startContest).toLocaleString('default', { month: 'long' })}, {new Date(contest.startContest).getFullYear()}</p>
            </div>
            <div className='contest-details__box-item'>
                <h3 className='contest-details__title'>Miejsce</h3>
                <p className='contest-details__text'>{contest.typeContest === "on-line" ? `zawody ${contest.typeContest}` : contest.place}</p>
            </div>
            <div className='contest-details__box-item'>
                <h3 className='contest-details__title'>Początek rejestracji</h3>
                <p className='contest-details__text'>{new Date(contest.startRegistration).getDate()} {new Date(contest.startRegistration).toLocaleString('default', { month: 'long' })} {new Date(contest.startRegistration).getFullYear()}, {new Date(contest.startRegistration).getHours()}:{new Date(contest.startRegistration).getMinutes()}</p>
            </div>
            <div className='contest-details__box-item'>
                <h3 className='contest-details__title'>Koniec rejestracji</h3>
                <p className='contest-details__text'>{new Date(contest.endRegistration).getDate()} {new Date(contest.endRegistration).toLocaleString('default', { month: 'long' })} {new Date(contest.endRegistration).getFullYear()}, {new Date(contest.endRegistration).getHours()}:{new Date(contest.endRegistration).getMinutes()}</p>
            </div>
            <div className='contest-details__box-item'>
                <h3 className='contest-details__title'>Konkurencje</h3>
                {contest.events?.map((event, index) => (
                    <span className='contest-details__text' key={index}>{event.displayText}{index < contest.events.length - 1 && ","} </span>
                ))}
            </div>
            <div className='contest-details__box-item'>
                <h3 className='contest-details__title'>Limit zawodników</h3>
                <p className='contest-details__text'>{contest.usersLimit}</p>
            </div>
        </div>
        <div className='contest-details__change-view-btns'>
            <button className='contest-details__change-view-btn' onClick={() => setChangeView("register")}>Rejestracja</button>
            <button className='contest-details__change-view-btn' onClick={() => setChangeView("users")}>Zawodnicy</button>
            <button className='contest-details__change-view-btn' onClick={() => setChangeView("regulations")}>Regulamin</button>
            <button className='contest-details__change-view-btn' onClick={() => setChangeView("live")}>Wyniki live</button>
        </div>
        {changeView === "register" && <RegisterUserToContest startRegistration={contest.startRegistration} endRegistration={contest.endRegistration} id={contest._id} />}
    </section>
  )
}

export default ContestDetails