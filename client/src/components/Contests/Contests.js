import React from 'react'
import Contest from '../Contest/Contest'
import { useSelector } from 'react-redux'
import Loader from "../Loader/Loader"
import "./contests.css"

function Contests() {
    const { isLoading } = useSelector(state => state.loaders)
    const { contests } = useSelector(state => state.contests)

    if (!contests.length && !isLoading) return (
		<div className="no-contents">
			Brak nadchodzących zawodów
		</div>
	);

  return (
    <>
        {isLoading ? (
            <Loader />
        ) : (
            <div className='contests'>
                {contests.map((contest, index) => (
                    <Contest key={index} contest={contest} />
                ))}
            </div>
        )}
    </>
  )
}

export default Contests