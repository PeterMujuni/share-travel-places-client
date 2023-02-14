import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import Card from "../../shared/components/UIElements/Card";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import {AuthContext} from '../../shared/context/auth-context'
import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import "./PlaceForm.css";

const UpdatePlace = () => {
	const placeId = useParams().pid;
	const navigation = useNavigate()
	const auth = useContext(AuthContext)
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [loadedPlace, setLoadedPlace] = useState();

	const [formState, inputHandler, setFormData] = useForm({
		title: {
			value: "",
			isValid: false,
		},
		description: {
			value: "",
			isValid: false,
		},
	});

	useEffect(() => {
		const fetchPlace = async () => {
			try {
				const responseData = await sendRequest(
					process.env.REACT_APP_BACKEND_URL+`/places/${placeId}`
				);
				setLoadedPlace(responseData.place);
				setFormData({
					title: {
						value: responseData.title,
						isValid: true,
					},
					description: {
						value: responseData.description,
						isValid: true,
					},
				});
			} catch (error) {}
		};

		fetchPlace();
	}, [sendRequest, placeId, setFormData]);

	const placeUpdateSubmitHandler = async (e) => {
		e.preventDefault();
		try {
			await sendRequest(
				process.env.REACT_APP_BACKEND_URL+`/places/${placeId}`,
				"PATCH",
				{
					"Content-Type": "application/json",
					Authorization: "Bearer " + auth.token,
				},
				JSON.stringify({
					title: formState.inputs.title.value,
					description: formState.inputs.description.value,
				})
			);
			navigation("/" + auth.userId + "/places");
		} catch (error) {}
		console.log("loadedPlace id", loadedPlace.id);
	};

	if (!loadedPlace && !error) {
		return (
			<div className="center">
				<Card>
					<h2>Could not find place</h2>
				</Card>
			</div>
		);
	}

	return (
		<React.Fragment>
			<ErrorModal
				error={error}
				onClear={clearError}
			/>
			{isLoading && <LoadingSpinner />}
			{!isLoading && loadedPlace && (
				<form
					className="place-form"
					onSubmit={placeUpdateSubmitHandler}
				>
					<Input
						id="title"
						element="input"
						type="text"
						labal="Title"
						validators={[VALIDATOR_REQUIRE()]}
						errorText="Please enter a valid title."
						onInput={inputHandler}
						initialValue={loadedPlace.title}
						initialValid={true}
					/>
					<Input
						id="description"
						element="textarea"
						labal="Description"
						validators={[VALIDATOR_MINLENGTH(5)]}
						errorText="Please enter a description (min 5 character length)."
						onInput={inputHandler}
						initialValue={loadedPlace.description}
						initialValid={true}
					/>
					<Button
						type="submit"
						disabled={!formState.isValid}
					>
						UPDATE PLACE
					</Button>
				</form>
			)}
		</React.Fragment>
	);
};

export default UpdatePlace;
