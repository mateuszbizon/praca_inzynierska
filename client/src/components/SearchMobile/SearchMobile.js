import React, {useState} from 'react';
import './searchMobile.css';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

function SearchMobile() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('')

  function searchUsers(){
    navigate(`/search?search=${search}`)
  }

  function searchUsersByKey(e){
    if(e.keyCode === 13){
      searchUsers();
    }
  }

  return (
    <>
        <div className="search-mobile">
            <input type="text" placeholder='Szukaj...' onKeyDown={searchUsersByKey} value={search} onChange={e => setSearch(e.target.value)} />
            <button onClick={searchUsers}><SearchIcon /></button>
        </div>
    </>
  )
}

export default SearchMobile