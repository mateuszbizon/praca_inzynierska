import React, { useEffect, useState } from 'react'
import CreateEditTutorial from '../../components/CreateEditTutorial/CreateEditTutorial'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getTutorialById, updateTutorial } from '../../actions/tutorials'
import Loader from '../../components/Loader/Loader'

function EditTutorial() {
    const { id } = useParams()
    const [title, setTitle] = useState("")
    const [allStages, setAllStages] = useState([])
    const dispatch = useDispatch()
    const { tutorial } = useSelector(state => state.tutorials)
    const { isLoading } = useSelector(state => state.loaders)
    const user = JSON.parse(localStorage.getItem("user"))

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
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {user.result._id === tutorial.creator && (
            <CreateEditTutorial title={title} setTitle={setTitle} allStages={allStages} setAllStages={setAllStages} dispatchFunc={updateTutorial} />
          )}
        </>
      )}
    </>
  )
}

export default EditTutorial