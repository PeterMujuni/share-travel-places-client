import "./App.css";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace"
import UpdatePlace from "./places/pages/UpdatePlace";
import UserPlaces from "./places/pages/UserPlaces";
import Auth from "./user/pages/Auth";
import ErrorPage from "./error-page";
import RootLayout from "./layouts/RootLayout";

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
	return <RouterProvider router={router} />;
}

export default App;
