import React, { useContext, useState } from "react";
import { useForm } from "../../shared/hooks/form-hook";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";
import {
	VALIDATOR_EMAIL,
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import "./Auth.css";

const Auth = () => {
	const auth = useContext(AuthContext)

	const [isLogin, setIsLogin] = useState(true);
	const [formState, inputHandler, setFormData] = useForm(
		{
			email: {
				value: "",
				isValid: false,
			},
			password: {
				value: "",
				isValid: false,
			},
		},
		false
	);

	const authSubmitHandler = (e) => {
		e.preventDefault();
		console.log(formState.inputs);
		auth.login()
	};

	const switchModeHandler = () => {
		if (!isLogin) {
			setFormData(
				{
					...formState.inputs,
					name: undefined,
				},
				formState.inputs.email.isValid &&
					formState.inputs.password.isValid
			);
		} else {
			setFormData(
				{
					...formState.inputs,
					name: {
						value: "",
						isValid: false,
					},
				},
				false
			);
		}
		setIsLogin((prevMode) => !prevMode);
	};

	return (
		<Card className="authentication">
			<h2>Login Required</h2>
			<hr />
			<form onSubmit={authSubmitHandler}>
				{!isLogin && (
					<Input
						element="input"
						id="name"
						type="text"
						label="Your name"
						validators={[VALIDATOR_REQUIRE()]}
						errorText="Please enter a name."
						onInput={inputHandler}
					/>
				)}
				<Input
					id="email"
					type="email"
					label="Email"
					element="input"
					validators={[VALIDATOR_EMAIL()]}
					errorText="Please enter a valid email."
					onInput={inputHandler}
				/>
				<Input
					id="password"
					type="password"
					label="Password"
					element="input"
					validators={[VALIDATOR_MINLENGTH(6)]}
					errorText="Please enter a valid password."
					onInput={inputHandler}
				/>
				<Button
					type="submit"
					disabled={!formState.isValid}
				>
					{isLogin ? "LOGIN" : "SIGNUP"}
				</Button>
			</form>
			<Button
				inverse
				onClick={switchModeHandler}
			>
				SWITCH TO {isLogin ? "SIGNUP" : "LOGIN"}
			</Button>
		</Card>
	);
};

export default Auth;
