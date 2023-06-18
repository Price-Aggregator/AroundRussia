import { configureStore } from '@reduxjs/toolkit';
import { paginationReducer } from './Pagination/slice';
import { ticketsReducer } from './Tickets/slice';
import { calendarReducer } from './Calendar/slice';
import { searchFormReducer } from './SearchForm/slice';
import { citiesReducer } from './Cities/slice';

const store = configureStore({
  reducer: { pagination: paginationReducer, tickets: ticketsReducer, calendar: calendarReducer, searchForm: searchFormReducer, cities: citiesReducer },
})

export default store
