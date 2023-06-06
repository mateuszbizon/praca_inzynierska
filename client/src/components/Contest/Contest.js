import React from 'react'
import "./contest.css"

function Contest({contest}) {
    const user = JSON.parse(localStorage.getItem("user"))

  return (
    <div className='contest'>
        <div className='contest__main-side'>
            <p className='contest__text'>{contest.name}</p>
            <p className='contest__text'>{new Date(contest.startContest).getDate()} - {new Date(contest.endContest).getDate()} {new Date(contest.startContest).toLocaleString('default', { month: 'long' })}, {new Date(contest.startContest).getFullYear()}</p>
            <p className='contest__text'>zawody {contest.typeContest}{contest.typeContest !== "online" && `, ${contest.city}`}</p>
        </div>
        {user.result.isAdmin && (
            <div className='contest__buttons-side'>
                <button className='contest__btn'>Edytuj</button>
                <button className='contest__btn'>Usuń</button>
            </div>
        )}
    </div>
  )
}

export default Contest