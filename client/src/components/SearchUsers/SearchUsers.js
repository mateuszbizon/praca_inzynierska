import React from "react";
import { useSelector } from "react-redux";
import SearchUser from "../SearchUser/SearchUser";
import "./searchUsers.css";

function SearchUsers() {
	const { users } = useSelector(state => state.users);

	return !users.length ? (
		<div>Nie znaleziono użytkownika</div>
	) : (
		<div className='search-users'>
			{users.map((user, index) => (
				<>
					<SearchUser key={index} user={user} />
				</>
			))}
		</div>
	);
}

export default SearchUsers;
