import { useState, useCallback } from "react";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
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

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path="/"
			element={<RootLayout />}
			errorElement={<ErrorPage />}
		>
			<Route
				path="/"
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
				element={<Auth />}
			/>
		</Route>
	)
);

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	const login = useCallback(() => { 
		setIsLoggedIn(true)
	 }, [])

	const logout = useCallback(() => { 
		setIsLoggedIn(false)
	 }, [])

	return (
		<AuthContext.Provider value={{isLoggedIn: isLoggedIn, login: login, logout: logout}}>
			<RouterProvider router={router} />;
		</AuthContext.Provider>
	);
}

export default App;
