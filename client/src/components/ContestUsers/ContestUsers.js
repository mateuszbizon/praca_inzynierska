import React from 'react'
import './contest-users.css'

function ContestUsers({ users, events }) {
  return (
    <div className='contest-users'>
        <table>
            <thead>
                <tr className='contest-users__table-row contest-users__table-row--first-row'>
                    <th className='contest-users__table-lp'>Lp.</th>
                    <th className='contest-users__table-header'>Zawodnik</th>
                    <th className='contest-users__table-header'>Miejscowość</th>
                    {events.map((event, index) => (
                        <th key={index} className='contest-users__table-events'>{event.value}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <tr key={index} className='contest-users__table-row'>
                        <td className='contest-users__table-lp'>{index + 1}</td>
                        <td className='contest-users__table-header'>{user.name} {user.surname}</td>
                        <td className='contest-users__table-header'>{user.place}</td>
                        {events.map((event, index) => (
                            <td key={index} className='contest-users__table-events'>{user.events.some(e => e.value === event.value) ? event.value : ""}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default ContestUsers