import React, { useState } from 'react';
import { useSelector } from "react-redux";
import "./tutorials.css";
import Tutorial from '../Tutorial/Tutorial';
import DeleteConfirm from '../DeleteConfirm/DeleteConfirm';
import { deleteTutorialById } from '../../actions/tutorials';

function tutorials(props) {
  const { tutorials } = useSelector(state => state.tutorials);
  const { isLoading } = useSelector(state => state.loaders);
  const [currentId, setCurrentId] = useState(null);

  if (!tutorials.length && !isLoading) return (
    <div className='no-tutorials'>
      Brak poradników
    </div>
  );

  return (
    <>
      <DeleteConfirm
				shadowActive={props.shadowActive}
				setShadowActive={props.setShadowActive}
				currentId={currentId}
				setCurrentId={setCurrentId}
        deleteFunc={deleteTutorialById}
			/>
      <div className='tutorials'>
        {tutorials.map((tutorial, index) => (
          <Tutorial key={index} tutorial={tutorial} setShadowActive={props.setShadowActive} setCurrentId={setCurrentId}/>
        ))}
      </div>
    </>
  )
}

export default tutorials