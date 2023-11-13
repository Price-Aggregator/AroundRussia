import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DiaryTravelList from '../components/DiaryTravelList/DiaryTravelList';
// import { TRAVEL_LIST_DATA } from '../utils/constants';
// import { setTravels } from '../store/Travels/slice';
import { getUserToken } from '../store/User/selectors';
import { fetchTravels } from '../store/Travels/slice';

function DiaryPage() {
  const dispatch = useDispatch()
  // const hardTravels = TRAVEL_LIST_DATA
  // dispatch(setTravels(hardTravels))

  const token = useSelector(getUserToken)
  dispatch(fetchTravels(token))

  return <DiaryTravelList />;
}

export default DiaryPage;
