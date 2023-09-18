import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getAllContests } from '../../actions/contests'
import "./contests-dashboard.css"
import Contests from '../../components/Contests/Contests'
import ContestsEnd from '../../components/ContestsEnd/ContestsEnd'
import Marker from '../../components/Marker/Marker'

function ContestsDashboard() {
    const user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()
    const firstButtonRef = useRef()
    const [changeView, setChangeView] = useState("contests")
    const [indicator, setIndicator] = useState(null)
    const [shadowActive, setShadowActive] = useState(false)
    const dispatch = useDispatch()
  
    function changeViewAndMarker(e, viewToChange) {
      setChangeView(viewToChange);
      setIndicator(e.target)
    }

    useEffect(() => {
      dispatch(getAllContests())
    }, [])

  return (
    <section className='contests-dashboard'>
        <div className={shadowActive ? 'contests-dashboard__shadow active' : "contests-dashboard__shadow"} onClick={() => setShadowActive(false)}></div>
        <h2 className='contests-dashboard__heading'>Zawody</h2>
        {user !== null ? user.result.isAdmin && (
            <div>
                <button className='contests-dashboard__btn' onClick={() => navigate("/create-contest")}>Dodaj zawody</button>
            </div>
        ) : null}
        <div className='contests-dashboard__main-buttons'>
            <button className='contests-dashboard__btn-change-view' ref={firstButtonRef} onClick={e => changeViewAndMarker(e, "contests")}>Nadchodzące</button>
            <button className='contests-dashboard__btn-change-view' onClick={e => changeViewAndMarker(e, "contests-end")}>Minione</button>
            <Marker firstButtonRef={firstButtonRef} indicator={indicator} />
        </div>
        {changeView === "contests" && <Contests shadowActive={shadowActive} setShadowActive={setShadowActive} />}
        {changeView === "contests-end" && <ContestsEnd />}
    </section>
  )
}

export default ContestsDashboard