import React, { useState, useCallback, useEffect } from "react";
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
import { useAuth } from "./shared/hooks/auth-hook";
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
	const { token, login, logout, userId } = useAuth();

	let routes;

	if (token) {
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
						element={!token ? <Auth /> : <Navigate to="/" />}
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
			value={{
				isLoggedIn: !!token,
				token,
				userId: userId,
				login: login,
				logout: logout,
			}}
		>
			<RouterProvider router={routes} />;
		</AuthContext.Provider>
	);
}

export default App;
