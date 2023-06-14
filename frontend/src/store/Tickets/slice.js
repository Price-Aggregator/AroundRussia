import { createSlice } from "@reduxjs/toolkit";

export const ticketsName = 'tickets'

const initialState = {
  tickets: []
}

const ticketsSlice = createSlice({
  name: ticketsName,
  initialState,
  reducers: {
    setTickets: (state, action) => ({
      ...state,
      tickets: action.payload
    })
  }
})

export const ticketsReducer = ticketsSlice.reducer
export const { setTickets } = ticketsSlice.actions
