import { createSlice } from '@reduxjs/toolkit';

export const travelsName = 'travels';

const initialState = {
	travels: [],
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
			travels: [...state.travels, action.payload],
		}),
	},
});

export const { setTravels, addTravel } = travelsSlice.actions;
export const travelsReducer = travelsSlice.reducer;
