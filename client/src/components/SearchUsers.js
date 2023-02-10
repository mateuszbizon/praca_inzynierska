import React from 'react';
import { useSelector } from 'react-redux';
import SearchUser from './SearchUser';
import '../sass/css/searchUsers.css';

function SearchUsers() {
    const users = useSelector(state => state.users);
    console.log(users);
  return (
    !users.length ? (
        <div>Nie znaleziono użytkownika</div>
    ) : (
        <div className='search-users'>
            {users.map(user => (
                <>
                    <SearchUser user={user} />
                </>
            ))}
        </div>
    )
  )
}

export default SearchUsers