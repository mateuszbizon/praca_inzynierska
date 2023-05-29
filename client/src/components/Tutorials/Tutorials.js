import React, { useState } from 'react';
import { useSelector } from "react-redux";
import "./tutorials.css";
import Tutorial from '../Tutorial/Tutorial';
import DeleteConfirm from '../DeleteConfirm/DeleteConfirm';

function tutorials(props) {
  const { tutorials } = useSelector(state => state.tutorials);
  const [currentId, setCurrentId] = useState(null);

  return (
    <>
      {/* <DeleteConfirm
				shadowActive={props.shadowActive}
				setShadowActive={props.setShadowActive}
				currentId={currentId}
				setCurrentId={setCurrentId}
			/> */}
      <div className='tutorials'>
        {tutorials.map((tutorial, index) => (
          <Tutorial key={index} tutorial={tutorial} setShadowActive={props.setShadowActive} setCurrentId={setCurrentId}/>
        ))}
      </div>
    </>
  )
}

export default tutorials