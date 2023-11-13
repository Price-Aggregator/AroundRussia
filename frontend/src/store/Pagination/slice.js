import { createSlice } from "@reduxjs/toolkit";

export const paginationName = 'pagination'

const initialState = {
  page: 1,
  pages: 0
}

const paginationSlice = createSlice({
  name: paginationName,
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
export const { setPage, setPages } = paginationSlice.actions
