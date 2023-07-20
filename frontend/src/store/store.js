import { configureStore } from '@reduxjs/toolkit';
import { paginationReducer } from './Pagination/slice';
import { ticketsReducer } from './Tickets/slice';
import { calendarReducer } from './Calendar/slice';
import { searchFormReducer } from './SearchForm/slice';
import { citiesReducer } from './Cities/slice';
import { filtersReducer } from './Filter/slice';
import { loaderReducer } from './Loader/slice';
import { userReducer } from './User/slice';
import { travelsReducer } from './Travels/slice';

const store = configureStore({
	reducer: {
		filters: filtersReducer,
		pagination: paginationReducer,
		tickets: ticketsReducer,
		calendar: calendarReducer,
		searchForm: searchFormReducer,
		cities: citiesReducer,
		loader: loaderReducer,
		user: userReducer,
		travels: travelsReducer,
	},
});

export default store;
