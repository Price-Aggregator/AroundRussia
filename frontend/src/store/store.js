import { configureStore } from '@reduxjs/toolkit';
import { paginationReducer } from './Pagination/slice';
import { ticketsReducer } from './Tickets/slice';
import { calendarReducer } from './Calendar/slice';
import { searchFormReducer } from './SearchForm/slice';
import { citiesReducer } from './Cities/slice';
import { filtersReducer } from './Filter/slice';

const store = configureStore({
	reducer: {
		filters: filtersReducer,
		pagination: paginationReducer,
		tickets: ticketsReducer,
		calendar: calendarReducer,
		searchForm: searchFormReducer,
		cities: citiesReducer,
	},
});

export default store;
