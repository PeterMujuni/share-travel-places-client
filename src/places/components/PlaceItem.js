import React, { useState, useContext } from "react";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import { AuthContext } from "../../shared/context/auth-context";
import "./PlaceItem.css";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const PlaceItem = (props) => {
	const auth = useContext(AuthContext);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [showMap, setShowMap] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);

	const openMapHandler = () => {
		setShowMap(true);
	};
	const closeMapHandler = () => {
		setShowMap(false);
	};

	const showDeleteWarningHandler = () => {
		setShowConfirmModal(true);
	};

	const cancelDeleteHandler = () => {
		setShowConfirmModal(false);
	};

	const confirmDeleteHandler = async () => {
		setShowConfirmModal(false);
		try {
			await sendRequest(
				`http://localhost:5000/api/places/${props.id}`,
				"DELETE",
				{ Authorization: "Bearer " + auth.token }
			);
			props.onDelete(props.id);
		} catch (error) {}
	};

	return (
		<React.Fragment>
			<ErrorModal
				error={error}
				onClear={clearError}
			/>
			<Modal
				show={showMap}
				onCancel={closeMapHandler}
				header={props.address}
				contentClase="place-item__modal-content"
				footerClass="place-item__modal-actions"
				footer={<Button onClick={closeMapHandler}>Close</Button>}
			>
				<div className="map-container">
					<Map
						center={props.coordinates}
						zoom={16}
					/>
				</div>
			</Modal>

			<Modal
				show={showConfirmModal}
				onCancel={cancelDeleteHandler}
				header="Are you sure?"
				footerClass="place-item__modal-actions delete-buttons"
				footer={
					<React.Fragment>
						<Button
							inverse
							onClick={cancelDeleteHandler}
						>
							Cancel
						</Button>
						<Button
							danger
							onClick={confirmDeleteHandler}
						>
							Delete
						</Button>
					</React.Fragment>
				}
			>
				<p>Do you want to proceed and delete this place?</p>
			</Modal>
			{isLoading && <LoadingSpinner asOverlay />}
			<li className="place-item">
				<Card className="place-item__content">
					<div className="place-item__image">
						<img
							src={`http://localhost:5000/${props.image}`}
							alt={props.title}
						/>
					</div>
					<div className="place-item__info">
						<h2>{props.title}</h2>
						<h3>{props.address}</h3>
						<p>{props.description}</p>
					</div>
					<div className="place-item__actions">
						<Button
							inverse
							onClick={openMapHandler}
						>
							VIEW ON MAP
						</Button>
						{auth.userId === props.creatorId && (
							<React.Fragment>
								<Button to={`/places/${props.id}`}>EDIT</Button>
								<Button
									danger
									onClick={showDeleteWarningHandler}
								>
									DELETE
								</Button>
							</React.Fragment>
						)}
					</div>
				</Card>
			</li>
		</React.Fragment>
	);
};

export default PlaceItem;
