import React, { useState } from 'react';
import { createTutorial } from '../../actions/tutorials';
import CreateEditTutorial from '../../components/CreateEditTutorial/CreateEditTutorial';

function CreateTutorial() {
  return (
    <CreateEditTutorial isEditing={false} dispatchFunc={createTutorial} />
  )
}

export default CreateTutorial