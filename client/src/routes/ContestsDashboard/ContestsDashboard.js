import React from 'react'
import "./contests-dashboard.css"

function ContestsDashboard() {
    const user = JSON.parse(localStorage.getItem("user"))

  return (
    <section className='contests-dashboard'>
        <h2 className='contests-dashboard__heading'>Zawody</h2>
        {user.result.isAdmin && (
            <div>
                <button className='contests-dashboard__btn'>Dodaj zawody</button>
            </div>
        )}
    </section>
  )
}

export default ContestsDashboard