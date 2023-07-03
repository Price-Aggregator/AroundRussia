import { createSlice } from '@reduxjs/toolkit';

export const loaderName = 'loader'

const initialState = {
	isLoading: false,
};

const loaderSlice = createSlice({
	name: loaderName,
	initialState,
	reducers: {
		showLoader: (state) => ({
			...state,
			isLoading: true,
		}),
		hideLoader: (state) => ({
			...state,
			isLoading: false,
		}),
	},
});

export const { showLoader, hideLoader } = loaderSlice.actions;
export const loaderReducer = loaderSlice.reducer;
