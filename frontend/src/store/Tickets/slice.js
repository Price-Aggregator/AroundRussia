import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";
import checkResponse from "../../utils/check-response";

export const ticketsName = 'tickets'

const initialState = {
  tickets: [],
}

export const fetchTickets = createAsyncThunk(
  `${ticketsName}/getTickets`,
  async (formData) => {
    const res = await fetch(`${BASE_URL}/airline`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        origin: formData.from,
        destination: formData.to,
        departure_at: formData.when,
        return_at: formData.whenReturn,
        sorting: "price",
        direct: "false",
        unique: "false"
      }),
    }).then(checkResponse)
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
