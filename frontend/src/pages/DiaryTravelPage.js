import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DiaryTravel from '../components/DiaryTravel/DiaryTravel';
// import { TRAVEL_LIST_DATA } from '../utils/constants';
import getTravels from '../store/Travels/selectors';
import { fetchTravels } from '../store/Travels/slice';
import { getUserToken } from '../store/User/selectors';
// import TravelPlan from '../components/TravelPlan/TravelPlan';

function DiaryTravelPage() {
  const dispatch = useDispatch()
  const { travelId } = useParams();
  const travels = useSelector(getTravels);
  const token = useSelector(getUserToken)

  const userTravel = travels.find((card) => card.id.toString() === travelId);

  useEffect(() => {
    dispatch(fetchTravels(token))
  }, [])

  return (
    <>
      {userTravel && <DiaryTravel card={userTravel} />}
      {/* <TravelPlan travelPlan={TRAVEL_DAIRY} /> */}
    </>
  );
}

export default DiaryTravelPage;
