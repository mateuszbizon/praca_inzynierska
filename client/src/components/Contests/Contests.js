import React, { useState } from 'react'
import Contest from '../Contest/Contest'
import { useSelector } from 'react-redux'
import Loader from "../Loader/Loader"
import "./contests.css"
import DeleteConfirm from '../DeleteConfirm/DeleteConfirm'
import { deleteContestById } from '../../actions/contests'

function Contests({ shadowActive, setShadowActive }) {
    const { isLoading } = useSelector(state => state.loaders)
    const { contests } = useSelector(state => state.contests)
    const [currentId, setCurrentId] = useState(null)

    if (!contests.length && !isLoading) return (
		<div className="no-contents">
			Brak nadchodzących zawodów
		</div>
	);

  return (
    <>
        <DeleteConfirm shadowActive={shadowActive} setShadowActive={setShadowActive} currentId={currentId} setCurrentId={setCurrentId} deleteFunc={deleteContestById} />
        {isLoading ? (
            <Loader />
        ) : (
            <div className='contests'>
                {contests.map((contest, index) => (
                    <Contest key={index} contest={contest} setShadowActive={setShadowActive} setCurrentId={setCurrentId} />
                ))}
            </div>
        )}
    </>
  )
}

export default Contests