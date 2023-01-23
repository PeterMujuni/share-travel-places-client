import React, { useEffect, useState } from "react";
import UserList from "../components/UserList/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Users = () => {
	const { isLoading, error, clearError, sendRequest } = useHttpClient();
	const [loadedUsers, setLoadedUsers] = useState();

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const responseData = await sendRequest(
					"http://localhost:5000/api/users"
				);

				setLoadedUsers(responseData.users);
			} catch (error) {}
		};
		fetchUsers();
	}, [sendRequest]);

	return (
		<React.Fragment>
			<ErrorModal
				error={error}
				onClear={clearError}
			/>
			{isLoading && (
				<div className="center">
					<LoadingSpinner />
				</div>
			)}
			{!isLoading && loadedUsers && <UserList users={loadedUsers} />}
		</React.Fragment>
	);
};

export default Users;
