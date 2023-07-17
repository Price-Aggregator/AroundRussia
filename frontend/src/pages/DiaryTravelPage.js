import React from 'react';
import { useParams } from 'react-router-dom';
import DiaryTravel from '../components/DiaryTravel/DiaryTravel';
import { TRAVEL_LIST_DATA } from '../utils/constants';
// import TravelPlan from '../components/TravelPlan/TravelPlan';

function DiaryTravelPage() {
  const { travelId } = useParams();

  const userTravel = TRAVEL_LIST_DATA.find((card) => card.id === travelId);

  return <>
    <DiaryTravel card={userTravel} />
    {/* <TravelPlan travelPlan={TRAVEL_DAIRY} /> */}
  </>
}

export default DiaryTravelPage;
