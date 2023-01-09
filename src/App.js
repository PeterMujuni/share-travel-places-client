import "./App.css";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces";
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
		</Route>
	)
);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
