import { configureStore } from '@reduxjs/toolkit';
import { paginationReducer } from './Pagination/slice';
import { ticketsReducer } from './Tickets/slice';
import { calendarReducer } from './Calendar/slice';

const store = configureStore({
  reducer: { pagination: paginationReducer, tickets: ticketsReducer, calendar: calendarReducer },
})

export default store
