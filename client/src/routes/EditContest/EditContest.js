import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import CreateEditContest from '../../components/CreateEditContest/CreateEditContest'
import { getContestById, updateContest } from '../../actions/contests'

function EditContest() {
    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getContestById(id))
    }, [])

  return (
    <CreateEditContest headingText={"Edytuj zawody"} isEditing={true} dispatchFunc={updateContest} />
  )
}

export default EditContest