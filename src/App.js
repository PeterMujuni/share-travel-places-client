import React, { useState, useCallback } from "react";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
	Navigate,
} from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import UpdatePlace from "./places/pages/UpdatePlace";
import UserPlaces from "./places/pages/UserPlaces";
import Auth from "./user/pages/Auth";
import ErrorPage from "./error-page";
import RootLayout from "./layouts/RootLayout";
import { AuthContext } from "./shared/context/auth-context";
import "./App.css";

// const router = createBrowserRouter(
// 	createRoutesFromElements(
// 		<Route
// 			path="/"
// 			element={<RootLayout />}
// 			errorElement={<ErrorPage />}
// 		>
// 			<Route
// 				path="/"
// 				element={<Users />}
// 			/>
// 			<Route
// 				path="/places/new"
// 				element={<NewPlace />}
// 			/>
// 			<Route
// 				path="/:uid/places"
// 				element={<UserPlaces />}
// 			/>
// 			<Route
// 				path="/places/:pid"
// 				element={<UpdatePlace />}
// 			/>
// 			<Route
// 				path="/auth"
// 				element={<Auth />}
// 			/>
// 		</Route>
// 	)
// );

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userId, setUserId] = useState();

	const login = useCallback((uid) => {
		setIsLoggedIn(true);
		setUserId(uid);
	}, []);

	const logout = useCallback(() => {
		setIsLoggedIn(false);
		setUserId(null)
	}, []);

	let routes;

	if (isLoggedIn) {
		routes = createBrowserRouter(
			createRoutesFromElements(
				<Route
					element={<RootLayout />}
					errorElement={<ErrorPage />}
				>
					<Route
						index
						element={<Users />}
					/>
					<Route
						path="/places/new"
						element={<NewPlace />}
					/>
					<Route
						path="/:uid/places"
						element={<UserPlaces />}
					/>
					<Route
						path="/places/:pid"
						element={<UpdatePlace />}
					/>
					<Route
						path="/auth"
						element={!isLoggedIn ? <Auth /> : <Navigate to="/" />}
					/>
				</Route>
			)
		);
	} else {
		routes = createBrowserRouter(
			createRoutesFromElements(
				<Route
					element={<RootLayout />}
					errorElement={<ErrorPage />}
				>
					<Route
						index
						element={<Users />}
					/>

					<Route
						path="/:uid/places"
						element={<UserPlaces />}
					/>

					<Route
						path="/auth"
						element={<Auth />}
					/>
					<Route
						path="*"
						element={<Navigate to="/auth" />}
					/>
				</Route>
			)
		);
	}

	return (
		<AuthContext.Provider
			value={{ isLoggedIn: isLoggedIn, userId: userId, login: login, logout: logout }}
		>
			<RouterProvider router={routes} />;
		</AuthContext.Provider>
	);
}

export default App;
