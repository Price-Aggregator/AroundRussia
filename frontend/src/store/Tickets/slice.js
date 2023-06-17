import { createSlice } from "@reduxjs/toolkit";
// import { BASE_URL } from "../../utils/constants";
// import checkResponse from "../../utils/check-response";

export const ticketsName = 'tickets'

const initialState = {
  tickets: [],
}


const ticketsSlice = createSlice({
  name: ticketsName,
  initialState,
  reducers: {
    setTickets: (state, action) => ({
      ...state,
      tickets: action.payload
    })
  },
})

export const ticketsReducer = ticketsSlice.reducer
export const { setTickets } = ticketsSlice.actions
