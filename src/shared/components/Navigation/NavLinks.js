import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import Button from "../FormElements/Button";
import "./NavLinks.css";

const NavLinks = (props) => {
	const auth = useContext(AuthContext);

	return (
		<ul className="nav-links">
			<li>
				<NavLink to="/">ALL USERS</NavLink>
			</li>
			{auth.isLoggedIn && (
				<li>
					<NavLink to="/u1/places">MY PLACES</NavLink>
				</li>
			)}
			{auth.isLoggedIn && (
				<li>
					<NavLink to="/places/new">ADD PLACES</NavLink>
				</li>
			)}
			{!auth.isLoggedIn ? (
				<li>
					<NavLink
						to="/auth"
						disabled={true}
					>
						AUTHENTICATE
					</NavLink>
				</li>
			) : (
				<li>
					<Button onClick={auth.logout}>
						LOGOUT
					</Button>
				</li>
			)}
		</ul>
	);
};

export default NavLinks;
