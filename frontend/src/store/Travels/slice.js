/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { TRAVEL_LIST_DATA } from '../../utils/constants';

export const travelsName = 'travels';

const initialState = {
	travels: JSON.parse(localStorage.getItem('travels')) || TRAVEL_LIST_DATA,
};

const travelsSlice = createSlice({
	name: travelsName,
	initialState,
	reducers: {
		setTravels: (state, action) => ({
			...state,
			travels: action.payload,
		}),
		addTravel: (state, action) => ({
			...state,
			travels: [action.payload, ...state.travels],
		}),
		editTravel: (state, action) => {
			const { id, data } = action.payload;
			state.travels = state.travels.map((travel) =>
				travel.id === id ? { ...travel, ...data } : travel
			);
		},
		removeTravel: (state, action) => {
			const travelId = action.payload;
			state.travels = state.travels.filter((travel) => travel.id !== travelId);
		},
	},
});

export const { setTravels, addTravel, editTravel, removeTravel } =
	travelsSlice.actions;
export const travelsReducer = travelsSlice.reducer;
