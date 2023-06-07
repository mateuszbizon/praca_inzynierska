import React from 'react'
import CreateEditContest from '../../components/CreateEditContest/CreateEditContest'
import { createContest } from '../../actions/contests'

function CreateContest() {
  return (
    <CreateEditContest headingText={"Dodaj zawody"} isEditing={false} dispatchFunc={createContest} />
  )
}

export default CreateContest