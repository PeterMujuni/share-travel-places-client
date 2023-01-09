import React from "react";
import UserList from "../components/UserList/UsersList";

const Users = () => {
	const USERS = [
		{
			id: "u1",
			name: "Mark Sharts",
			image: "https://i.pravatar.cc/300",
			places: 3,
		},
	];
	return <UserList users={USERS} />;
};

export default Users;
