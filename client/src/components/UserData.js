import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { getUser } from '../actions/users';
import '../sass/css/user-data.css';
import userImg from '../img/user.png';

function UserData({username}) {
    const dispatch = useDispatch();
    const { users } = useSelector(state => state.users);
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem('user'));
    console.log(users)

    useEffect(() => {
        dispatch(getUser(username));
    }, [dispatch])
  return (
    <>
        {users === null ? (
          <div className='no-user'>Nie znaleziono danego użytkownika</div>
        ) : (
          <div className="user-data">
            <div className="user-data__img-side">
              <img src={userImg} className='user-data__img' />
            </div>
            <div className="user-data__main-side">
              <p className='user-data__info'>{users.name}</p>
              <p className='user-data__info'>Posty: {users.posts}</p>
              <p className='user-data__info'>{users.username}</p>
              {(currentUser.result.username === users.username) && (
                <button className='user-data__edit-profile' onClick={() => navigate("/edit-account")}>Edytuj profil</button>
              )}
            </div>
          </div>
        )}
    </>
  )
}

export default UserData