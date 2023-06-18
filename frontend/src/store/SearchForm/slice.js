import { createSlice } from "@reduxjs/toolkit";

export const searchFormName = 'searchForm'

const initialState = {
  from: '',
  to: '',
  when: '',
  whenReturn: ''
}

const searchFormSlice = createSlice({
  name: searchFormName,
  initialState,
  reducers: {
    setFrom: (state, action) => ({
      ...state,
      from: action.payload
    }),
    setTo: (state, action) => ({
      ...state,
      to: action.payload
    }),
    setWhen: (state, action) => ({
      ...state,
      when: action.payload
    }),
    setWhenReturn: (state, action) => ({
      ...state,
      whenReturn: action.payload
    }),
    setForm: (state, action) => ({
      ...state,
      from: action.payload.from,
      to: action.payload.to,
      when: action.payload.when,
      whenReturn: action.payload.whenReturn
    })
  },
})


export const { setTo, setFrom, setWhenReturn, setWhen, setForm } = searchFormSlice.actions
export const searchFormReducer = searchFormSlice.reducer
