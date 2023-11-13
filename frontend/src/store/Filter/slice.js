import { createSlice } from '@reduxjs/toolkit';

export const filtersName = 'filters';

const initialState = {
	sorting: 'price',
	direct: '',
};

const filtersSlice = createSlice({
	name: filtersName,
	initialState,
	reducers: {
		setMode: (state, action) => ({
			...state,
			sorting: action.payload,
		}),
		setDirect: (state, action) => ({
			...state,
			direct: action.payload,
		}),
		setFilters: (state, action) => ({
			...state,
			sorting: action.payload.sorting,
			direct: action.payload.direct,
		}),
	},
});

export const { setMode, setDirect, setFilters } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
