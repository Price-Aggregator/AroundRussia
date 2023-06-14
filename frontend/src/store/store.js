import { configureStore } from '@reduxjs/toolkit';
import { paginationReducer } from './Pagination/slice';
import { ticketsReducer } from './Tickets/slice';

const store = configureStore({
  reducer: { pagination: paginationReducer, tickets: ticketsReducer },
})

export default store
