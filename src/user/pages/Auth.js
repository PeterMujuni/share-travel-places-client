import React, { useContext, useState } from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUploader from "../../shared/components/FormElements/ImageUploader";
import {
	VALIDATOR_EMAIL,
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";

import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./Auth.css";

const Auth = () => {
	const auth = useContext(AuthContext);
	const [isLogin, setIsLogin] = useState(true);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

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

	const authSubmitHandler = async (e) => {
		e.preventDefault();
		console.log(formState.inputs);
		console.log(error);

		if (isLogin) {
			try {
				const responseData = await sendRequest(
					"http://localhost:5000/api/users/login",
					"POST",
					{ "Content-Type": "application/json" },
					JSON.stringify({
						email: formState.inputs.email.value,
						password: formState.inputs.password.value,
					})
				);
				auth.login(responseData.user.id);
			} catch (err) {
				console.log(error);
			}
		} else {
			try {
				const formData = new FormData();
				formData.append("email", formState.inputs.email.value);
				formData.append("name", formState.inputs.name.value);
				formData.append("password", formState.inputs.password.value);
				formData.append("image", formState.inputs.image.value);

				const responseData = await sendRequest(
					"http://localhost:5000/api/users/signup",
					"POST",
					{
						
					},
					formData
				);
				auth.login(responseData.user.id);
			} catch (error) {}
		}
	};

	const switchModeHandler = () => {
		if (!isLogin) {
			setFormData(
				{
					...formState.inputs,
					name: undefined,
					image: undefined,
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
					image: {
						value: null,
						isValid: false,
					},
				},
				false
			);
		}
		setIsLogin((prevMode) => !prevMode);
	};

	return (
		<React.Fragment>
			<ErrorModal
				error={error}
				onClear={clearError}
			/>
			<Card className="authentication">
				{isLoading && <LoadingSpinner asOverlay />}
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
					{!isLogin && (
						<ImageUploader
							id="image"
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
		</React.Fragment>
	);
};

export default Auth;
