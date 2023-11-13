import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";
import checkResponse from "../../utils/check-response";

export const citiesName = 'cities'

const initialState = {
  cities: [],
  citiesByLetter: []
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

export const fetchCitiesByLetter = createAsyncThunk(
  `${citiesName}/getCitiesByLetter`,
  async (letter) => {
    const res = await fetch(`${BASE_URL}/cities/?search=${letter}`, {
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
  reducers: {
    clearCitiesByLetter: (state) => ({
      ...state,
      citiesByLetter: []
    })
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCities.fulfilled, (state, actions) => ({
        ...state,
        cities: actions.payload
      }))
      .addCase(fetchCitiesByLetter.fulfilled, (state, actions) => ({
        ...state,
        citiesByLetter: actions.payload
      }))

  }
})


export const { clearCitiesByLetter } = citiesSlice.actions
export const citiesReducer = citiesSlice.reducer

