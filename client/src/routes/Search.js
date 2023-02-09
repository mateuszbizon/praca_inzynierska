import React from 'react';
import { useLocation } from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

function Search() {
    const query = useQuery();
    const search = query.get('search');
    console.log(search)

  return (
    <div>Search</div>
  )
}

export default Search