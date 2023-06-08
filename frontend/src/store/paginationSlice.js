import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  pages: 2
}

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPage: (state, action) => ({
      ...state,
      page: action.payload
    }),
    setPages: (state, action) => ({
      ...state,
      pages: action.payload
    })
  }
})

export const paginationReducer = paginationSlice.reducer
export const { setPage } = paginationSlice.actions
