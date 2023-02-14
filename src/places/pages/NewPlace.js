import React, { useCallback, useReducer, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUploader from "../../shared/components/FormElements/ImageUploader";
import {
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./PlaceForm.css";

const NewPlace = () => {
	const auth = useContext(AuthContext);
	const navigate = useNavigate();
	const { error, isLoading, sendRequest, clearError } = useHttpClient();
	const [formState, inputHandler] = useForm(
		{
			title: {
				value: "",
				isValid: false,
			},
			description: {
				value: "",
				isValid: false,
			},
			address: {
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

	const placeSubmitHandler = async (e) => {
		e.preventDefault();
		try {
			const formData = new FormData()
			formData.append("title", formState.inputs.title.value);
			formData.append("description", formState.inputs.description.value);
			formData.append("address", formState.inputs.address.value);
			formData.append("image", formState.inputs.image.value)

			await sendRequest(
				process.env.REACT_APP_BACKEND_URL+"/places",
				"POST",
				{ Authorization: "Bearer " + auth.token },
				formData
			);
			// Redirect to another page
			navigate("/");
		} catch (error) {}
	};

	return (
		<React.Fragment>
			<ErrorModal
				error={error}
				onClear={clearError}
			/>
			<form
				className="place-form"
				onSubmit={placeSubmitHandler}
			>
				{isLoading && <LoadingSpinner asOverlay />}
				<Input
					id="title"
					type="text"
					label="Title"
					element="input"
					validators={[VALIDATOR_REQUIRE()]}
					errorText="Please enter a valid title."
					onInput={inputHandler}
				/>
				<Input
					id="description"
					label="Description"
					element="textarea"
					validators={[VALIDATOR_MINLENGTH(5)]}
					errorText="Please enter a valid description (at least 5 characters)."
					onInput={inputHandler}
				/>
				<Input
					id="address"
					label="Address"
					element="input"
					validators={[VALIDATOR_REQUIRE()]}
					errorText="Please enter a valid address."
					onInput={inputHandler}
				/>
				<ImageUploader
					id="image"
					onInput={inputHandler}
					errorText="Please provide an image"
				/>
				<Button
					type="submit"
					disabled={!formState.isValid}
				>
					ADD PLACE
				</Button>
			</form>
		</React.Fragment>
	);
};

export default NewPlace;
