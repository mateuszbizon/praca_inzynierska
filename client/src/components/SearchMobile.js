import React from 'react';
import '../sass/css/searchMobile.css';
import SearchIcon from '@mui/icons-material/Search';

function SearchMobile() {
  return (
    <>
        <div className="search-mobile">
            <input type="text" placeholder='Szukaj...' />
            <button><SearchIcon /></button>
        </div>
    </>
  )
}

export default SearchMobile