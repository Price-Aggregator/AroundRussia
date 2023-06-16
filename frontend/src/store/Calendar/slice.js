import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { BASE_URL } from '../../utils/constants'
import checkResponse from '../../utils/check-response'

export const calendareName = 'calendar'

const initialState = {
  calendar: []
}

export const getCalendar = createAsyncThunk(
  `${calendareName}/getCalendar`,
  async (date, destination, origin) => {
    const res = await fetch(`${BASE_URL}/calendar?departure_at=${date}&destination=${destination}&origin=${origin}`, {
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
    [getCalendar.fulfilled]: (state, action) => ({
      ...state,
      calendar: action.payload
    })
  }
})


export const calendarReducer = calendarSlice.reducer
