import React, { useEffect, useState } from 'react'
import CreateEditTutorial from '../../components/CreateEditTutorial/CreateEditTutorial'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getTutorialById, updateTutorial } from '../../actions/tutorials'

function EditTutorial() {
    const { id } = useParams()
    const { tutorial } = useSelector(state => state.tutorials)
    const [title, setTitle] = useState("")
    const [allStages, setAllStages] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTutorialById(id))
    }, [])

    useEffect(() => {
        if (tutorial) {
            setTitle(tutorial.title)
            setAllStages(tutorial.stages)
        }
    }, [tutorial])

  return (
    <CreateEditTutorial title={title} setTitle={setTitle} allStages={allStages} setAllStages={setAllStages} dispatchFunc={updateTutorial} />
  )
}

export default EditTutorial