import React from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'EMpire state building',
        description: 'One of the most famous buildings in the world',
        imageUrl: "https://via.placeholder.com/150",
        address: "20 W 34th St., New York, NY 10001, United States",
        location: {
            lat: 40.7484405,
            lng: -73.9878531,
        },
        creator: "u1"
    },
    {
        id: 'p2',
        title: 'EMpire state building',
        description: 'One of the most famous buildings in the world',
        imageUrl: "https://via.placeholder.com/150",
        address: "20 W 34th St., New York, NY 10001, United States",
        location: {
            lat: "40.7484405",
            lng: "-73.9878531",
        },
        creator: "u2"
    },

]
const UserPlaces = () => {
    const {uid} = useParams();
    const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === uid);
	return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
