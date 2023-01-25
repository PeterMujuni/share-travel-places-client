import React from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "../shared/components/Navigation/MainNavigation";

const RootLayout = () => {
	return (
		<React.Fragment>
			<MainNavigation />
			<main>
				<Outlet />
			</main>
		</React.Fragment>
	);
};

export default RootLayout;
