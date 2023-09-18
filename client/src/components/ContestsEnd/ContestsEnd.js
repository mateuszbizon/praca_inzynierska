import React, { useState } from 'react'
import Contest from '../Contest/Contest'
import { useSelector } from 'react-redux'
import Loader from "../Loader/Loader"

function ContestsEnd() {
    const { isLoading } = useSelector(state => state.loaders)
    const { contestsEnd } = useSelector(state => state.contests)

    if (!contestsEnd.length && !isLoading) return (
		<div className="no-contents">
			Brak minionych zawodów
		</div>
	);

  return (
    <>
        {isLoading ? (
            <Loader />
        ) : (
            <div className='contests'>
                {contestsEnd.map((contest, index) => (
                    <Contest key={index} contest={contest} />
                ))}
            </div>
        )}
    </>
  )
}

export default ContestsEnd