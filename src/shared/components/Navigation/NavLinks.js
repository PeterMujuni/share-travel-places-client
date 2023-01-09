import React from 'react'
import './NavLinks.css'
import { NavLink } from 'react-router-dom'

const NavLinks = (props) => {
  return (
		<ul className="nav-links">
			<li>
				<NavLink to="/">ALL USERS</NavLink>
			</li>
			<li>
				<NavLink to="/u1/places">MY PLACES</NavLink>
			</li>
			<li>
				<NavLink to="/places/new">ADD PLACES</NavLink>
			</li>
			<li>
				<NavLink to="/auth" disabled={true}>AUTHENTICATE</NavLink>
			</li>
		</ul>
  );
}

export default NavLinks