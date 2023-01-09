import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import "./NewPlace.css";

const NewPlace = () => {
	return (
		<form className="place-form">
			<Input
				type="text"
				label="TItle"
				element="input"
                validators={[VALIDATOR_REQUIRE()]}
				errorText="Please enter a valid title"
			/>
		</form>
	);
};

export default NewPlace;
