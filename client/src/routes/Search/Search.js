import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getUsersBySearch } from "../../actions/users";
import { useDispatch } from "react-redux";
import SearchUsers from "../../components/SearchUsers/SearchUsers";
import "./search.css";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function Search() {
	const query = useQuery();
	const search = query.get("search");
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUsersBySearch(search));
	}, [search]);

	return (
		<>
			<section className='search'>
				<SearchUsers />
			</section>
		</>
	);
}

export default Search;
