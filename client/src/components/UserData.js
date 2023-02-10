import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUser } from '../actions/users';
import '../sass/css/user-data.css';
import userImg from '../img/user.png';

function UserData({username}) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users);
    const currentUser = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        dispatch(getUser(username));
    }, [dispatch])
  return (
    <>
        {user === null ? (
          <div className='no-user'>Nie znaleziono danego użytkownika</div>
        ) : (
          <div className="user-data">
            <div className="user-data__img-side">
              <img src={userImg} className='user-data__img' />
            </div>
            <div className="user-data__main-side">
              <p className='user-data__info'>{user.name}</p>
              <p className='user-data__info'>Posty: {user.posts}</p>
              <p className='user-data__info'>{user.username}</p>
              {(currentUser.result.username === user.username) && (
                <button className='user-data__edit-profile'>Edytuj profil</button>
              )}
            </div>
          </div>
        )}
    </>
  )
}

export default UserData