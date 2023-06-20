import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";
import checkResponse from "../../utils/check-response";

export const citiesName = 'cities'

const initialState = {
  cities: []
}

export const getCities = createAsyncThunk(
  `${citiesName}/getCities`,
  async () => {
    const res = await fetch(`${BASE_URL}/cities`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(checkResponse)
    return res
  }
)

const citiesSlice = createSlice({
  name: citiesName,
  initialState,
  reducers: {},
  extraReducers: {
    [getCities.fulfilled]: (state, actions) => ({
      ...state,
      cities: actions.payload
    })
  }
})


export const { setCities } = citiesSlice.actions
export const citiesReducer = citiesSlice.reducer

