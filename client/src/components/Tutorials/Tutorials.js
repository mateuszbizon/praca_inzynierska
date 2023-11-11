import React, { useState } from 'react';
import { useSelector } from "react-redux";
import "./tutorials.css";
import Tutorial from '../Tutorial/Tutorial';
import DeleteConfirm from '../DeleteConfirm/DeleteConfirm';
import { CircularProgress } from "@mui/material";
import { deleteTutorialById } from '../../actions/tutorials';
import * as deleteConfirmMessages from "../../constants/deleteConfirmMessages";

function tutorials(props) {
  const { tutorials, isLoading } = useSelector(state => state.tutorials);
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
        message={deleteConfirmMessages.deleteTutorialMessage}
			/>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div className='tutorials'>
          {tutorials.map((tutorial, index) => (
            <Tutorial key={index} tutorial={tutorial} setShadowActive={props.setShadowActive} setCurrentId={setCurrentId}/>
          ))}
        </div>
      )}
    </>
  )
}

export default tutorials