import React, { useRef } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import "./SideDrawer.css";

const SideDrawer = (props) => {
	const nodeRef = useRef();

	const drawer = (
		<CSSTransition
			nodeRef={nodeRef}
			in={props.show}
			timeout={200}
			classNames="slide-in-left"
			mountOnEnter
			unmountOnExit
		>
			<aside
				className="side-drawer"
                onClick={props.onClick}
				ref={nodeRef}
			>
				{props.children}
			</aside>
		</CSSTransition>
	);
	return createPortal(drawer, document.getElementById("drawer-hook"));
};

export default SideDrawer;
