import React from 'react';
import '../sass/css/searchUser.css';
import userImg from '../img/user.png';
import { useNavigate } from 'react-router-dom';

function SearchUser({user}) {
    const navigate = useNavigate();
  return (
    <div className='search-user' onClick={() => navigate(`/profile/${user.username}`)}>
        <div className="search-user__img-side">
            <img src={user.selectedFile === "" ? userImg : user.selectedFile} alt="" className='search-user__img' />
        </div>
        <div className="search-user__main-side">
            <div className="search-user__info-box">
                <p className="search-user__info">{user.name}</p>
            </div>
            <div className="search-user__info-box">
                <p className="search-user__info">{user.username}</p>
            </div>
            <div className="search-user__info-box">
                <p className="search-user__info">Posty: {user.posts}</p>
            </div>
        </div>
    </div>
  )
}

export default SearchUser