import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";
import checkResponse from "../../utils/check-response";

export const ticketsName = 'tickets'

const initialState = {
  tickets: [],
  // remove next
  cities: []
}

// эксперимент
export const getCities = createAsyncThunk(
  `${ticketsName}/getTickets`,
  async () => {
    const res = await fetch(`${BASE_URL}/cities`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
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
  // удалить, эксперимент
  extraReducers: {
    [getCities.fulfilled]: (state, action) => ({
      ...state,
      cities: action.payload
    })
  }
})

export const ticketsReducer = ticketsSlice.reducer
export const { setTickets } = ticketsSlice.actions
