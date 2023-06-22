import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";
import checkResponse from "../../utils/check-response";
import { createTicketsFetchObj, noReturn } from "../../utils/utils";

export const ticketsName = 'tickets'

const initialState = {
  tickets: [],
}

export const fetchTickets = createAsyncThunk(
  `${ticketsName}/getTickets`,
  async (formData) => {

    const fetchData = createTicketsFetchObj({ from: formData.from, to: formData.to, when: formData.when, whenReturn: formData.whenReturn })
    const clearFetchData = formData.whenReturn ? fetchData : noReturn(fetchData)

    const res = await fetch(`${BASE_URL}/airline`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clearFetchData),
    }).then(checkResponse)
    localStorage.setItem('searchResult', JSON.stringify(res));
    return res
  }
)

const ticketsSlice = createSlice({
  name: ticketsName,
  initialState,
  reducers: {
    setTickets: (state, action) => ({
      ...state,
      tickets: action.payload
    })
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.fulfilled, (state, action) => ({
        ...state,
        tickets: action.payload.data
      }))
  }
})

export const ticketsReducer = ticketsSlice.reducer
export const { setTickets } = ticketsSlice.actions
