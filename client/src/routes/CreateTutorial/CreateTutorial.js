import React, { useState } from 'react';
import { createTutorial } from '../../actions/tutorials';
import CreateEditTutorial from '../../components/CreateEditTutorial/CreateEditTutorial';

function CreateTutorial() {
    const [title, setTitle] = useState("")
    const [allStages, setAllStages] = useState([])

  return (
    <CreateEditTutorial title={title} setTitle={setTitle} allStages={allStages} setAllStages={setAllStages} dispatchFunc={createTutorial} />
  )
}

export default CreateTutorial