import React, { useState } from 'react'
import Contest from '../Contest/Contest'
import { useSelector } from 'react-redux'
import Loader from "../Loader/Loader"
import DeleteConfirm from '../DeleteConfirm/DeleteConfirm'
import { deleteContestEndById } from '../../actions/contests'

function ContestsEnd({ shadowActive, setShadowActive }) {
    const { isLoading } = useSelector(state => state.loaders)
    const { contestsEnd } = useSelector(state => state.contests)
    const [currentId, setCurrentId] = useState(null)

    if (!contestsEnd.length && !isLoading) return (
		<div className="no-contents">
			Brak minionych zawodów
		</div>
	);

  return (
    <>
        <DeleteConfirm shadowActive={shadowActive} setShadowActive={setShadowActive} currentId={currentId} setCurrentId={setCurrentId} deleteFunc={deleteContestEndById} />
        {isLoading ? (
            <Loader />
        ) : (
            <div className='contests'>
                {contestsEnd.map((contest, index) => (
                    <Contest key={index} contest={contest} setShadowActive={setShadowActive} setCurrentId={setCurrentId} />
                ))}
            </div>
        )}
    </>
  )
}

export default ContestsEnd