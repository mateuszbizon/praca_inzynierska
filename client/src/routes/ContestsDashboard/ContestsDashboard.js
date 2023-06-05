import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./contests-dashboard.css"

function ContestsDashboard() {
    const user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()

  return (
    <section className='contests-dashboard'>
        <h2 className='contests-dashboard__heading'>Zawody</h2>
        {user.result.isAdmin && (
            <div>
                <button className='contests-dashboard__btn' onClick={() => navigate("/create-contest")}>Dodaj zawody</button>
            </div>
        )}
    </section>
  )
}

export default ContestsDashboard