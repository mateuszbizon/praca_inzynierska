import React, { useEffect, useState } from 'react'
import CreateEditTutorial from '../../components/CreateEditTutorial/CreateEditTutorial'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getTutorialById, updateTutorial } from '../../actions/tutorials'
import Loader from '../../components/Loader/Loader'

function EditTutorial() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { tutorial } = useSelector(state => state.tutorials)
    const { isLoading } = useSelector(state => state.loaders)
    const user = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        dispatch(getTutorialById(id))
    }, [])

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {user.result._id === tutorial.creator || user.result.isAdmin ? (
            <CreateEditTutorial isEditing={true} dispatchFunc={updateTutorial} />
          ) : null}
        </>
      )}
    </>
  )
}

export default EditTutorial