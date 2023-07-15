import { createSlice } from '@reduxjs/toolkit';

export const searchFormName = 'searchForm';

const initialState = {
	from: '',
	to: '',
	when: '',
	whenReturn: '',
	sortingMode: 'price',
  isDirect: '',
};

const searchFormSlice = createSlice({
	name: searchFormName,
	initialState,
	reducers: {
		setFrom: (state, action) => ({
			...state,
			from: action.payload,
		}),
		setTo: (state, action) => ({
			...state,
			to: action.payload,
		}),
		setWhen: (state, action) => ({
			...state,
			when: action.payload,
		}),
		setWhenReturn: (state, action) => ({
			...state,
			whenReturn: action.payload,
		}),
		setSortingMode: (state, action) => ({
			...state,
			sortingMode: action.payload,
		}),
		setIsDirect: (state, action) => ({
			...state,
			isDirect: action.payload,
		}),
    setForm: (state, action) => ({
			...state,
			from: action.payload.from,
			to: action.payload.to,
			when: action.payload.when,
			whenReturn: action.payload.whenReturn,
			sortingMode: action.payload.sortingMode,
      isDirect: action.payload.isDirect,
    }),
	},
});

export const {
	setTo,
	setFrom,
	setWhenReturn,
	setWhen,
	setForm,
	setSortingMode,
  setIsDirect,
} = searchFormSlice.actions;
export const searchFormReducer = searchFormSlice.reducer;
