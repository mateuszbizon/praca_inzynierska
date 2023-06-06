import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getAllContests } from '../../actions/contests'
import "./contests-dashboard.css"
import Contests from '../../components/Contests/Contests'
import ContestsEnd from '../../components/ContestsEnd/ContestsEnd'

function ContestsDashboard() {
    const user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()
    const markerRef = useRef()
    const firstButtonRef = useRef()
    const [changeView, setChangeView] = useState("contests")
    const dispatch = useDispatch()

    function setMarkerFirst() {
      markerRef.current.style.left = `${firstButtonRef.current.offsetLeft}px`
      markerRef.current.style.width = `${firstButtonRef.current.offsetWidth}px`
    }

    function indicator(e) {
      markerRef.current.style.left = `${e.offsetLeft}px`;
      markerRef.current.style.width = `${e.offsetWidth}px`;
    }
  
    function changeViewAndMarker(e, viewToChange) {
      setChangeView(viewToChange);
      indicator(e.target);
    }

    useEffect(() => {
      dispatch(getAllContests())
      setMarkerFirst()
    }, [])

  return (
    <section className='contests-dashboard'>
        <h2 className='contests-dashboard__heading'>Zawody</h2>
        {user.result.isAdmin && (
            <div>
                <button className='contests-dashboard__btn' onClick={() => navigate("/create-contest")}>Dodaj zawody</button>
            </div>
        )}
        <div className='contests-dashboard__main-buttons'>
            <button className='contests-dashboard__btn-change-view' ref={firstButtonRef} onClick={e => changeViewAndMarker(e, "contests")}>Nadchodzące</button>
            <button className='contests-dashboard__btn-change-view' onClick={e => changeViewAndMarker(e, "contests-end")}>Minione</button>
            <div className='contests-dashboard__marker' ref={markerRef}></div>
        </div>
        {changeView === "contests" && <Contests />}
        {changeView === "contests-end" && <ContestsEnd />}
    </section>
  )
}

export default ContestsDashboard