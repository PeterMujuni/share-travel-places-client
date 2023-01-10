import React from "react";
import { useForm } from "../../shared/hooks/form-hook";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import {
	VALIDATOR_EMAIL,
	VALIDATOR_MIN,
	VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import "./Auth.css";

const Auth = () => {
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
	};
	return (
		<Card className="authentication">
			<h2>Login Required</h2>
			<hr />
			<form onSubmit={authSubmitHandler}>
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
					Login
				</Button>
			</form>
		</Card>
	);
};

export default Auth;
