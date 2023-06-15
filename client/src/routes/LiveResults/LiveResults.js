import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { getContestEvent } from '../../actions/contests'
import MenuIcon from "@mui/icons-material/Menu";
import "./live-results.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import io from "socket.io-client"

const socket = io.connect("http://localhost:5000")

function LiveResults() {
    const { id, event } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { contest, contestEvent } = useSelector(state => state.contests)
    const [asideOpen, setAsideOpen] = useState(false)
    const [contestEventusers, setContestEventUsers] = useState([])
    const user = JSON.parse(localStorage.getItem("user"))

    function openAside() {
        setAsideOpen(!asideOpen)
    }

    useEffect(() => {
        dispatch(getContestEvent(id, event))
        socket.emit("join_room", { room: `${id}${event}`})
    }, [])

    useEffect(() => {
        if (Object.keys(contestEvent).length > 0) {
            setContestEventUsers(contestEvent.users)
        }
    }, [contestEvent])

    useEffect(() => {
        socket.on("get_times", (data) => {
            setContestEventUsers(data)
        })
    }, [socket])

  return (
    <section className='live-results'>
        <div className={asideOpen ? 'live-results__shadow' : "live-results__shadow closed"} onClick={openAside}></div>
        <aside className='live-results__aside'>
            {contest.events?.map((event, index) => (
                <div key={index} className='live-results__aside-item'><a className='live-results__link' href={`/live-results/${id}/${event.value}`}>{event.label}</a></div>
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
                        {contestEventusers?.map((user, index) => (
                            <tr key={index} className='live-results__table-row'>
                                <td className='live-results__table-lp'>{user.average !== 1000000 && index + 1}</td>
                                <td className='live-results__table-header'>{user.name} {user.surname}</td>
                                {user.times.map((time, index) => (
                                    <td key={index} className='live-results__table-time'>{time}</td>
                                ))}
                                <td className='live-results__table-time'>{user.averageText}</td>
                                <td className='live-results__table-time'>{user.bestTime}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        <div className={asideOpen ? 'live-results__aside-mobile open' : "live-results__aside-mobile"}>
            <div className='live-results__aside-mobile-close'><FontAwesomeIcon className='live-results__aside-mobile-close-icon' icon={faArrowLeft} onClick={openAside} /></div>
            {contest.events?.map((event, index) => (
                <div key={index} className='live-results__aside-item'><a className='live-results__link' href={`/live-results/${id}/${event.value}`}>{event.label}</a></div>
            ))}
        </div>
    </section>
  )
}

export default LiveResults