/* eslint-disable no-param-reassign */
// import produce from 'immer';
import { createSlice } from '@reduxjs/toolkit';
import { TRAVEL_LIST_DATA } from '../../utils/constants';

export const travelsName = 'travels';

const travels = JSON.parse(localStorage.getItem('travels')) || TRAVEL_LIST_DATA;
const events = JSON.parse(localStorage.getItem('events'));
console.log('events:', events);
console.log('travels:', travels);

const initialState = {
	travels: travels,
};

console.log('initialState:', initialState);
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

		// updateTravel: (state, action) => {
		// 	state.travels = state.travels.map((travel) => {
		// 		if (travel.id === itemId) {
		// 			return produce(state, (draft) => {
		//         draft.propertyName = action.payload
		//       })
		// 		}
		// 		return travel;
		// 	});
		// 	localStorage.setItem('travels', JSON.stringify(state.travels));
		// 	return {
		// 		...state,
		// 		travels: state.travels,
		// 	};
		// },
	},
});

export const { setTravels, addTravel, editTravel, removeTravel } =
	travelsSlice.actions;
export const travelsReducer = travelsSlice.reducer;
