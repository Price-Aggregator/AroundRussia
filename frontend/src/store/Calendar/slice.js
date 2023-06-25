import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { BASE_URL } from '../../utils/constants'
import checkResponse from '../../utils/check-response'

export const calendareName = 'calendar'

const initialState = {
  calendar: []
}

export const fetchCalendar = createAsyncThunk(
  `${calendareName}/getCalendar`,
  async (calendareData) => {
    const res = await fetch(`${BASE_URL}/calendar?departure_at=${calendareData.when}&destination=${calendareData.to}&origin=${calendareData.from}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    }).then(checkResponse)
    return res
  }
)

const calendarSlice = createSlice({
  name: calendareName,
  initialState,
  reducers: {

  },
  extraReducers: {
    [fetchCalendar.fulfilled]: (state, action) => ({
      ...state,
      calendar: action.payload
    })
  }
})


export const calendarReducer = calendarSlice.reducer
