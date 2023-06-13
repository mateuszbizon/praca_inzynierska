import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { getContestEvent } from '../../actions/contests'
import MenuIcon from "@mui/icons-material/Menu";
import "./live-results.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function LiveResults() {
    const { id, event } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { contest, contestEvent } = useSelector(state => state.contests)
    const [asideOpen, setAsideOpen] = useState(false)
    const user = JSON.parse(localStorage.getItem("user"))

    function openAside() {
        setAsideOpen(!asideOpen)
    }

    useEffect(() => {
        dispatch(getContestEvent(id, event))
    }, [])

  return (
    <section className='live-results'>
        <div className={asideOpen ? 'live-results__shadow' : "live-results__shadow closed"} onClick={openAside}></div>
        <aside className='live-results__aside'>
            {contest.events?.map((event, index) => (
                <div key={index} className='live-results__aside-item'>{event.label}</div>
            ))}
        </aside>
        <div className='live-results__main'>
            <div className='live-results__main-header'>
                <div className='live-results__main-header-left-side'>
                    <div className='live-results__burger-box'>
                        <MenuIcon className='live-results__burger-btn' fontSize='large' onClick={openAside} />
                    </div>
                    <p className='live-results__event-name'>{contestEvent.value}</p>
                </div>
                {user ? user.result.isAdmin && (
                    <div className='live-results__main-header-right-side'>
                        <button className='live-results__add-btn' onClick={() => navigate(`/live-results/${contest._id}/${contestEvent.value}/submit`)}>Dodaj wyniki</button>
                    </div>
                ) : null}
            </div>
            <div className='live-results__main-content'>
                <table>
                    <thead>
                        <tr className='live-results__table-row live-results__table-row--first-row'>
                            <th className='live-results__table-lp'>Lp.</th>
                            <th className='live-results__table-header'>Zawodnik</th>
                            <th className='live-results__table-time'>1</th>
                            <th className='live-results__table-time'>2</th>
                            <th className='live-results__table-time'>3</th>
                            <th className='live-results__table-time'>4</th>
                            <th className='live-results__table-time'>5</th>
                            <th className='live-results__table-time'>Średnia</th>
                            <th className='live-results__table-time'>Najlepszy</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='live-results__table-row'>
                            <td className='live-results__table-lp'>1</td>
                            <td className='live-results__table-header'>Mateusz Bizoń</td>
                            <td className='live-results__table-time'>15.15</td>
                            <td className='live-results__table-time'>16.16</td>
                            <td className='live-results__table-time'>17.18</td>
                            <td className='live-results__table-time'>18.17</td>
                            <td className='live-results__table-time'>5.01</td>
                            <td className='live-results__table-time'>10.11</td>
                            <td className='live-results__table-time'>5.01</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className={asideOpen ? 'live-results__aside-mobile open' : "live-results__aside-mobile"}>
            <div className='live-results__aside-mobile-close'><FontAwesomeIcon className='live-results__aside-mobile-close-icon' icon={faArrowLeft} onClick={openAside} /></div>
            {contest.events?.map((event, index) => (
                <div key={index} className='live-results__aside-item'>{event.label}</div>
            ))}
        </div>
    </section>
  )
}

export default LiveResults