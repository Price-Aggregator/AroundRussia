import React from 'react';
import { useParams } from 'react-router-dom';
import DiaryTravel from '../components/DiaryTravel/DiaryTravel';
import { TRAVEL_LIST_DATA } from '../utils/constants';

function DiaryTravelPage() {
	const { travelId } = useParams();

	const userTravel = TRAVEL_LIST_DATA.find((card) => card.id === travelId);

	return <DiaryTravel card={userTravel} />;
}

export default DiaryTravelPage;
