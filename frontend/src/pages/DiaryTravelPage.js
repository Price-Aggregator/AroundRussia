import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DiaryTravel from '../components/DiaryTravel/DiaryTravel';
// import { TRAVEL_LIST_DATA } from '../utils/constants';
import getTravels from '../store/Travels/selectors';
// import TravelPlan from '../components/TravelPlan/TravelPlan';

function DiaryTravelPage() {
  const { travelId } = useParams();
  const travels = useSelector(getTravels);

  const userTravel = travels.find((card) => card.id.toString() === travelId);

  return (
    <>
      {userTravel && <DiaryTravel card={userTravel} />}
      {/* <TravelPlan travelPlan={TRAVEL_DAIRY} /> */}
    </>
  );
}

export default DiaryTravelPage;
