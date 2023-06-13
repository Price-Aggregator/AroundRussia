import { configureStore } from '@reduxjs/toolkit';
import { paginationReducer } from './Pagination/paginationSlice';

const store = configureStore({
  reducer: { pagination: paginationReducer },
})

export default store
