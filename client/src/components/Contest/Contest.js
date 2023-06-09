import React from 'react'
import "./contest.css"
import { useNavigate } from 'react-router-dom'

function Contest({contest, setShadowActive, setCurrentId}) {
    const user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()

    function handleDelete() {
        setShadowActive(true)
        setCurrentId(contest._id)
    }

  return (
    <div className='contest'>
        <div className='contest__main-side' onClick={() => navigate(`/contests/${contest._id}`)}>
            <p className='contest__text'>{contest.name}</p>
            <p className='contest__text'>{new Date(contest.startContest).getDate()} - {new Date(contest.endContest).getDate()} {new Date(contest.startContest).toLocaleString('default', { month: 'long' })}, {new Date(contest.startContest).getFullYear()}</p>
            <p className='contest__text'>{contest.typeContest === "on-line" ? `zawody ${contest.typeContest}` : contest.city}</p>
        </div>
        {user.result.isAdmin && !contest.isEnded && (
            <div className='contest__buttons-side'>
                <button className='contest__btn' onClick={() => navigate(`/edit-contest/${contest._id}`)}>Edytuj</button>
                <button className='contest__btn' onClick={handleDelete}>Usuń</button>
            </div>
        )}
    </div>
  )
}

export default Contest