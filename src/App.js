import React, { useState, useCallback, useEffect, Suspense } from "react";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
	Navigate,
} from "react-router-dom";
import Users from "./user/pages/Users";
// import NewPlace from "./places/pages/NewPlace";
// import UpdatePlace from "./places/pages/UpdatePlace";
// import UserPlaces from "./places/pages/UserPlaces";
// import Auth from "./user/pages/Auth";
import ErrorPage from "./error-page";
import RootLayout from "./layouts/RootLayout";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import "./App.css";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";

const NewPlace = React.lazy(() => import("./places/pages/NewPlace"));
const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces"));
const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace"));
const Auth = React.lazy(() => import("./user/pages/Auth"));

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
			<Suspense fallback={<div className="center"><LoadingSpinner /></div>}>
				<RouterProvider router={routes} />;
			</Suspense>
		</AuthContext.Provider>
	);
}

export default App;
